import React, { forwardRef, useState } from 'react'

//** MUI import
import { Card, CardHeader, Divider, Grid, TextField, Button } from '@mui/material'

import { AiOutlinePlus } from 'react-icons/ai'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import SelectSuplierSearch from 'src/@core/components/purchase-list/SelectSuplierSearch'
import SelectPaymentSearch from 'src/@core/components/purchase-list/SelectPaymentSearch'
import TableCustomized from 'src/views/tables/TableCustomized'
import { useRouter } from 'next/router'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const PurchaseList = () => {
  const [date, setDate] = useState(new Date())

  const router = useRouter()

  return (
    <DatePickerWrapper>
      <Card style={{ padding: '20px', overflow: 'visible', marginBottom: '30px' }}>
        <CardHeader title='Purchase List' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />

        <Grid container spacing={6} marginTop={1} marginBottom={10}>
          <Grid item xs={12} sm={4}>
            <DatePicker
              required
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput />}
              onChange={date => setDate(date)}
              selected={date}
            />
          </Grid>

          <SelectSuplierSearch />

          <SelectPaymentSearch />

          <Grid item xs={12}>
            <Button fullWidth variant='outlined'>
              Search
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Button
        variant='contained'
        marginBottom={10}
        style={{ display: 'inline-block', marginBottom: '20px' }}
        onClick={() => router.push('/purchase/add-purchase')}
      >
        <AiOutlinePlus fontSize={16} color='#fff' style={{ marginRight: '5px' }} />
        Add Purchase
      </Button>

      <Card>
        <TableCustomized />
      </Card>
    </DatePickerWrapper>
  )
}

export default PurchaseList
