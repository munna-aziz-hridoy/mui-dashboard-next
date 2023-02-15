// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Divider, Typography } from '@mui/material'

const SalesTable = ({ salesData }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Barcode</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Sell Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Customer</TableCell>
            <TableCell>Profit</TableCell>
            <TableCell>Return amount</TableCell>
            <TableCell>Total Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>2023-02-17</TableCell>
            <TableCell>Ashirbad Ata</TableCell>
            <TableCell>039403034</TableCell>
            <TableCell>110</TableCell>
            <TableCell>130</TableCell>
            <TableCell>200</TableCell>
            <TableCell>90</TableCell>
            <TableCell>4000</TableCell>
            <TableCell>14</TableCell>
            <TableCell>6000</TableCell>
          </TableRow>

          {/* {salesData?.map(item => {
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
          })} */}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SalesTable
