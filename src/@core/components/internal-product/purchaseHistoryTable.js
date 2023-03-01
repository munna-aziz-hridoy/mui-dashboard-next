import React, { Fragment } from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, Pagination, TableContainer } from '@mui/material'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#10072060', color: '#fff' }}>{children}</TableCell>
}

const PurchaseHistoryTable = ({ data = [], totalPages, pageCount }) => {
  return (
    <Fragment>
      <TableContainer sx={{ maxHeight: '450px' }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Unit Cost</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map(item => {
              const { stock_in_date, id, unit_cost, quantity, amount } = item
              return (
                <TableRow key={id}>
                  <TableCell>{stock_in_date.split(' ')[0]}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>¥{unit_cost}</TableCell>
                  <TableCell>¥{amount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && <Pagination count={totalPages} shape='rounded' onChange={(e, value) => pageCount(value)} />}
    </Fragment>
  )
}

export default PurchaseHistoryTable
