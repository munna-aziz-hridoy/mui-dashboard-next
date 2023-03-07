import { Grid, TextField } from '@mui/material'
import React from 'react'

const FormInvoiceNumber = ({ setPurchaseData }) => {
  return (
    <Grid item xs={12}>
      <TextField
        name='invoice_no'
        fullWidth
        label='Invoice No'
        placeholder='Invoice No'
        required
        size='small'
        onChange={e =>
          //   setPurchaseData(prev => {
          //     return {
          //       ...prev,
          //       invoice_no: e.target.value
          //     }
          //   })
          console.log('')
        }
      />
    </Grid>
  )
}

export default FormInvoiceNumber
