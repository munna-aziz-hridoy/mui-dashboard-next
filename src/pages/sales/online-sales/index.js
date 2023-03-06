import React, { forwardRef, useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'

import DatePicker from 'react-datepicker'
import toast, { Toaster } from 'react-hot-toast'

import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import SalesTable from 'src/views/tables/SalesTable'

import 'react-datepicker/dist/react-datepicker.css'
import { uploadOnlineSalesCsv } from 'src/@core/apiFunction/csvUpload'
import { getToken } from 'src/@core/utils/manageToken'
import { getOnlineSells } from 'src/@core/apiFunction/sell'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' fullWidth {...props} inputRef={ref} label='Sales Date' autoComplete='off' />
})

const OnlineSales = () => {
  const [onlineSellData, setOnlineSellData] = useState([])

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getOnlineSells(page, access_token).then(data => {
      if (data?.data) {
        setOnlineSellData(data?.data)
        setTotalPages(data?.total_pages)
      }
      setLoading(false)
    })
  }, [page])

  const handleUploadOnlineSalesData = (csv, setCsv) => {
    if (csv) {
      const onlineSalesData = new FormData()
      onlineSalesData.append('online_sell_file', onlineSalesData)
      uploadOnlineSalesCsv(onlineSalesData, access_token).then(data => {
        if (data.success) {
          toast.success('Successfully uploaded sales data')
          setCsv([])
        } else {
          toast.error(data.message)
        }
      })
    }
  }

  return (
    <div>
      <Button
        href='https://pims-live.s3.ap-northeast-1.amazonaws.com/sample_files/OnlineSell+HEADER.csv'
        style={{ margin: '10px', marginLeft: 'auto', display: 'block', width: '230px' }}
        variant='contained'
        color='primary'
        size='small'
      >
        Download Sample CSV
      </Button>
      <CsvUpload handleUploadCsv={handleUploadOnlineSalesData} />

      <Box component='div' display='flex' justifyContent='space-between' alignItems='center' marginBottom={5}>
        <Box component='div' display='flex' alignItems='center' gap={2}>
          <Typography variant='body1' fontWeight={500}>
            Filter By:{' '}
          </Typography>

          <DatePickerWrapper>
            <DatePicker
              required
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput />}
              id='form-layouts-separator-date'
            />
          </DatePickerWrapper>
        </Box>
        <Box display='flex' alignItems='center'>
          <TextField className='search-field' style={{ borderRight: 'none' }} placeholder='Search' size='small' />
          <Button style={{ padding: '8px 18px', borderRadius: '0 5px 5px 0' }} variant='outlined' size='small'>
            Search
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box component='div' display='flex' justifyContent='center' alignItems='center' padding={10}>
          <CircularProgress color='primary' />
        </Box>
      )}

      <SalesTable sellData={onlineSellData} setPageNumber={setPage} totalPages={totalPages} />
      <Toaster />
    </div>
  )
}

export default OnlineSales
