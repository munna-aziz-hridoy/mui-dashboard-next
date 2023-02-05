import React, { forwardRef } from 'react'

//** MUI import
import { Card, CardHeader, Divider, Grid, TextField, Button } from '@mui/material'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import SelectSuplierSearch from 'src/@core/components/purchase-list/SelectSuplierSearch'
import SelectPaymentSearch from 'src/@core/components/purchase-list/SelectPaymentSearch'
import TableCustomized from 'src/views/tables/TableCustomized'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const PurchaseList = () => {
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

              //   onChange={date =>

              //   }
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

      <Card>
        <TableCustomized />
      </Card>
    </DatePickerWrapper>
  )
}

export default PurchaseList
