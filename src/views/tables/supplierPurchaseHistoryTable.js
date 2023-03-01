import React, { Fragment, useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import PrintedInvoiceModal from 'src/@core/components/modal/printedInvoiceModal'
import useInvoiceDetails from 'src/@core/hooks/useInvoiceDetails'
import { getToken } from 'src/@core/utils/manageToken'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#100720', color: '#fff' }}>{children}</TableCell>
}

const Row = ({ data }) => {
  const [openInvoiceDetails, setOpenInvoiceDetails] = useState(false)

  const { access_token } = getToken()

  const { invoiceData, loading } = useInvoiceDetails(43, access_token)

  return (
    <>
      <TableRow>
        <TableCell>1</TableCell>
        <TableCell>45</TableCell>
        <TableCell>34</TableCell>
        <TableCell>¥75000</TableCell>
        <TableCell>¥35000</TableCell>
        <TableCell>¥40000</TableCell>
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
      <PrintedInvoiceModal invoice={invoiceData} open={openInvoiceDetails} setOpen={setOpenInvoiceDetails} />
    </>
  )
}

const SupplierPurchaseHistoryTable = () => {
  return (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader size='small'>
        <TableHead>
          <TableRow>
            <StyledTableCell>SL</StyledTableCell>
            <StyledTableCell>Invoice ID</StyledTableCell>
            <StyledTableCell>Total Product</StyledTableCell>
            <StyledTableCell>Total Cost</StyledTableCell>
            <StyledTableCell>Paid Amount</StyledTableCell>
            <StyledTableCell>Due Amount</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(item => (
            <Row key={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SupplierPurchaseHistoryTable
