import React, { useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import PrintedInvoiceModal from 'src/@core/components/modal/printedInvoiceModal'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#100720', color: '#fff' }}>{children}</TableCell>
}

const Row = ({ data, index }) => {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false)

  const totalProducts = data?.invoice_items?.map(item => item.quantity).reduce((a, b) => a + b)

  const totalAmount = data?.invoice_items?.map(item => item.quantity * item.unit_cost).reduce((a, b) => a + b)

  const grandTotalCost = totalAmount + data?.tax + data?.shipping_charge - data?.discount

  return (
    <>
      <TableRow>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{data?.invoice_date?.split(' ')[0]}</TableCell>
        <TableCell>{data?.id}</TableCell>
        <TableCell>{totalProducts} unit</TableCell>
        <TableCell>¥{grandTotalCost}</TableCell>
        <TableCell>¥{data?.amount_paid}</TableCell>
        <TableCell>¥{grandTotalCost - data?.amount_paid}</TableCell>
        <TableCell>
          <Button
            onClick={() => setOpenInvoiceDetails(true)}
            variant='outlined'
            size='small'
            style={{ fontSize: '10px' }}
          >
            Details
          </Button>
        </TableCell>
      </TableRow>
      {openInvoiceDetails && (
        <PrintedInvoiceModal invoiceId={data?.id} open={openInvoiceDetails} setOpen={setOpenInvoiceDetails} />
      )}
    </>
  )
}

const SupplierPurchaseHistoryTable = ({ invoices, pageCount }) => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell>SL</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Invoice ID</StyledTableCell>
            <StyledTableCell>Total Product</StyledTableCell>
            <StyledTableCell>Total Cost</StyledTableCell>
            <StyledTableCell>Paid Amount</StyledTableCell>
            <StyledTableCell>Due Amount</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices?.data?.map((item, i) => (
            <Row key={i} data={item} index={i} />
          ))}
        </TableBody>
      </Table>
      <Box display='flex' justifyContent='space-between' alignItems='center' marginTop={3}>
        <div />
        <Pagination count={invoices?.total_pages} shape='rounded' onChange={(e, value) => pageCount(value)} />
      </Box>
    </TableContainer>
  )
}

export default SupplierPurchaseHistoryTable
