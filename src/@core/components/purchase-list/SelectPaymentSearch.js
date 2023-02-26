import React, { useState, useEffect } from 'react'
import { getPaymentChoice } from 'src/@core/apiFunction/product'

// ** MUI import
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material'
import { getToken } from 'src/@core/utils/manageToken'

const SelectPaymentSearch = ({ setPayment }) => {
  const [paymentStatus, setPaymentStatus] = useState([])

  const { access_token } = getToken()

  useEffect(() => {
    getPaymentChoice(access_token).then(data => setPaymentStatus(data))
  }, [])

  return (
    <Grid item xs={3}>
      <FormControl size='small' fullWidth>
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
