import React, { forwardRef, useState } from 'react'

import { TextField, Grid } from '@mui/material'

import DatePicker from 'react-datepicker'

import formatedDate from 'src/@core/utils/getFormatedDate'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const FormDatePicker = ({ purchaseData, setPurchaseData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleChangeDate = date => {
    const invoice_date = formatedDate(date)

    setPurchaseData(prev => {
      return {
        ...prev,
        invoice_date
      }
    })
    setSelectedDate(date)
  }

  return (
    <Grid item xs={12} sm={6}>
      <DatePicker
        selected={selectedDate}
        required
        showYearDropdown
        showMonthDropdown
        placeholderText='MM-DD-YYYY'
        customInput={<CustomInput />}
        id='form-layouts-separator-date'
        onChange={date => handleChangeDate(date)}
      />
    </Grid>
  )
}

export default FormDatePicker
