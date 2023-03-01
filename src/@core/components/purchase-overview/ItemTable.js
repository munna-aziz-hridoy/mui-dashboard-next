import { Box, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const ItemTable = ({ data = [] }) => {
  return (
    <Box component='div'>
      <Typography variant='body1' fontSize={16} fontWeight={500} marginBottom={2}>
        Item list
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell style={{ background: '#10072059' }}>SL</TableCell>
            <TableCell style={{ background: '#10072059' }}>Product Name</TableCell>
            <TableCell style={{ background: '#10072059' }}>Quantity</TableCell>
            <TableCell style={{ background: '#10072059' }}>Invoices</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>56</TableCell>
            <TableCell>101 (30), 107 (26)</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Pagination
        count={3}
        shape='rounded'
        style={{ margin: '20px 0' }}
        //   onChange={(e, value) => pageCount(value)}
      />
    </Box>
  )
}

export default ItemTable
