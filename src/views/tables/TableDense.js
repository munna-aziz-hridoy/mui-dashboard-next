// ** MUI Imports
import React, { Fragment } from 'react'

import { Paper, Table, TableRow, TableHead, TableBody, TableCell, TableContainer, Pagination, Box } from '@mui/material'
import { useRouter } from 'next/router'

const TableDense = ({ products, totalPages, pageCount }) => {
  const { pathname } = useRouter()

  return (
    <Fragment>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Regular Price</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((row, i) => (
              <TableRow key={i} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row?.product_name}
                </TableCell>
                <TableCell>{row?.regular_price}</TableCell>
                <TableCell>{row?.sell_price}</TableCell>
                <TableCell>{pathname.includes('offline') ? row?.cat_name : row.categories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        component='div'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        marginBottom={5}
        marginTop={2}
        marginLeft={3}
        marginRight={3}
        padding={4}
        style={{ background: '#f1f1f1', borderRadius: '5px' }}
      >
        <div></div>

        <Pagination count={totalPages} shape='rounded' onChange={(e, value) => pageCount(value)} />
      </Box>
    </Fragment>
  )
}

export default TableDense
