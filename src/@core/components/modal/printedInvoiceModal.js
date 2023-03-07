import React, { useState } from 'react'

// ** MUI imports
import { Box, Modal, Button, Typography, CircularProgress } from '@mui/material'
import { FaPrint } from 'react-icons/fa'
import PrintedInvoice from '../printed-invoice'
import { getToken } from 'src/@core/utils/manageToken'
import useInvoiceDetails from 'src/@core/hooks/useInvoiceDetails'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none',
  overflowY: 'scroll'
}

const PrintedInvoiceModal = ({ open, setOpen, invoiceId }) => {
  const { access_token } = getToken()

  const { loading, invoiceData } = useInvoiceDetails(invoiceId, access_token)

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <div>
          <Button
            onClick={() => {
              window.print()
            }}
            variant='outlined'
          >
            <FaPrint fontSize={18} />
            <Typography variant='body1' fontSize={14} marginLeft={2} textTransform='capitalize' fontWeight={500}>
              Print {invoiceId}
            </Typography>
          </Button>
          {loading ? (
            <Box
              component='div'
              style={{ width: '100%', height: '100%' }}
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <CircularProgress color='primary' />
            </Box>
          ) : (
            <PrintedInvoice invoice={invoiceData} />
          )}
        </div>
      </Box>
      {/* <Toaster /> */}
    </Modal>
  )
}

export default PrintedInvoiceModal
