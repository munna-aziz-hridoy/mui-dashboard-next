import React, { useState, useEffect } from 'react'
import { getPaymentChoice } from 'src/@core/apiFunction/product'

// ** MUI import
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const FormPaymentStatus = ({ setPurchaseData }) => {
  const [paymentStatus, setPaymentStatus] = useState([])

  useEffect(() => {
    getPaymentChoice().then(data => setPaymentStatus(data))
  }, [])

  return (
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel id='form-layouts-separator-select-label'>Purchase Status</InputLabel>
        <Select
          onChange={e => {
            setPurchaseData(prev => {
              return {
                ...prev,
                status: e.target.value
              }
            })
          }}
          label='Purchase Status'
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

export default FormPaymentStatus
