import { Box, Button, Card, CardHeader, Typography } from '@mui/material'
import React, { useState, useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'

const CsvUpload = () => {
  const [csvFile, setCsvFile] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    setCsvFile(acceptedFiles)
  })

  const { getInputProps, getRootProps, isDragActive, isDragAccept, i } = useDropzone({ onDrop })

  const handleUploadCsv = () => {
    console.log(csvFile)
  }

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader title='Upload CSV' />
      <Box
        marginLeft={5}
        marginRight={5}
        component='div'
        height={120}
        border={1}
        borderRadius={1}
        borderColor={isDragActive ? 'red' : csvFile.length !== 0 ? 'green' : '#100720'}
        style={{ borderStyle: 'dashed', cursor: 'pointer' }}
        display='flex'
        justifyContent='center'
        marginBottom={10}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div
          style={{
            padding: '30px 0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          {isDragActive ? (
            <Typography variant='body1' color='red'>
              Drop File here ...
            </Typography>
          ) : csvFile.length !== 0 ? (
            <Fragment>
              <Typography variant='body1' color='#255700'>
                {csvFile[0].name}
              </Typography>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Button
                  onClick={e => {
                    e.stopPropagation()
                    handleUploadCsv()
                  }}
                  variant='contained'
                  color='primary'
                >
                  Upload
                </Button>
                <Button
                  onClick={e => {
                    e.stopPropagation()
                    setCsvFile([])
                  }}
                  variant='outlined'
                  color='error'
                >
                  Remove
                </Button>
              </div>
            </Fragment>
          ) : (
            <Typography variant='body1'>Drop or Click here to select file</Typography>
          )}
        </div>
      </Box>
      {/* <button onClick={() => console.log(csvFile)}>Click</button> */}
    </Card>
  )
}

export default CsvUpload
