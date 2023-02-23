import React, { useEffect, useState } from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, CardHeader, Typography } from '@mui/material'
import { getInvoicePaymentDetails } from 'src/@core/apiFunction/invoice'
import PaymentTable from 'src/views/tables/PaymentTable'
import { getToken } from 'src/@core/utils/manageToken'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const ViewPaymentModal = ({ open, setOpen, invoiceId, refetchValue }) => {
  const [paymentDetails, setPaymentDetails] = useState([])

  const { access_token } = getToken()

  useEffect(() => {
    getInvoicePaymentDetails(invoiceId, access_token).then(data => {
      if (data.success) {
        setPaymentDetails(data.data)
      }
    })
  }, [refetchValue])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <CardHeader title='Payment History' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            {paymentDetails.length === 0 ? (
              <Typography variant='body1' fontSize={22} fontWeight={500}>
                No payment history for this invoice
              </Typography>
            ) : (
              <PaymentTable payment={paymentDetails} />
            )}
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default ViewPaymentModal
