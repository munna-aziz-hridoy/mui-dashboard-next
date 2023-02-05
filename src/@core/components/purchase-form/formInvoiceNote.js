import React, { useEffect, useState } from 'react'

import { Grid, TextField } from '@mui/material'

const FormInvoiceNote = ({ setPurchaseData, clearForm }) => {
  const [note, setNote] = useState('')

  useEffect(() => {
    setNote('')
  }, [clearForm])

  const handleChangeNote = e => {
    setPurchaseData(prev => {
      return {
        ...prev,
        note: e.target.value
      }
    })
    setNote(e.target.value)
  }

  return (
    <Grid item xs={12}>
      <TextField
        onChange={handleChangeNote}
        value={note}
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
