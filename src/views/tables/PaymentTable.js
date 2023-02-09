import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material'

import React from 'react'

const PaymentTable = ({ payment }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Id</TableCell>
            <TableCell>Payment date</TableCell>
            <TableCell>Payment Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payment?.map(item => {
            const { id, amount, invoice, created_at } = item

            return (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  {invoice}
                </TableCell>
                <TableCell>{created_at?.split(' ')[0]}</TableCell>
                <TableCell>{amount}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentTable
