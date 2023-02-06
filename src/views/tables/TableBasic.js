// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Divider, Typography } from '@mui/material'

const TableBasic = ({ purchase_products, others }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, marginTop: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Cost</TableCell>
            <TableCell>Sub Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchase_products?.map(item => {
            const { id, product, quantity, unit_cost } = item

            return (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  {product?.product_name}
                </TableCell>
                <TableCell>{quantity}</TableCell>
                <TableCell>{unit_cost}</TableCell>
                <TableCell>{quantity * unit_cost}</TableCell>
              </TableRow>
            )
          })}

          <TableRow>
            <TableCell colSpan={4}>
              <Divider style={{ background: '#8336ff' }} />
            </TableCell>
          </TableRow>

          {others?.map((item, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-of-type  td, &:last-of-type  th, &:fast-of-type td, &:fast-of-type th': { border: 0 } }}
            >
              <TableCell colSpan={3} component='td'>
                <Typography variant='body1' fontSize={item.name === 'Invoice Total' ? 16 : 13}>
                  {item.name}
                </Typography>
              </TableCell>
              <TableCell component='td'>
                <Typography
                  variant='body1'
                  fontWeight={item.name === 'Invoice Total' ? 700 : 600}
                  fontSize={item.name === 'Invoice Total' ? 17 : 14}
                >
                  {item.amount}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableBasic
