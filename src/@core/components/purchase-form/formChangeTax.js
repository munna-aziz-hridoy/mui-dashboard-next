import React, { useEffect, useState } from 'react'

// ** MUI import

import { Grid, TextField, Typography } from '@mui/material'

const FormChangeTax = ({ setTotalTax, purchaseData, totalTax, clearForm }) => {
  const [errorText, setErrorText] = useState('')

  useEffect(()=>{
    setTotalTax(0)
  },[clearForm])


  const handleChangeTax = ()=>{
      const taxInNum = parseFloat(e.target.value)
      if(taxInNum < 0){
        return setErrorText()
      }
      setErrorText('')
      setTotalTax(taxInNum)
      purchaseData?.tax = taxInNum
   }


  return (
    <Grid item xs={12} sm={6}>
      <TextField
        onChange={handleChangeTax}
        type='number'
        fullWidth
        label='Tax Amount'
        placeholder='Enter Tax Amount'
        value={totalTax}
      />
      {
        errorText && <Typography variant='body2' color='error' fontSize={12}>
          {errorText}
        </Typography>
      }
    </Grid>
  )
}

export default FormChangeTax
