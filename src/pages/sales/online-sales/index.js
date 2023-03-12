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
import AffectedTable from 'src/views/tables/affectedTable'
import formatedDate from 'src/@core/utils/getFormatedDate'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' fullWidth {...props} inputRef={ref} label='Sales Date' autoComplete='off' />
})

const OnlineSales = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState('')

  const [onlineSellData, setOnlineSellData] = useState([])
  const [affectedRows, setAffectedRows] = useState([])

  const [loading, setLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  useEffect(() => {
    const formatedStartDate = startDate ? formatedDate(startDate) : ''
    const formatedEndDate = endDate ? formatedDate(endDate) : ''

    setLoading(true)
    getOnlineSells(searchQuery, page, access_token, [formatedStartDate, formatedEndDate]).then(data => {
      console.log(data)
      if (data?.data) {
        setOnlineSellData(data?.data?.results)
        setTotalPages(data?.total_pages)
      }
      setLoading(false)
    })
  }, [page, searchQuery, refetch])

  useEffect(() => {
    if (startDate && endDate) {
      setRefetch(prev => !prev)
    }
  }, [endDate, startDate])

  const handleUploadOnlineSalesData = (csv, setCsv) => {
    if (csv) {
      setUploadLoading(true)
      const onlineSalesData = new FormData()
      onlineSalesData.append('online_sell_file', csv)
      uploadOnlineSalesCsv(onlineSalesData, access_token).then(data => {
        const { response, responseData } = data
        setUploadLoading(false)
        if (responseData?.affected_rows) {
          setAffectedRows(responseData?.affected_rows)
        }

        if (response.status === 200) {
          toast.success(responseData?.detail)
        } else if (response.status === 500) {
          toast.error('Internal Server error')
        } else if (response.status !== 200 && response.status !== 500) {
          Object.keys(responseData).forEach(key => {
            if (key !== 'affected_rows') {
              toast.error(responseData[key])
            }
          })
        }

        setCsv([])
        setRefetch(prev => !prev)
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

      {uploadLoading ? (
        <Box height={180} component='div' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <CsvUpload handleUploadCsv={handleUploadOnlineSalesData} />
      )}

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Box component='div' display='flex' justifyContent='space-between' alignItems='center' marginBottom={5}>
        <Box component='div' display='flex' alignItems='center' gap={2}>
          <Typography variant='body1' fontWeight={500}>
            Filter By:{' '}
          </Typography>

          <DatePickerWrapper>
            <DatePicker
              selectsRange={true}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput label='Sales Date range' />}
              onChange={value => {
                setStartDate(value[0])
                setEndDate(value[1])
              }}
              startDate={startDate}
              endDate={endDate}
            />
          </DatePickerWrapper>
        </Box>
        <Box display='flex' alignItems='center'>
          <TextField
            onChange={e => setSearchQuery(e.target.value)}
            className='search-field'
            style={{ borderRight: 'none' }}
            placeholder='Search'
            size='small'
          />
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
