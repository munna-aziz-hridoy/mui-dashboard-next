// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const TableSupplier = ({ supplier }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Fax</TableCell>
            <TableCell>Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {supplier?.map((row, i) => (
            <TableRow key={i} sx={{ '&:last-of-type  td, &:last-of-type  th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {row?.name}
              </TableCell>
              <TableCell>{row?.phone}</TableCell>
              <TableCell>{row?.email}</TableCell>
              <TableCell>{row?.fax}</TableCell>
              <TableCell>{row?.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableSupplier
