import React from 'react'

import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#10072060', color: '#fff' }}>{children}</TableCell>
}

const ProductTable = ({ data = [], online = false }) => {
  return (
    <TableContainer sx={{ maxHeight: '450px' }}>
      <Table stickyHeader size='small' aria-label='purchases'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>{online ? 'Product Id' : 'Barcode'}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, i) => (
            <TableRow key={i}>
              <TableCell component='th' scope='row'>
                {item?.product_name}
              </TableCell>
              <TableCell>{online ? item?.product_ID : item?.barcode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProductTable
