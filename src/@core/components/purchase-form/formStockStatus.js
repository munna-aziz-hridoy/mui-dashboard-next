import React, { useState, useEffect } from 'react'
import { getPaymentChoice, getStockStatus } from 'src/@core/apiFunction/product'

// ** MUI import
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'

const FormStockStatus = ({ setPurchaseData, clearForm }) => {
  const [stockStatus, setStockStatus] = useState([])

  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    getStockStatus().then(data => setStockStatus(data))
  }, [])

  useEffect(() => {
    setSelectedStatus('')
  }, [clearForm])

  const handleChangeStockStatus = e => {
    const stock = e.target.value

    setPurchaseData(prev => {
      return {
        ...prev,
        stock_status: stock
      }
    })
    setSelectedStatus(stock)
  }

  return (
    <Grid item xs={12} sm={4}>
      <FormControl fullWidth>
        <InputLabel id='form-layouts-separator-select-label'>Payment Status</InputLabel>
        <Select
          onChange={handleChangeStockStatus}
          required
          label='Payment Status'
          defaultValue=''
          id='form-layouts-separator-select'
          labelId='form-layouts-separator-select-label'
          value={selectedStatus}
        >
          {stockStatus.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {!selectedStatus && (
        <Typography variant='body2' color='error' fontSize={12}>
          Add stock status
        </Typography>
      )}
    </Grid>
  )
}

export default FormStockStatus
