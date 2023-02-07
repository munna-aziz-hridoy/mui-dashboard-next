// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { styled } from '@mui/material/styles'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import { CircularProgress, TablePagination } from '@mui/material'
import { useEffect, useState } from 'react'
import InvoiceTableRow from './InvoiceTableRow'
import { getAllInvoiceList } from 'src/@core/apiFunction/invoice'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: '#8336ff'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const TableCustomized = () => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const [invoices, setInvoices] = useState([])

  useEffect(() => {
    setLoading(true)
    getAllInvoiceList().then(data => {
      setInvoices(data)
      setLoading(false)
    })
  }, [refetch])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  console.log(invoices)

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Invoice</StyledTableCell>
              <StyledTableCell>Suplier</StyledTableCell>
              <StyledTableCell>Purchase Status</StyledTableCell>
              <StyledTableCell>Grand Total</StyledTableCell>
              <StyledTableCell>Paid</StyledTableCell>
              <StyledTableCell>Due</StyledTableCell>
              <StyledTableCell>Payment Status</StyledTableCell>

              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={8}>
                  <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'block' }} />
                </TableCell>
              </TableRow>
            )}

            {invoices
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

              .map((invoice, i) => (
                <InvoiceTableRow key={i} invoice={invoice} refetch={setRefetch} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component='div'
        count={invoices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

export default TableCustomized
