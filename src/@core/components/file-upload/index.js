import React, { Fragment, useEffect, useState } from 'react'
import { Button, LinearProgress, Typography } from '@mui/material'

import ImageUploading from 'react-images-uploading'

import { BsCloudUpload } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'

const btnContainerstyle = {
  maxHeight: '58px',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '6px',
  padding: '26.5px 14px',
  position: 'relative',
  background: 'transparent',
  width: '100%'
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
      <ImageUploading value={images} onChange={onChange} maxNumber={10} dataURLKey='data_url'>
        {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
          // write your building UI
          <div style={{ display: 'flex', gap: '15px' }} className='upload__image-wrapper'>
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
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className='image-item'>
                <img src={image['data_url']} alt='' width='100' />
                <div style={{ display: 'flex', gap: '8px' }} className='image-item__btn-wrapper'>
                  <Button variant='contained' color='error' onClick={() => onImageRemove(index)}>
                    <RxCross2 fontSize={22} />
                  </Button>
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
