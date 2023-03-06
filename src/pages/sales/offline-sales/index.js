import React, { forwardRef, useEffect, useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress
} from '@mui/material'

import DatePicker from 'react-datepicker'

import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import SalesTable from 'src/views/tables/SalesTable'

import middleCategoryData from 'src/@core/utils/cat-data'
import toast, { Toaster } from 'react-hot-toast'

import 'react-datepicker/dist/react-datepicker.css'
import { uploadOfflineSalesCsv } from 'src/@core/apiFunction/csvUpload'
import { getToken } from 'src/@core/utils/manageToken'
import { getOfflineSells } from 'src/@core/apiFunction/sell'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' fullWidth {...props} inputRef={ref} label='Sales Date' autoComplete='off' />
})

const OfflineSales = () => {
  const [offlineSellData, setOfflineSellData] = useState([])

  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getOfflineSells(page, access_token).then(data => {
      if (data?.data) {
        setOfflineSellData(data?.data)
        setTotalPages(data?.total_pages)
      }

      setLoading(false)
    })
  }, [page])

  const handleUploadOfflineSalesCsv = (csv, setCsv) => {
    if (csv) {
      const offlineSalesData = new FormData()
      offlineSalesData.append('offline_sell_file', offlineSalesData)

      uploadOfflineSalesCsv(offlineSalesData, access_token).then(data => {
        toast.success('Successfully uploaded Sales Data')
        setCsv([])
      })
    }
  }

  return (
    <div>
      <Button
        href='https://pims-live.s3.ap-northeast-1.amazonaws.com/sample_files/OfflineSell+HEADER.csv'
        variant='contained'
        color='primary'
        style={{ margin: '10px', marginLeft: 'auto', display: 'block', width: '230px' }}
        size='small'
      >
        Download Sample CSV
      </Button>

      <CsvUpload handleUploadCsv={handleUploadOfflineSalesCsv} />

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
          <TextField size='small' className='search-field' style={{ borderRight: 'none' }} placeholder='Search' />
          <Button style={{ padding: '7.5px 18px', borderRadius: '0 5px 5px 0' }} variant='outlined'>
            Search
          </Button>
        </Box>
      </Box>

      {loading && (
        <Box component='div' display='flex' justifyContent='center' alignItems='center' padding={10}>
          <CircularProgress color='primary' />
        </Box>
      )}

      <SalesTable sellData={offlineSellData} totalPages={totalPages} setPageNumber={setPage} />

      <Toaster />
    </div>
  )
}

export default OfflineSales
