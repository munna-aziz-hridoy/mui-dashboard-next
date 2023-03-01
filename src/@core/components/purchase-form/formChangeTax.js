import React, { useEffect, useState } from 'react'

// ** MUI import

import { Grid, TextField, Typography } from '@mui/material'

const FormChangeTax = ({ setTotalTax, purchaseData, totalTax, clearForm, invoiceTotal }) => {
  const [errorText, setErrorText] = useState('')

  useEffect(()=>{
    setTotalTax(0)
    purchaseData?.tax = 0
    purchaseData?.tax_percentage=0
  },[clearForm])

  useEffect(()=>{
    if(purchaseData?.tax_percentage && invoiceTotal){
       const taxAmount = (invoiceTotal * purchaseData?.tax_percentage) / 100
       setTotalTax(taxAmount)
    }
  },[invoiceTotal])



  const handleChangeTax = (e)=>{
      const taxInNum = parseFloat(e.target.value)
      if(taxInNum < 0){
        return setErrorText()
      }
      setErrorText('')
      setTotalTax(taxInNum)
      purchaseData?.tax = taxInNum
   }


  return (
    <Grid item xs={3}>
      <TextField
        onChange={handleChangeTax}
        type='number'
        fullWidth
        label='Tax Amount'
        placeholder='Enter Tax Amount'
        value={totalTax}
        size='small'
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
