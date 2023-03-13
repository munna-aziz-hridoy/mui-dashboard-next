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
import AffectedTable from 'src/views/tables/affectedTable'
import formatedDate from 'src/@core/utils/getFormatedDate'
import useFilterOptions from 'src/@core/hooks/useFilterOptions'
import FilterButton from 'src/@core/components/filterButton'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' fullWidth {...props} inputRef={ref} label={props.label} autoComplete='off' />
})

const OfflineSales = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState('')

  const [offlineSellData, setOfflineSellData] = useState([])
  const [affectedRows, setAffectedRows] = useState([])

  const [loading, setLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [totalMapped, setTotalMapped] = useState(0)
  const [totalUnmapped, setTotalUnmapped] = useState(0)
  const [totalSells, setTotalSells] = useState(0)

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  const { isMapped, setIsMapped } = useFilterOptions()

  useEffect(() => {
    setLoading(true)

    const formatedStartDate = startDate ? formatedDate(startDate) : ''
    const formatedEndDate = endDate ? formatedDate(endDate) : ''

    getOfflineSells(searchQuery, page, access_token, [formatedStartDate, formatedEndDate], isMapped).then(data => {
      setLoading(false)

      const { response, responseData } = data

      if (response.status === 200) {
        const { results, total_sells, total_mapped_count, total_unmapped_count } = responseData?.data

        setOfflineSellData(results)
        setTotalPages(responseData?.total_pages)
        setTotalMapped(total_mapped_count)
        setTotalUnmapped(total_unmapped_count)
        setTotalSells(total_sells)
      } else {
        setOfflineSellData([])
      }
    })
  }, [page, refetch])

  useEffect(() => {
    if (startDate && endDate) {
      setRefetch(prev => !prev)
    }
  }, [endDate, startDate])

  const handleUploadOfflineSalesCsv = (csv, setCsv) => {
    if (csv) {
      setUploadLoading(true)
      const offlineSalesData = new FormData()
      offlineSalesData.append('offline_sell_file', csv)

      uploadOfflineSalesCsv(offlineSalesData, access_token).then(data => {
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

  console.log(offlineSellData)

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

      {uploadLoading ? (
        <Box height={180} component='div' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <CsvUpload handleUploadCsv={handleUploadOfflineSalesCsv} />
      )}

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Box component='div' style={{ margin: '30px 0' }}>
        <Typography variant='body1' fontSize={16} fontWeight={500}>
          Total sells: {totalSells}
        </Typography>
        <Typography variant='body1' fontSize={16} fontWeight={500}>
          Total mapped: {totalMapped}
        </Typography>
        <Typography variant='body1' fontSize={16} fontWeight={500}>
          Total un-mapped: {totalUnmapped}
        </Typography>
      </Box>

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

        <Box component='div' display='flex' alignItems='center' gap={2}>
          <FilterButton isMapped={isMapped} setIsMapped={setIsMapped} refetch={setRefetch} />

          <Box display='flex' alignItems='center'>
            <TextField
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setRefetch(prev => !prev)
                }
              }}
              onChange={e => {
                setSearchQuery(e.target.value)
                if (e.target.value === '') {
                  setRefetch(prev => !prev)
                }
              }}
              size='small'
              className='search-field'
              style={{ borderRight: 'none' }}
              placeholder='Search'
            />
            <Button
              onClick={() => setRefetch(prev => !prev)}
              style={{ padding: '7.5px 18px', borderRadius: '0 5px 5px 0' }}
              variant='outlined'
            >
              Search
            </Button>
          </Box>
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
