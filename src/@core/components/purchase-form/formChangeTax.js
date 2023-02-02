import React from 'react'

// ** MUI import

import { Grid, TextField } from '@mui/material'

const FormChangeTax = ({ setTotalTax, purchaseData, totalTax }) => {
  return (
    <Grid item xs={12} sm={4}>
      <TextField
        onChange={e => {
          const taxInNum = parseFloat(e.target.value)
          setTotalTax(taxInNum)

          if (purchaseData?.tax_8 !== 0) {
            purchaseData.tax_8 = taxInNum
          } else if (purchaseData?.tax_10 !== 0) {
            purchaseData.tax_10 = taxInNum
          }
        }}
        type='number'
        fullWidth
        label='Tax Amount'
        placeholder='Enter Tax Amount'
        value={totalTax}
      />
    </Grid>
  )
}

export default FormChangeTax
