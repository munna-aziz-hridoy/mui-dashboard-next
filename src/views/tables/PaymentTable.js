import React from 'react'
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography } from '@mui/material'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#100720', color: '#fff' }}>{children}</TableCell>
}

const PaymentTable = ({ payment }) => {
  return (
    <TableContainer sx={{ maxHeight: 750 }}>
      <Table size='small' stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Id</StyledTableCell>
            <StyledTableCell>Payment date</StyledTableCell>
            <StyledTableCell>Payment Amount</StyledTableCell>
            <StyledTableCell>Invoice Total</StyledTableCell>
            <StyledTableCell>Payment Status</StyledTableCell>
            <StyledTableCell>Supplier</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payment?.map(item => {
            const {
              id,
              amount,
              invoice: { id: invoice_id, invoice_total, payment_status, supplier },
              created_at
            } = item

            return (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  {invoice_id}
                </TableCell>
                <TableCell>{created_at?.split(' ')[0]}</TableCell>
                <TableCell>¥{amount}</TableCell>
                <TableCell>¥{invoice_total}</TableCell>
                <TableCell>
                  <Typography
                    bgcolor={
                      payment_status === 'Paid' ? '#56CA00' : payment_status === 'Partial' ? '#FFB400' : '#FF4C51'
                    }
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
                </TableCell>
                <TableCell>{supplier?.name}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentTable
