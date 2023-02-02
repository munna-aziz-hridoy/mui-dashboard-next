import React from 'react'

import { Grid, TextField } from '@mui/material'

const FormInvoiceNote = ({ setPurchaseData }) => {
  return (
    <Grid item xs={12}>
      <TextField
        onChange={e => {
          setPurchaseData(prev => {
            return {
              ...prev,
              note: e.target.value
            }
          })
        }}
        fullWidth
        multiline
        minRows={3}
        label='Note'
        placeholder='Note'
        sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
      />
    </Grid>
  )
}

export default FormInvoiceNote
