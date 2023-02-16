import React, { forwardRef } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'

import DatePicker from 'react-datepicker'

import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import SalesTable from 'src/views/tables/SalesTable'

import 'react-datepicker/dist/react-datepicker.css'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Sales Date' autoComplete='off' />
})

const OnlineSales = () => {
  return (
    <div>
      <Button
        href='https://pims-live.s3.ap-northeast-1.amazonaws.com/sample_files/OnlineSell+HEADER.csv'
        style={{ margin: '10px', marginLeft: 'auto', display: 'block', width: '230px' }}
        variant='contained'
        color='primary'
      >
        Download Sample CSV
      </Button>
      <CsvUpload />

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
    </div>
  )
}

export default OnlineSales
