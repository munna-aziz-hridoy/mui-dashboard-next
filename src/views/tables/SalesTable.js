// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Divider, Typography } from '@mui/material'

const SalesTable = ({ sellData }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
      <Table size='small' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Barcode</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Sell Price</TableCell>
            <TableCell>Discounted Price</TableCell>
            <TableCell>Total Customer</TableCell>
            {/* <TableCell>Profit</TableCell> */}
            <TableCell>Return Count</TableCell>
            <TableCell>Return amount</TableCell>
            <TableCell>Total Discount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellData?.map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{item?.sell_date}</TableCell>
                <TableCell>{item?.product_name}</TableCell>
                <TableCell>{item?.barcode}</TableCell>
                <TableCell>¥{item?.unit_price}</TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell>¥{item?.sell_price}</TableCell>
                <TableCell>¥{item?.sell_price_after_discount}</TableCell>
                <TableCell>{item?.num_of_customers}</TableCell>
                <TableCell>{item?.returned_count || 0}</TableCell>
                <TableCell>¥{item?.returned_amount || 0}</TableCell>
                <TableCell>¥{item?.total_discount || 0}</TableCell>
              </TableRow>
            )
          })}

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
