// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Button } from '@mui/material'
import { AiFillEye } from 'react-icons/ai'
import { useRouter } from 'next/router'

const TableSupplier = ({ supplier }) => {
  const router = useRouter()

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
            <TableCell>View</TableCell>
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
              <TableCell>{row?.address.length > 40 ? `${row?.address.slice(0, 40)}...` : row?.address}</TableCell>
              <TableCell>
                <Button onClick={() => router.push(`/others/supplier/${row?.id}`)} variant='outlined' size='small'>
                  <AiFillEye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableSupplier
