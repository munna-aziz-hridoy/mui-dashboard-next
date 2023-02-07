import React, { useEffect, useState } from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, Grid, TextField, CardHeader, Button } from '@mui/material'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const ViewPaymentModal = ({ open, setOpen }) => {
  const handleSubmit = e => {
    e.preventDefault()
    setOpen(false)
  }
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <CardHeader title='Payment History' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent></CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default ViewPaymentModal
