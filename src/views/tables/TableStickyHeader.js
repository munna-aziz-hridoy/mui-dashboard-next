// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

import { BsTrash, BsPencilSquare } from 'react-icons/bs'
import { Box, Button, TextField, Typography } from '@mui/material'
import EditProduct from 'src/@core/components/modal/editProductPropertiesModal'
import ProductTableRow from './ProductTableRow'

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 120,
    align: 'left'
    // format: value => value.toLocaleString('en-US')
  },
  // {
  //   id: 'batch-no',
  //   label: 'Batch No',
  //   minWidth: 140,
  //   align: 'left'
  //   // format: value => value.toLocaleString('en-US')
  // },
  // {
  //   id: 'expire-date',
  //   label: 'Expired Date',
  //   minWidth: 140,
  //   align: 'left'
  //   // format: value => value.toFixed(2)
  // },
  {
    id: 'net-unit-cost',
    label: 'Net Unit Cost',
    minWidth: 130,
    align: 'left'
    // format: value => value.toFixed(2)
  },
  // {
  //   id: 'discount',
  //   label: 'Discount',
  //   minWidth: 110,
  //   align: 'left'
  // },
  // {
  //   id: 'tax',
  //   label: 'Tax',
  //   minWidth: 110,
  //   align: 'left'
  // },
  {
    id: 'sub-total',
    label: 'Sub Total',
    minWidth: 110,
    align: 'left'
  }
]

const TableStickyHeader = ({ products, setProducts, invoiceTotal }) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
              <TableCell align='right' sx={{ minWidth: 120 }}>
                <BsTrash />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .reverse()
              .map(row => {
                return <ProductTableRow key={row.product} productData={row} setProducts={setProducts} />
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={products?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Typography textAlign='right' variant='h5' fontSize={18} fontWeight={600} marginRight={10}>
        Total: {invoiceTotal}
      </Typography>
    </Paper>
  )
}

export default TableStickyHeader
