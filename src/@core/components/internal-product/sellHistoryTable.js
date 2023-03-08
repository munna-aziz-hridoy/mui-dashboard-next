import React, { Fragment, useState } from 'react'

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  TableContainer,
  Box,
  CircularProgress
} from '@mui/material'
import { getToken } from 'src/@core/utils/manageToken'
import { handleSetSellHistory } from 'src/@core/helper'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#10072060', color: '#fff' }}>{children}</TableCell>
}

const SellHistoryTable = ({ data = [], totalPages, pageCount, setSellHistory, setTotalSellPage, productId }) => {
  const { access_token } = getToken()
  const [loading, setLoading] = useState(false)

  const handlePageClick = (e, value) => {
    pageCount(value)
    handleSetSellHistory(productId, value, access_token, setSellHistory, setTotalSellPage, setLoading)
  }

  return (
    <Fragment>
      {loading ? (
        <Box display='flex' justifyContent='center' alignContent='center'>
          <CircularProgress color='primary' />
        </Box>
      ) : (
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
      )}

      {totalPages > 1 && <Pagination count={totalPages} shape='rounded' onChange={handlePageClick} />}
    </Fragment>
  )
}

export default SellHistoryTable
