import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { TableRow, TableCell, Typography, Card } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

import ActionButton from 'src/@core/components/purchase-list/ActionButton'
import AddPaymentModal from 'src/@core/components/modal/addPaymentModal'
import { Toaster } from 'react-hot-toast'
import PrintedInvoiceModal from 'src/@core/components/modal/printedInvoiceModal'
import ViewPaymentModal from 'src/@core/components/modal/viewPaymentModal'
import ViewInvoiceImageModal from 'src/@core/components/modal/viewInvoiceImageModal'

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
  const [openViewPaymentModal, setOpenViewPaymentModal] = useState(false)
  const [openInvoiceImageModal, setOpenInvoiceImageModal] = useState(false)

  const { amount_paid, created_at, id, invoice_total, payment_status, stock_status, supplier, supplier_document } =
    invoice

  return (
    <Fragment>
      <StyledTableRow style={{ cursor: 'pointer' }} onClick={() => setOpenInvoiceModal(true)}>
        <StyledTableCell align='center'>{created_at?.split(' ')[0]}</StyledTableCell>
        <StyledTableCell
          onClick={e => {
            e.stopPropagation()
            setOpenInvoiceImageModal(true)
          }}
        >
          <Card>
            <Image src={supplier_document} width={60} height={90} />
          </Card>
        </StyledTableCell>

        <StyledTableCell>{supplier ? supplier?.name : ''}</StyledTableCell>
        <StyledTableCell>{stock_status}</StyledTableCell>
        <StyledTableCell>{invoice_total}</StyledTableCell>
        <StyledTableCell>
          {payment_status === 'Unpaid' ? 0 : payment_status === 'Paid' ? invoice_total : amount_paid}
        </StyledTableCell>
        <StyledTableCell>{invoice_total - amount_paid}</StyledTableCell>
        <StyledTableCell align='center'>
          <Typography
            bgcolor={payment_status === 'Paid' ? '#56CA00' : payment_status === 'Partial' ? '#FFB400' : '#FF4C51'}
            display='flex'
            justifyContent='center'
            alignItems='center'
            padding={2}
            borderRadius={3}
            fontSize={12}
            fontWeight={500}
            color='#000'
          >
            {payment_status}
          </Typography>
        </StyledTableCell>
        <StyledTableCell onClick={e => e.stopPropagation()}>
          <ActionButton
            viewInvoiceModal={setOpenInvoiceModal}
            openPaymentModal={setOpenPaymentModal}
            viewPaymentModal={setOpenViewPaymentModal}
            paymentStatus={payment_status}
          />
        </StyledTableCell>
        {/* <InvoiceModal open={openInvoiceModal} setOpen={setOpenInvoiceModal} /> */}
      </StyledTableRow>
      <PrintedInvoiceModal open={openInvoiceModal} setOpen={setOpenInvoiceModal} invoice={invoice} />
      <AddPaymentModal
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
        invoiceId={id}
        invoiceDue={invoice_total - amount_paid}
        refetch={refetch}
      />
      <ViewPaymentModal open={openViewPaymentModal} setOpen={setOpenViewPaymentModal} invoiceId={id} />
      <ViewInvoiceImageModal
        open={openInvoiceImageModal}
        setOpen={setOpenInvoiceImageModal}
        invoiceImage={supplier_document}
      />
      <Toaster />
    </Fragment>
  )
}

export default InvoiceTableRow
