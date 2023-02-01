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
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 120,
    align: 'left'
    // format: value => value.toLocaleString('en-US')
  },
  {
    id: 'batch-no',
    label: 'Batch No',
    minWidth: 140,
    align: 'left'
    // format: value => value.toLocaleString('en-US')
  },
  {
    id: 'expire-date',
    label: 'Expired Date',
    minWidth: 140,
    align: 'left'
    // format: value => value.toFixed(2)
  },
  {
    id: 'net-unit-cost',
    label: 'Net Unit Cost',
    minWidth: 130,
    align: 'left'
    // format: value => value.toFixed(2)
  },
  {
    id: 'discount',
    label: 'Discount',
    minWidth: 110,
    align: 'left'
  },
  {
    id: 'tax',
    label: 'Tax',
    minWidth: 110,
    align: 'left'
  },
  {
    id: 'sub-total',
    label: 'Sub Total',
    minWidth: 110,
    align: 'left'
  }
]
function createData(name, code, population, size) {
  const density = population / size

  return { name, code, population, size, density }
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767)
]

const TableStickyHeader = ({ products, setProducts }) => {
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
            {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                // <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                //   <TableCell>
                //     <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                //       <Typography variant='body1'>{name}</Typography>

                //       <BsPencilSquare onClick={() => setOpenEditProductModal(true)} fontSize={18} cursor='pointer' />
                //     </Box>
                //     <EditProduct open={openEditProductModal} setOpen={setOpenEditProductModal} product={row} />
                //   </TableCell>
                //   <TableCell>{id}</TableCell>
                //   <TableCell>
                //     <TextField type='number' />
                //   </TableCell>
                //   <TableCell>
                //     <TextField disabled style={{ background: '#eee', borderRadius: '3px' }} />
                //   </TableCell>
                //   <TableCell>
                //     <TextField disabled style={{ background: '#eee', borderRadius: '3px' }} />
                //   </TableCell>
                //   <TableCell>0.00</TableCell>
                //   <TableCell>0.00</TableCell>
                //   <TableCell>0.00</TableCell>
                //   <TableCell>0.00</TableCell>
                //   <TableCell>
                //     <Button
                //       onClick={() => {
                //         setProducts(prev => prev.filter(item => item.id !== id))
                //       }}
                //       variant='contained'
                //       color='error'
                //     >
                //       Delete
                //     </Button>
                //   </TableCell>
                // </TableRow>
                <ProductTableRow key={row.id} product={row} setProducts={setProducts} />
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableStickyHeader
