import React, { useEffect, useState } from 'react'

import { Grid, TextField, Typography } from '@mui/material'

const FormShippingCost = ({ setPurchaseData, clearForm }) => {
  const [shipping, setShipping] = useState(0)

  useEffect(() => {
    setShipping(0)
  }, [clearForm])

  const handleChangeShipping = e => {
    setPurchaseData(prev => {
      return {
        ...prev,
        shipping_charge: parseFloat(e.target.value)
      }
    })
    setShipping(parseFloat(e.target.value))
  }

  return (
    <Grid item xs={12} sm={6}>
      <TextField
        onChange={handleChangeShipping}
        type='number'
        fullWidth
        label='Shipping Cost'
        placeholder='Shipping cost'
        value={shipping}
      />
      {shipping < 0 && (
        <Typography variant='body2' color='error' fontSize={12}>
          Shipping cost can't be negative
        </Typography>
      )}
    </Grid>
  )
}

export default FormShippingCost
