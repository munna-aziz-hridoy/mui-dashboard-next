import { Box, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const ItemTable = ({ data }) => {
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
              <TableCell style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item?.invoices?.map(item => {
                  const invoice = item.split('(')[0]
                  const quantity = item.split('(')[1].split(')')[0]
                  return (
                    <Typography variant='body2' fontSize={12}>
                      Invc: <span style={{ fontSize: '13px', fontWeight: '600' }}>{invoice}</span> (Qyt:{' '}
                      <span style={{ fontSize: '13px', fontWeight: '600' }}>{quantity}</span>),{' '}
                    </Typography>
                  )
                })}
              </TableCell>
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
