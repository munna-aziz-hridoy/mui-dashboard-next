import React from 'react'

const style = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0, 0, 0, 0.23)',
  borderRadius: '6px',
  padding: '5px'
}

const FileUpload = ({ setFiles }) => {
  return (
    <div style={style}>
      <label>Upload Document</label>
      <input onChange={e => setFiles(e.target.files[0])} type='file' />
    </div>
  )
}

export default FileUpload
