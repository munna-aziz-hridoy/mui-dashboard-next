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

const PartialPaymentModal = ({ open, setOpen, setPurchaseData }) => {
  const handlechangePaidAmount = () => {
    setPurchaseData(prev => {
      return {
        ...prev,
        amount_paid: parseFloat(e.target.value)
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    setOpen(false)
  }
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <CardHeader title='Paid Amount' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    onChange={handlechangePaidAmount}
                    fullWidth
                    type='number'
                    label='Paid Amount'
                    placeholder='Paid Amount'
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' size='large'>
                    Done
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default PartialPaymentModal
