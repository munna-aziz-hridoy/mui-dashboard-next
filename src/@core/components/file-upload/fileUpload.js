import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'

import ImageUploading from 'react-images-uploading'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import { BsCloudUpload } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'

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

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList)
    const file = imageList[0]?.file
    const invoice_document = new FormData()
    invoice_document.append('document', file)
    setFiles(invoice_document)
  }

  useEffect(() => {
    setImages([])
  }, [clearForm])

  return (
    <>
      <ImageUploading value={images} onChange={onChange} dataURLKey='data_url'>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }} className='upload__image-wrapper'>
            <button style={btnContainerstyle} onClick={onImageUpload} {...dragProps}>
              {/* Click or Drop here */}
              <Typography style={uploadBtnStyle}>
                <BsCloudUpload fontSize={20} />
                Upload Invoice
              </Typography>
            </button>
            {images.length < 1 && (
              <Typography variant='body2' color='error' fontSize={12}>
                Upload invoice image
              </Typography>
            )}

            {imageList.map((image, index) => (
              <div style={{ marginTop: '5px', position: 'relative' }} key={index} className='image-item'>
                <TransformWrapper>
                  <TransformComponent>
                    <img src={image['data_url']} alt='' width='380' />
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
                    onClick={() => onImageRemove(index)}
                  >
                    <RxCross2 color='#fff' fontSize={24} fontWeight={600} />
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </>
  )
}

export default FileUpload
