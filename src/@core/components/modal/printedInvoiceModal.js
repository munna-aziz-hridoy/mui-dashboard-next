import React, { useState } from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, Grid, TextField, CardHeader, Button, Typography } from '@mui/material'
import { FaPrint } from 'react-icons/fa'
import PrintedInvoice from '../printed-invoice'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const PrintedInvoiceModal = ({ open, setOpen, invoice }) => {
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
              Print
            </Typography>
          </Button>
          <PrintedInvoice invoice={invoice} />
        </div>
      </Box>
      {/* <Toaster /> */}
    </Modal>
  )
}

export default PrintedInvoiceModal
