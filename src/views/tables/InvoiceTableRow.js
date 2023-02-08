import React, { Fragment, useState } from 'react'
import { TableRow, TableCell, Typography } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

import InvoiceModal from 'src/@core/components/modal/invoiceModal'
import ActionButton from 'src/@core/components/purchase-list/ActionButton'
import AddPaymentModal from 'src/@core/components/modal/addPaymentModal'
import { Toaster } from 'react-hot-toast'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: '#8336ff'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },

  // hide last border
  '&:last-of-type td, &:last-of-type th': {
    border: 0
  }
}))

const InvoiceTableRow = ({ invoice, refetch }) => {
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false)
  const [openPaymentModal, setOpenPaymentModal] = useState(false)

  // const { id, invoice_date, invoice_total, payment_status, amount_paid, supplier, stock_status } = invoice

  // const {
  //   amount_paid,
  //   created_at,
  //   discount,
  //   id,
  //   invoice_date,
  //   invoice_items,
  //   invoice_type,
  //   invoice_total,
  //   note,
  //   payment_status,
  //   shipping_charge,
  //   stock_status,
  //   supplier,
  //   tax,
  //   tax_percentage
  // } = invoice

  const { amount_paid, created_at, id, invoice_total, payment_status, stock_status, supplier } = invoice

  // const date = invoice_date.split(' ')[0]

  return (
    <Fragment>
      <StyledTableRow style={{ cursor: 'pointer' }} onClick={() => setOpenInvoiceModal(true)}>
        <StyledTableCell>{created_at?.split(' ')[0]}</StyledTableCell>
        <StyledTableCell onClick={e => e.stopPropagation()}>invoice image</StyledTableCell>
        <StyledTableCell>{supplier ? supplier?.name : ''}</StyledTableCell>
        <StyledTableCell>{stock_status}</StyledTableCell>
        <StyledTableCell>{invoice_total}</StyledTableCell>
        <StyledTableCell>
          {payment_status === 'Unpaid' ? 0 : payment_status === 'Paid' ? invoice_total : amount_paid}
        </StyledTableCell>
        <StyledTableCell>{invoice_total - amount_paid}</StyledTableCell>
        <StyledTableCell>
          <Typography
            bgcolor={payment_status === 'Paid' ? '#56CA00' : payment_status === 'Partial' ? '#FFB400' : '#FF4C51'}
            display='inline'
            padding={2}
            borderRadius={3}
            fontSize={12}
            color='#fff'
          >
            {payment_status}
          </Typography>
        </StyledTableCell>
        <StyledTableCell onClick={e => e.stopPropagation()}>
          <ActionButton
            viewInvoiceModal={setOpenInvoiceModal}
            viewPaymentModal={setOpenPaymentModal}
            paymentStatus={payment_status}
          />
        </StyledTableCell>
      </StyledTableRow>
      <InvoiceModal open={openInvoiceModal} setOpen={setOpenInvoiceModal} invoice={invoice} />
      <AddPaymentModal
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
        invoiceId={id}
        invoiceDue={invoice_total - amount_paid}
        refetch={refetch}
      />
      <Toaster />
    </Fragment>
  )
}

export default InvoiceTableRow
