import React, { useEffect, useState } from 'react'

import { Grid, TextField } from '@mui/material'

const FormShippingCost = ({ setPurchaseData, clearForm }) => {
  const [shipping, setShipping] = useState('')

  useEffect(() => {
    setShipping('')
  }, [clearForm])

  return (
    <Grid item xs={12} sm={4}>
      <TextField
        onChange={e => {
          setPurchaseData(prev => {
            return {
              ...prev,
              shipping_charge: parseFloat(e.target.value)
            }
          })
          setShipping(e.target.value)
        }}
        type='number'
        fullWidth
        label='Shipping Cost'
        placeholder='Shipping cost'
        value={shipping}
      />
    </Grid>
  )
}

export default FormShippingCost
