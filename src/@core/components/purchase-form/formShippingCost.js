import React from 'react'

import { Grid, TextField } from '@mui/material'

const FormShippingCost = ({ setPurchaseData }) => {
  return (
    <Grid item xs={12} sm={4}>
      <TextField
        onChange={e => {
          setPurchaseData(prev => {
            return {
              ...prev,
              shipping_cost: parseFloat(e.target.value)
            }
          })
        }}
        type='number'
        fullWidth
        label='Shipping Cost'
        placeholder='Shipping cost'
      />
    </Grid>
  )
}

export default FormShippingCost
