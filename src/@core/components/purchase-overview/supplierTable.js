import { Box, Button, Pagination, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillEye } from 'react-icons/ai'

const SupplierTable = ({ data, pageCount }) => {
  const router = useRouter()

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
            <TableCell style={{ background: '#10072060' }}>View</TableCell>
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
              <TableCell>
                <Button onClick={() => router.push(`/others/supplier/${item?.id}`)} variant='outlined' size='small'>
                  <AiFillEye />
                </Button>
              </TableCell>
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
