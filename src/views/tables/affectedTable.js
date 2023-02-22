import React, { useState } from 'react'
import {
  Card,
  TableContainer,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  TablePagination
} from '@mui/material'
import { useRouter } from 'next/router'

const AffectedTable = ({ affectedRows, setAffectedRows }) => {
  const { pathname } = useRouter()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Card style={{ margin: '15px 0' }}>
      <TableContainer>
        <Button onClick={() => setAffectedRows([])} variant='contained' style={{ margin: '20px' }}>
          Reset
        </Button>
        <Table size='small'>
          <TableHead>
            <TableRow style={{ background: 'red' }}>
              <TableCell width={130}>Row Number</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell width={130}>{pathname.includes('offline') ? 'Bar Code' : 'Product ID'}</TableCell>
              <TableCell>Rejected reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {affectedRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map(item => (
              <TableRow key={item.index}>
                <TableCell>
                  <Typography>{item.index}</Typography>
                </TableCell>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{pathname.includes('offline') ? item.barcode : item.product_id}</TableCell>
                <TableCell>
                  <Typography variant='body2' fontSize={10} color='error'>
                    {item.error}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 40, 60]}
        component='div'
        count={affectedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  )
}

export default AffectedTable
