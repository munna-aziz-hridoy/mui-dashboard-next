import React, { useEffect, useState } from 'react'

import { TextField } from '@mui/material'

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
    <TextField
      onChange={handleChangeNote}
      value={note}
      fullWidth
      multiline
      minRows={2}
      label='Note'
      placeholder='Note'
      sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
    />
  )
}

export default FormInvoiceNote
