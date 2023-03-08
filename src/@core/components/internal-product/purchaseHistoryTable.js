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
import { handleSetPurchaseHistory } from 'src/@core/helper'
import { getToken } from 'src/@core/utils/manageToken'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#10072060', color: '#fff' }}>{children}</TableCell>
}

const PurchaseHistoryTable = ({
  data = [],
  totalPages,
  pageCount,
  setTotalPurchasePage,
  setPurchaseHistory,
  productId
}) => {
  const { access_token } = getToken()
  const [loading, setLoading] = useState(false)

  const handlePageClick = (e, value) => {
    pageCount(value)
    handleSetPurchaseHistory(productId, value, access_token, setPurchaseHistory, setTotalPurchasePage, setLoading)
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
      )}

      {totalPages > 1 && <Pagination count={totalPages} shape='rounded' onChange={handlePageClick} />}
    </Fragment>
  )
}

export default PurchaseHistoryTable
