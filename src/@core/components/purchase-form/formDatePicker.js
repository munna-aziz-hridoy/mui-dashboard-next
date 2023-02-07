import React, { forwardRef, useState } from 'react'

import { TextField, Grid } from '@mui/material'

import DatePicker from 'react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const FormDatePicker = ({ purchaseData, setPurchaseData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleChangeDate = date => {
    const dateArr = date.toString().split(' ')
    const time = `${dateArr[4].split(':')[0]}:${dateArr[4].split(':')[1]}`

    const timestamp = `${dateArr[3]}-0${date.getMonth() + 1}-${dateArr[2]} ${time}`

    setPurchaseData(prev => {
      return {
        ...prev,
        invoice_date: timestamp
      }
    })
    setSelectedDate(date)
  }

  return (
    <Grid item xs={12} sm={4}>
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
