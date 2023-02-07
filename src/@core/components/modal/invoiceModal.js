import React, { Fragment, useEffect, useState } from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, Grid, TextField, CardHeader, Button, Typography, Divider } from '@mui/material'

// ** Icon imports

import { FaPrint } from 'react-icons/fa'
import TableBasic from 'src/views/tables/TableBasic'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none',
  overflow: 'auto'
}

const InvoiceModal = ({ open, setOpen, invoice }) => {
  const {
    amount_paid,
    discount,
    invoice_total,
    invoice_type,
    item_amount,
    note,
    payment_status,
    invoice_items,
    shipping_charge,
    supplier,
    tax,
    invoice_date,
    tax_percentage,
    stock_status
  } = invoice

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box id='print-invoice' sx={style}>
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
        <Typography variant='body1' fontSize={24} fontWeight={600} textAlign='center'>
          Pims
        </Typography>
        <Typography variant='body2' fontSize={16} fontWeight={400} textAlign='center'>
          Purchase Details
        </Typography>
        <Divider />

        <Grid container spacing={20} justifyContent='space-between'>
          <Grid item>
            <Typography variant='body1' fontWeight={400} fontSize={14}>
              Date: <span style={{ fontWeight: '600', fontSize: '16px' }}>{invoice_date.split(' ')[0]}</span>
            </Typography>
            <Typography variant='body1' fontWeight={400} fontSize={14}>
              Payment Status: <span style={{ fontWeight: '600', fontSize: '16px' }}>{payment_status}</span>
            </Typography>
            <Typography variant='body1' fontWeight={400} fontSize={14}>
              Invoice Type: <span style={{ fontWeight: '600', fontSize: '16px' }}>{invoice_type}</span>
            </Typography>
            <Typography variant='body1' fontWeight={400} fontSize={14}>
              Purchase Status: <span style={{ fontWeight: '600', fontSize: '16px' }}>{stock_status}</span>
            </Typography>
          </Grid>
          <Grid item>
            {supplier && (
              <Fragment>
                <Typography variant='body1' fontWeight={400} fontSize={14}>
                  Supplier Name: <span style={{ fontWeight: '600', fontSize: '16px' }}>{supplier?.name}</span>
                </Typography>
                <Typography variant='body1' fontWeight={400} fontSize={14}>
                  Address: {supplier?.address}
                </Typography>
                <Typography variant='body1' fontWeight={400} fontSize={14}>
                  Email: {supplier?.email}
                </Typography>
                <Typography variant='body1' fontWeight={400} fontSize={14}>
                  Phone: {supplier?.phone}
                </Typography>
              </Fragment>
            )}
          </Grid>
        </Grid>

        <TableBasic
          purchase_products={invoice_items}
          others={[
            { amount: item_amount, name: 'Item Amount' },
            { amount: shipping_charge, name: 'Shipping Charge' },
            { amount: tax, name: 'Tax' },
            { amount: `${tax_percentage}%`, name: 'Tax Percentage' },
            { amount: discount, name: 'Discount' },
            { amount: amount_paid, name: 'Amount Paid' },
            { amount: invoice_total, name: 'Invoice Total' }
          ]}
        />

        <Typography variant='body1' fontWeight={400} fontSize={14} marginTop={15}>
          Note: {note}
        </Typography>
      </Box>
    </Modal>
  )
}

export default InvoiceModal
