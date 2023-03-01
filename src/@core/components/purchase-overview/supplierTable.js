import { Box, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const SupplierTable = ({ data = [] }) => {
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Supplier N</TableCell>
            <TableCell>6</TableCell>
            <TableCell>¥101000</TableCell>
            <TableCell>¥8100</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Pagination
        count={3}
        shape='rounded'
        //   onChange={(e, value) => pageCount(value)}
        style={{ margin: '20px 0' }}
      />
    </Box>
  )
}

export default SupplierTable
