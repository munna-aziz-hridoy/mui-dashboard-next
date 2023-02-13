import React, { useEffect, useState } from 'react'
import Image from 'next/image'

// ** MUI imports
import {
  Box,
  Modal,
  Card,
  CardContent,
  Grid,
  TextField,
  CardHeader,
  Button,
  Typography,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Paper,
  Table
} from '@mui/material'
import { getInvoicePaymentDetails } from 'src/@core/apiFunction/invoice'
import PaymentTable from 'src/views/tables/PaymentTable'

// ** Icon imports

import { RxCross2 } from 'react-icons/rx'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 850,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const ViewInvoiceImageModal = ({ open, setOpen, invoiceImage }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <Image src={invoiceImage} width={700} height={850} />
        </Card>
        <Button
          onClick={() => setOpen(false)}
          color='error'
          variant='outlined'
          style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}
        >
          <RxCross2 fontSize={22} />
        </Button>
      </Box>
    </Modal>
  )
}

export default ViewInvoiceImageModal
