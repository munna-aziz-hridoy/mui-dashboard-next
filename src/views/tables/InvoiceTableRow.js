import React, { Fragment, useState } from 'react'
import Image from 'next/image'
import { TableRow, TableCell, Typography, Card, Button, Box } from '@mui/material'
import { tableCellClasses } from '@mui/material/TableCell'
import { styled } from '@mui/material/styles'

import ActionButton from 'src/@core/components/purchase-list/ActionButton'
import AddPaymentModal from 'src/@core/components/modal/addPaymentModal'
import { Toaster } from 'react-hot-toast'
import PrintedInvoiceModal from 'src/@core/components/modal/printedInvoiceModal'
import ViewPaymentModal from 'src/@core/components/modal/viewPaymentModal'
import ViewInvoiceImageModal from 'src/@core/components/modal/viewInvoiceImageModal'
import { AiFillEye } from 'react-icons/ai'
import { useRouter } from 'next/router'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: '#8336ff'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13
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

const InvoiceTableRow = ({ invoice, refetch, refetchValue }) => {
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false)
  const [openPaymentModal, setOpenPaymentModal] = useState(false)
  const [openViewPaymentModal, setOpenViewPaymentModal] = useState(false)
  const [openInvoiceImageModal, setOpenInvoiceImageModal] = useState(false)

  const {
    amount_paid,
    created_at,
    invoice_date,
    id,
    invoice_total,
    payment_status,
    stock_status,
    supplier,
    supplier_document,
    invoice_items
  } = invoice

  const totalQuantityArr = invoice_items?.map(item => item.quantity)
  const totalProductQuantity = totalQuantityArr?.reduce((prev, next) => prev + next)

  return (
    <Fragment>
      <StyledTableRow style={{ cursor: 'pointer' }} onClick={() => setOpenInvoiceModal(true)}>
        <StyledTableCell>
          <Button>
            <AiFillEye fontSize={18} color='#100720' />
          </Button>
        </StyledTableCell>
        <StyledTableCell align='left'>{created_at?.split(' ')[0]}</StyledTableCell>
        <StyledTableCell>{invoice_date?.split(' ')[0]}</StyledTableCell>
        <StyledTableCell
          onClick={e => {
            e.stopPropagation()
            setOpenInvoiceImageModal(true)
          }}
        >
          <img src={supplier_document} style={{ width: '60px', height: '90px' }} />
        </StyledTableCell>

        <StyledTableCell>{supplier ? supplier?.name : ''}</StyledTableCell>
        <StyledTableCell>{stock_status}</StyledTableCell>
        <StyledTableCell>{totalProductQuantity} unit</StyledTableCell>
        <StyledTableCell>¥{invoice_total}</StyledTableCell>
        <StyledTableCell>
          {payment_status === 'Unpaid' ? '¥' + 0 : payment_status === 'Paid' ? '¥' + invoice_total : '¥' + amount_paid}
        </StyledTableCell>
        <StyledTableCell>¥{invoice_total - amount_paid}</StyledTableCell>
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
          <Box
            component='div'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column-reverse'
            gap={1}
          >
            <ActionButton
              viewInvoiceModal={setOpenInvoiceModal}
              openPaymentModal={setOpenPaymentModal}
              viewPaymentModal={setOpenViewPaymentModal}
              paymentStatus={payment_status}
            />
          </Box>
        </StyledTableCell>
      </StyledTableRow>
      {openInvoiceModal && <PrintedInvoiceModal open={openInvoiceModal} setOpen={setOpenInvoiceModal} invoiceId={id} />}
      {openPaymentModal && (
        <AddPaymentModal
          open={openPaymentModal}
          setOpen={setOpenPaymentModal}
          invoiceId={id}
          invoiceDue={invoice_total - amount_paid}
          refetch={refetch}
        />
      )}
      {openViewPaymentModal && (
        <ViewPaymentModal
          open={openViewPaymentModal}
          setOpen={setOpenViewPaymentModal}
          invoiceId={id}
          refetchValue={refetchValue}
        />
      )}
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
