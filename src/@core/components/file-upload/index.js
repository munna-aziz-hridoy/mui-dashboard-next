import React, { useState } from 'react'
import { Typography } from '@mui/material'

import { BsCloudUpload } from 'react-icons/bs'

const style = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '6px',
  padding: '16.5px 14px',
  position: 'relative'
}

const FileUpload = ({ setFiles }) => {
  const [isFile, setIsFile] = useState(false)

  return (
    <>
      <div style={style}>
        {/* <label>Upload Document</label> */}
        <input
          onChange={e => {
            setFiles(e.target.files[0])
            setIsFile(true)
          }}
          type='file'
          placeholder='Upload Invoice Image'
          style={{ opacity: '0', cursor: 'pointer', zIndex: 5 }}
        />
        <Typography
          style={{
            margin: '0',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            position: 'absolute',
            zIndex: 3,
            cursor: 'pointer'
          }}
        >
          <BsCloudUpload fontSize={20} />
          Upload Invoice
        </Typography>
      </div>
      {!isFile && (
        <Typography variant='body2' color='error' fontSize={12}>
          Upload invoice image
        </Typography>
      )}
    </>
  )
}

export default FileUpload
