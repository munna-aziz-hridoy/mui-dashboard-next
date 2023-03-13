import React, { useState, useEffect } from 'react'
import { getStockStatus } from 'src/@core/apiFunction/product'

// ** MUI import
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { getToken } from 'src/@core/utils/manageToken'

const FormStockStatus = ({ setPurchaseData, clearForm }) => {
  const [stockStatus, setStockStatus] = useState([])

  const [selectedStatus, setSelectedStatus] = useState('')

  const { access_token } = getToken()

  useEffect(() => {
    getStockStatus(access_token).then(data => setStockStatus(data))
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
    <Grid item xs={12}>
      <FormControl size='small' fullWidth>
        <InputLabel id='form-layouts-separator-select-label'>Stock Status</InputLabel>
        <Select
          onChange={handleChangeStockStatus}
          required
          label='Stock Status'
          defaultValue=''
          id='form-layouts-separator-select'
          labelId='form-layouts-separator-select-label'
          value={selectedStatus}
        >
          {stockStatus?.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default FormStockStatus
