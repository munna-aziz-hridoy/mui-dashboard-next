// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import Collapse from '@mui/material/Collapse'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'
import { Pagination } from '@mui/material'

import { getToken } from 'src/@core/utils/manageToken'
import { internalProductDetailsInfo } from 'src/@core/apiFunction/product'

// const useStyles = makeStyles({
//   table: {
//     '& .MuiTableCell-root': {
//       borderLeft: '1px solid rgba(224, 224, 224, 1)'
//     }
//   }
// })

const Row = props => {
  const [allPurchaseUrl, setAllPurchaseUrl] = useState('')

  // ** Props
  const { row } = props
  console.log(row)

  const { access_token } = getToken()

  // ** State
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setAllPurchaseUrl(row.all_purchase_link)
  }, [row])

  useEffect(() => {
    if (row) {
      internalProductDetailsInfo(row?.id, access_token)
    }
  }, [row])

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row?.product_name}
        </TableCell>
        <TableCell>{row?.product_unit}</TableCell>
        <TableCell>{row?.total_quantity}</TableCell>
        {/* <TableCell>{row.carbs}</TableCell>
        <TableCell>{row.protein}</TableCell> */}
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box bgcolor='#f7f7f7' sx={{ m: 2, p: 2, borderRadius: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Online Product
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Product Id</TableCell>
                    {/* <TableCell>Quantity</TableCell>
                    <TableCell>Unit Cost</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.onlineProduct.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component='th' scope='row'>
                        {item?.product_name}
                      </TableCell>
                      <TableCell>{item?.product_ID}</TableCell>
                      {/* <TableCell>{item?.total_quantity}</TableCell>
                      <TableCell>{item?.unit_cost}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            <Box bgcolor='#f7f7f7' sx={{ m: 2, p: 2, borderRadius: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Offline Product
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Bar Code</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.offlineProduct.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component='th' scope='row'>
                        {item?.product_name}
                      </TableCell>
                      <TableCell>{item?.barcode}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const TableCollapsible = ({ products, totalPages, pageCount }) => {
  // const classes = useStyles()

  return (
    <Fragment>
      <TableContainer component={Paper} sx={{ maxHeight: 750 }}>
        <Table size='small' stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Quantity</TableCell>
              {/* <TableCell>Carbs (g)</TableCell>
            <TableCell>Protein (g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(row => (
              <Row key={row.id} row={row} />
            ))}
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

        <Pagination count={totalPages} shape='rounded' onChange={(e, value) => pageCount(value)} />
      </Box>
    </Fragment>
  )
}

export default TableCollapsible
