import React, { forwardRef } from 'react'

import { TextField, Grid } from '@mui/material'

import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const FormDatePicker = ({ purchaseData, setPurchaseData }) => {
  return (
    <Grid item xs={12} sm={4}>
      <DatePicker
        selected={purchaseData?.purchaseDate}
        showYearDropdown
        showMonthDropdown
        placeholderText='MM-DD-YYYY'
        customInput={<CustomInput />}
        id='form-layouts-separator-date'
        onChange={date =>
          setPurchaseData(prev => {
            return {
              ...prev,
              purchaseDate: date
            }
          })
        }
      />
    </Grid>
  )
}

export default FormDatePicker
