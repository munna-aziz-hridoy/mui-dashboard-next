import React, { useState } from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, Grid, TextField, CardHeader, Button, Typography } from '@mui/material'

// ** Icon imports

import toast from 'react-hot-toast'
import { postPayment } from 'src/@core/apiFunction/invoice'
import { getToken } from 'src/@core/utils/manageToken'

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

const AddPaymentModal = ({ open, setOpen, invoiceDue, invoiceId, refetch }) => {
  const [errorText, setErrorText] = useState('')

  const { access_token } = getToken()

  const handleAddPayment = e => {
    e.preventDefault()

    const amount = parseFloat(e.target.payingAmount.value)

    if (amount > invoiceDue || amount < 0) {
      return setErrorText('Amount should be positive and not more than Due ')
    }
    if (amount === NaN) {
      return setErrorText('Input number for amount')
    }

    postPayment({ amount, invoice: invoiceId }, access_token)
      .then(data => {
        if (data.success) {
          refetch(prev => !prev)
          toast.success('Successfully added payment')
        } else {
          toast.error('Payment add failed')
        }
      })
      .catch(err => {
        toast.error('Payment add failed')
      })

    setOpen(false)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <CardHeader title='Add Payment' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <form onSubmit={handleAddPayment}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Invoice Amount'
                    placeholder='Paying Amount'
                    disabled
                    value={invoiceDue}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    // type='number'
                    label='Paying Amount'
                    placeholder='Paying Amount'
                    name='payingAmount'
                    inputProps={{ inputMode: 'numeric', step: 'any' }}
                    onChange={() => setErrorText('')}
                  />
                </Grid>
                <Grid item xs={12}>
                  {errorText && (
                    <Typography variant='body2' color='error' fontSize={12}>
                      {errorText}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button type='submit' variant='contained' size='large'>
                    Pay
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
      {/* <Toaster /> */}
    </Modal>
  )
}

export default AddPaymentModal
