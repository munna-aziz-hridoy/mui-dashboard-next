import React from 'react'

//** MUI import
import { Grid, TextField } from '@mui/material'

const FormDiscount = ({ setPurchaseData }) => {
  return (
    <Grid item xs={12} sm={4}>
      <TextField
        onChange={e => {
          setPurchaseData(prev => {
            return {
              ...prev,
              discount: parseFloat(e.target.value)
            }
          })
        }}
        type='number'
        fullWidth
        label='Discount'
        placeholder='100'
      />
    </Grid>
  )
}

export default FormDiscount
