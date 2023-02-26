import { Box, Button, Card, CardHeader, Typography } from '@mui/material'
import React, { useState, useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'

const CsvUpload = ({ handleUploadCsv }) => {
  const [csvFile, setCsvFile] = useState([])

  const onDrop = useCallback(acceptedFiles => {
    setCsvFile(acceptedFiles)
  })

  const { getInputProps, getRootProps, isDragActive, isDragAccept, i } = useDropzone({ onDrop })

  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardHeader style={{ padding: '10px 25px' }} title='Upload CSV' />
      <Box
        marginLeft={5}
        marginRight={5}
        component='div'
        height={80}
        border={2}
        borderRadius={1}
        borderColor={isDragActive ? 'red' : csvFile.length !== 0 ? 'green' : '#100720'}
        style={{ borderStyle: 'dashed', cursor: 'pointer' }}
        display='flex'
        justifyContent='center'
        marginBottom={4}
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
                    handleUploadCsv(csvFile[0], setCsvFile)
                  }}
                  variant='contained'
                  color='primary'
                  size='small'
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
                  size='small'
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
    </Card>
  )
}

export default CsvUpload
