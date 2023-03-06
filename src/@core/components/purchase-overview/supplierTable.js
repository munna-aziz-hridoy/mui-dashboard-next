import { Box, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const SupplierTable = ({ data, pageCount }) => {
  return (
    <Box component='div'>
      <Typography variant='body1' fontSize={16} fontWeight={500} marginBottom={2}>
        Supplier list
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell style={{ background: '#10072060' }}>SL</TableCell>
            <TableCell style={{ background: '#10072060' }}>Name</TableCell>
            <TableCell style={{ background: '#10072060' }}>Total Purchases</TableCell>
            <TableCell style={{ background: '#10072060' }}>Total Amount</TableCell>
            <TableCell style={{ background: '#10072060' }}>Due</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item?.supplier__name}</TableCell>
              <TableCell>{item?.total_purchases || 0}</TableCell>
              <TableCell>¥{item?.total_amount || 0}</TableCell>
              <TableCell>¥{item?.total_due || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={data?.total_pages}
        shape='rounded'
        onChange={(e, value) => pageCount(value)}
        style={{ margin: '20px 0' }}
      />
    </Box>
  )
}

export default SupplierTable
