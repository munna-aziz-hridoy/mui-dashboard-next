// ** React Imports
import { useState, Fragment, useEffect } from 'react'

import Link from 'next/link'

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
import { CircularProgress, Grid, Pagination } from '@mui/material'

import { getToken } from 'src/@core/utils/manageToken'

import { AiFillEye } from 'react-icons/ai'
import ProductTable from 'src/@core/components/internal-product/productTable'

import PurchaseHistoryTable from 'src/@core/components/internal-product/purchaseHistoryTable'
import SellHistoryTable from 'src/@core/components/internal-product/sellHistoryTable'

import { handleSetPurchaseHistory, handleSetSellHistory } from 'src/@core/helper'

const Row = ({ row }) => {
  // ** State
  const [open, setOpen] = useState(false)
  const [purchaseHistoryTest, setPurchaseHistoryTest] = useState(null)
  const [sellHistoryTest, setSellHistoryTest] = useState(null)
  const [loadingPur, setLoadingPur] = useState(false)
  const [loadingSell, setLoadingSell] = useState(false)

  const [purchasePageCount, setpurchasePageCount] = useState(1)
  const [sellDataPageCount, setSellDataPageCount] = useState(1)

  const [purchaseHistoryTotalPage, setPurchaseHistoryTotalPage] = useState(1)
  const [sellHistoryTotalPage, setSellHistoryTotalPage] = useState(1)

  const { access_token } = getToken()

  const handleCollapseClick = () => {
    setOpen(prev => {
      if (prev === false) {
        if (!purchaseHistoryTest) {
          handleSetPurchaseHistory(
            row?.id,
            purchasePageCount,
            access_token,
            setPurchaseHistoryTest,
            setPurchaseHistoryTotalPage,
            setLoadingPur
          )
        }
        if (!sellHistoryTest) {
          handleSetSellHistory(
            row?.id,
            sellDataPageCount,
            access_token,
            setSellHistoryTest,
            setSellHistoryTotalPage,
            setLoadingSell
          )
        }
      }

      return !prev
    })
  }

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton onClick={handleCollapseClick} aria-label='expand row' size='small'>
            {open ? <ChevronUp /> : <ChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row?.product_name}
        </TableCell>
        <TableCell>{row?.product_unit}</TableCell>
        <TableCell>{row?.total_quantity}</TableCell>
        <TableCell>??{row?.unit_cost}</TableCell>
        <TableCell>??{row?.total_amount}</TableCell>
        <TableCell>
          <Link href={`/products/internal-product/${row?.id}`}>
            <AiFillEye cursor='pointer' fontSize={18} color='#100720' />
          </Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: '0 !important' }}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Grid container bgcolor='#10020717' borderRadius={1} marginTop={1} marginBottom={1}>
              <Grid item xs={12} sm={6}>
                <Box bgcolor='#f7f7f7' sx={{ m: 2, p: 2, borderRadius: 1 }}>
                  <Typography variant='body1'>Online Product</Typography>
                  <ProductTable online data={row?.onlineProduct} />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box bgcolor='#f7f7f7' sx={{ m: 2, p: 2, borderRadius: 1 }}>
                  <Typography variant='body1'>Offline Product</Typography>
                  <ProductTable data={row?.offlineProduct} />
                </Box>
              </Grid>
              <Grid item xs={12}>
                {loadingPur ? (
                  <Box
                    component='div'
                    bgcolor='#f7f7f7'
                    sx={{ m: 2, p: 2, borderRadius: 1 }}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  purchaseHistoryTest && (
                    <Box bgcolor='#f7f7f7' sx={{ m: 2, p: 2, borderRadius: 1 }}>
                      <Typography variant='body1'>Purchase History</Typography>
                      <PurchaseHistoryTable
                        data={purchaseHistoryTest}
                        totalPages={purchaseHistoryTotalPage}
                        pageCount={setpurchasePageCount}
                        setPurchaseHistory={setPurchaseHistoryTest}
                        setTotalPurchasePage={setPurchaseHistoryTotalPage}
                        productId={row?.id}
                      />
                    </Box>
                  )
                )}
              </Grid>
              <Grid item xs={12}>
                {loadingSell ? (
                  <Box
                    component='div'
                    bgcolor='#f7f7f7'
                    sx={{ m: 2, p: 2, borderRadius: 1 }}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  sellHistoryTest && (
                    <Box bgcolor='#f7f7f7' sx={{ m: 2, p: 2, borderRadius: 1 }}>
                      <Typography variant='body1'>Sell History</Typography>
                      <SellHistoryTable
                        data={sellHistoryTest}
                        totalPages={sellHistoryTotalPage}
                        pageCount={setSellDataPageCount}
                        setSellHistory={setSellHistoryTest}
                        setTotalSellPage={setSellHistoryTotalPage}
                        productId={row?.id}
                      />
                    </Box>
                  )
                )}
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

const TableCollapsible = ({ products, totalPages, pageCount, refetch }) => {
  console.log(products)

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
              <TableCell>Unit Cost</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>View</TableCell>
              {/* <TableCell>Carbs (g)</TableCell>
            <TableCell>Protein (g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map(row => (
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

        <Pagination
          count={totalPages}
          shape='rounded'
          onChange={(e, value) => {
            pageCount(value)
            refetch(prev => !prev)
          }}
        />
      </Box>
    </Fragment>
  )
}

export default TableCollapsible
