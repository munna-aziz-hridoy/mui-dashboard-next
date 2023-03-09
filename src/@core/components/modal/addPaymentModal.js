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
  const [payingAmount, setPayingAmount] = useState(0)

  const { access_token } = getToken()

  const handleAddPayment = isFullPayment => {
    const amount = isFullPayment ? invoiceDue : payingAmount

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
            <form>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant='body1' fontSize={18} fontWeight={600}>
                    Total Due: {invoiceDue}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label='Paying Amount'
                    placeholder='Paying Amount'
                    name='payingAmount'
                    inputProps={{ inputMode: 'numeric', step: 'any' }}
                    onChange={e => {
                      const amount = parseFloat(e.target.value)

                      if (amount > invoiceDue || amount < 0) {
                        return setErrorText('Amount should be positive and not more than Due ')
                      }
                      if (amount === NaN) {
                        return setErrorText('Input number for amount')
                      }
                      setPayingAmount(amount)

                      setErrorText('')
                    }}
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
                  <Button onClick={() => handleAddPayment(false)} type='submit' variant='contained' size='small'>
                    Pay
                  </Button>
                  <Button onClick={() => handleAddPayment(true)} variant='contained' size='small'>
                    Pay Full amount
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
