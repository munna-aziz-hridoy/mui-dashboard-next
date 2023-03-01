import React, { Fragment } from 'react'

import { Table, TableHead, TableBody, TableRow, TableCell, Pagination, TableContainer } from '@mui/material'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#10072060', color: '#fff' }}>{children}</TableCell>
}

const SellHistoryTable = ({ data = [], totalPages, pageCount }) => {
  return (
    <Fragment>
      <TableContainer sx={{ maxHeight: '450px' }}>
        <Table stickyHeader size='small'>
          <TableHead>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Quantity</StyledTableCell>
            <StyledTableCell>Unit Cost</StyledTableCell>
            <StyledTableCell>Sell Price</StyledTableCell>
            <StyledTableCell>Discount</StyledTableCell>
            <StyledTableCell>Total Customer</StyledTableCell>
            <StyledTableCell>Return Amount</StyledTableCell>
          </TableHead>
          <TableBody>
            {data.length !== 0 &&
              data?.map((item, i) => {
                const {
                  sell_date,
                  quantity,
                  unit_price,
                  sell_price,
                  total_discount,
                  num_of_customers,
                  returned_amount
                } = item

                return (
                  <TableRow key={i}>
                    <TableCell>{sell_date}</TableCell>
                    <TableCell>{quantity}</TableCell>
                    <TableCell>{unit_price}</TableCell>
                    <TableCell>{sell_price}</TableCell>
                    <TableCell>{total_discount}</TableCell>
                    <TableCell>{num_of_customers}</TableCell>
                    <TableCell>{returned_amount}</TableCell>
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

export default SellHistoryTable
