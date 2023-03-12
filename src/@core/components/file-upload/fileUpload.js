import React, { useEffect, useState } from 'react'
import { Typography, Box, CircularProgress } from '@mui/material'

import ImageUploading from 'react-images-uploading'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import { BsCloudUpload } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { removeInvoiceImage, uploadInvoiceImage } from 'src/@core/apiFunction/invoice'
import { getToken } from 'src/@core/utils/manageToken'

const btnContainerstyle = {
  maxHeight: '58px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '6px',
  padding: '26.5px 14px',
  position: 'relative',
  background: 'transparent',
  width: '170px',
  minWidth: '170px'
}

const uploadBtnStyle = {
  margin: '0',
  padding: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  position: 'absolute',
  zIndex: 3,
  cursor: 'pointer',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
}

const FileUpload = ({ setFiles, clearForm }) => {
  const [images, setImages] = useState([])

  const [preview, setPreview] = useState(null)

  const [loading, setLoading] = useState(false)

  const [imageId, setImageId] = useState(null)

  const { access_token } = getToken()

  useEffect(() => {
    setImages([])
  }, [clearForm])

  const onChange = (imageList, addUpdateIndex) => {
    setLoading(true)
    setImages(imageList)
    const file = imageList[0]?.file
    const invoice_document = new FormData()
    invoice_document.append('document', file)

    uploadInvoiceImage(invoice_document, access_token).then(data => {
      if (data?.success) {
        setFiles(data?.id)
        setImageId(data?.id)
        setPreview(data?.document)
      }

      setLoading(false)
    })
  }

  const handleRemoveImage = () => {
    removeInvoiceImage(imageId, access_token).then(() => {
      setPreview(null)
    })
  }

  return (
    <>
      <ImageUploading
        value={images}
        onChange={onChange}
        dataURLKey='data_url'
        acceptType={['jpg', 'jpeg', 'gif', 'png', 'heic', 'heif']}
        allowNonImageType
      >
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => {
          console.log(dragProps)

          return (
            <div style={{ display: 'flex', gap: '5px' }} className='upload__image-wrapper'>
              {!preview && (
                <div>
                  <button style={btnContainerstyle} onClick={onImageUpload} {...dragProps}>
                    {/* Click or Drop here */}
                    <Typography style={uploadBtnStyle}>
                      <BsCloudUpload fontSize={20} />
                      Upload Invoice
                    </Typography>
                  </button>

                  <Typography variant='body2' color='error' fontSize={12}>
                    Upload invoice image
                  </Typography>
                </div>
              )}

              {loading && (
                <Box component='div'>
                  <CircularProgress color='primary' />
                </Box>
              )}

              <div style={{ marginTop: '5px', position: 'relative' }} className='image-item'>
                <TransformWrapper>
                  <TransformComponent>
                    <img src={preview} alt='' width='380' />
                  </TransformComponent>
                </TransformWrapper>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    position: 'absolute',
                    top: '0px',
                    right: '30px',
                    cursor: 'pointer'
                  }}
                  className='image-item__btn-wrapper'
                >
                  {preview && (
                    <Typography
                      border={1}
                      borderRadius='50%'
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      width={25}
                      height={25}
                      boxShadow={2}
                      bgcolor='#d32f2f'
                      borderColor='#fff'
                      onClick={handleRemoveImage}
                    >
                      <RxCross2 color='#fff' fontSize={24} fontWeight={600} />
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          )
        }}
      </ImageUploading>
    </>
  )
}

export default FileUpload
