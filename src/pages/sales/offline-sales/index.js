import React, { forwardRef, useState } from 'react'
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import DatePicker from 'react-datepicker'

import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import SalesTable from 'src/views/tables/SalesTable'

import middleCategoryData from 'src/@core/utils/cat-data'
import toast, { Toaster } from 'react-hot-toast'

import 'react-datepicker/dist/react-datepicker.css'
import { uploadOfflineSalesCsv } from 'src/@core/apiFunction/sales'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Sales Date' autoComplete='off' />
})

const OfflineSales = () => {
  const [middleCatData, setMiddleCatData] = useState(null)

  const handleUploadOfflineSalesCsv = (csv, setCsv) => {
    if (csv && middleCatData?.middle_cat_code) {
      const offlineSalesData = new FormData()
      offlineSalesData.append('offline_product_file', csv)
      offlineSalesData.append('middle_cat_code', middleCatData.middle_cat_code)
      offlineSalesData.append('middle_cat_name', middleCatData.middle_cat_name)

      uploadOfflineSalesCsv(offlineSalesData).then(() => {
        toast.success('Uploaded CSV successfully')
        setCsv([])
        setMiddleCatData(null)
      })
    } else toast.error('Please select middle category')
  }
  return (
    <div>
      <Box component='div' display='flex' justifyContent='space-between' alignItems='center' marginBottom={5}>
        <FormControl>
          <InputLabel id='form-layouts-separator-select-label'>Middle Category</InputLabel>
          <Select
            style={{ width: '200px' }}
            onChange={e => {
              setMiddleCatData(e.target.value)
            }}
            label='Middle Category'
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
            required
            value={middleCatData}
          >
            {middleCategoryData.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item.middle_cat_code}:{item.middle_cat_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          href='https://pims-live.s3.ap-northeast-1.amazonaws.com/sample_files/OfflineSell+HEADER.csv'
          variant='contained'
          color='primary'
        >
          Download Sample CSV
        </Button>
      </Box>

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
          <TextField className='search-field' style={{ borderRight: 'none' }} placeholder='Search' />
          <Button style={{ padding: '15.5px 18px', borderRadius: '0 5px 5px 0' }} variant='outlined'>
            Search
          </Button>
        </Box>
      </Box>

      <SalesTable />
      <Toaster />
    </div>
  )
}

export default OfflineSales
