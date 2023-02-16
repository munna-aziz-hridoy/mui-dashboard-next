import React, { useState, useEffect } from 'react'
import { getPaymentChoice } from 'src/@core/apiFunction/product'

// ** MUI import
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'

const SelectPaymentSearch = ({ setPayment }) => {
  const [paymentStatus, setPaymentStatus] = useState([])

  useEffect(() => {
    getPaymentChoice().then(data => setPaymentStatus(data))
  }, [])

  console.log(paymentStatus)

  return (
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel id='form-layouts-separator-select-label'>Payment Status</InputLabel>
        <Select
          onChange={e => {
            setPayment(e.target.value)
          }}
          required
          label='Payment Status'
          defaultValue=''
          id='form-layouts-separator-select'
          labelId='form-layouts-separator-select-label'
        >
          {paymentStatus.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default SelectPaymentSearch
