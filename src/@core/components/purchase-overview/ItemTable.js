import { Box, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const ItemTable = ({ data }) => {
  console.log(data)

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
          {data?.data?.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item?.invoice_items__product__product_name}</TableCell>
              <TableCell>{item?.quantity}</TableCell>
              <TableCell>{item?.invoices?.map(item => `${item}, `)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={data?.total_pages}
        shape='rounded'
        style={{ margin: '20px 0' }}
        //   onChange={(e, value) => pageCount(value)}
      />
    </Box>
  )
}

export default ItemTable
