// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import { Box, Pagination } from '@mui/material'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { BsCheck, BsX } from 'react-icons/bs'

const SalesTable = ({ sellData, totalPages, setPageNumber }) => {
  console.log(sellData)

  const { pathname } = useRouter()

  return (
    <Fragment>
      <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
        <Table size='small' stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>{pathname.includes('offline') ? 'Barcode' : 'Product ID'}</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Sell Price</TableCell>
              <TableCell>Discounted Price</TableCell>

              <TableCell>Total Discount</TableCell>

              {pathname.includes('offline') && <TableCell>Total Customer</TableCell>}

              <TableCell>{pathname.includes('offline') ? 'Return Count' : 'Refund Count'}</TableCell>
              <TableCell>Return amount</TableCell>
              <TableCell>Is Mapped</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sellData?.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{item?.sell_date}</TableCell>
                  <TableCell>{item?.product_name}</TableCell>
                  <TableCell>{pathname.includes('offline') ? item?.barcode : item?.product_id}</TableCell>
                  <TableCell>
                    ¥{pathname.includes('offline') ? item?.unit_price : item?.product_current_price}
                  </TableCell>
                  <TableCell>
                    {pathname.includes('offline') ? item?.quantity : item?.summary_report_total_quantity}
                  </TableCell>
                  <TableCell>
                    ¥
                    {pathname.includes('offline')
                      ? item?.sell_price
                      : item?.product_current_price * item?.summary_report_total_quantity}
                  </TableCell>
                  <TableCell>
                    ¥
                    {pathname.includes('offline') ? item?.sell_price_after_discount : item?.summary_report_total_amount}
                  </TableCell>
                  <TableCell>
                    ¥
                    {pathname.includes('offline')
                      ? item?.total_discount || 0
                      : item?.summary_report_total_discount || 0}
                  </TableCell>
                  {pathname.includes('offline') && <TableCell>{item?.num_of_customers}</TableCell>}
                  <TableCell>
                    {pathname.includes('offline')
                      ? item?.returned_count || 0
                      : item?.summary_report_total_refund_count || 0}
                  </TableCell>
                  <TableCell>
                    ¥
                    {pathname.includes('offline')
                      ? item?.returned_amount || 0
                      : item?.summary_report_total_refund_amount || 0}
                  </TableCell>
                  <TableCell align='center'>
                    {item?.is_mapped ? <BsCheck fontSize={22} color='green' /> : <BsX fontSize={22} color='red' />}
                  </TableCell>
                </TableRow>
              )
            })}
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

        <Pagination count={totalPages} shape='rounded' onChange={(e, value) => setPageNumber(value)} />
      </Box>
    </Fragment>
  )
}

export default SalesTable
