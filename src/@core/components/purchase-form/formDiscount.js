import React, { useEffect, useState } from 'react'

//** MUI import
import { Grid, TextField, Typography } from '@mui/material'

const FormDiscount = ({ setPurchaseData, clearForm }) => {
  const [discount, setDiscount] = useState(0)

  useEffect(() => {
    setDiscount(0)
  }, [clearForm])

  const handleSetDiscount = e => {
    setPurchaseData(prev => {
      return {
        ...prev,
        discount: parseFloat(e.target.value)
      }
    })
    setDiscount(parseFloat(e.target.value))
  }

  return (
    <Grid item xs={3}>
      <TextField
        onChange={handleSetDiscount}
        type='number'
        fullWidth
        label='Discount'
        placeholder='100'
        value={discount}
        size='small'
      />

      {discount < 0 && (
        <Typography variant='body2' color='error' fontSize={12}>
          Discount can't be negative
        </Typography>
      )}
    </Grid>
  )
}

export default FormDiscount
