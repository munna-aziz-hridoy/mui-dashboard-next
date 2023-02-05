import { Typography } from '@mui/material'
import React, { useState } from 'react'

const style = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '6px',
  padding: '5px'
}

const FileUpload = ({ setFiles }) => {
  const [isFile, setIsFile] = useState(false)

  return (
    <>
      <div style={style}>
        <label>Upload Document</label>
        <input
          onChange={e => {
            setFiles(e.target.files[0])
            setIsFile(true)
          }}
          type='file'
        />
        {!isFile && (
          <Typography variant='body2' color='error' fontSize={12}>
            Upload invoice image
          </Typography>
        )}
      </div>
    </>
  )
}

export default FileUpload
