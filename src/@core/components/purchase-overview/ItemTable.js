import React, { Fragment, useEffect, useState } from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material'
import PrintedInvoiceModal from '../modal/printedInvoiceModal'
import { getSingleInvoiceDetails } from 'src/@core/apiFunction/invoice'
import { getToken } from 'src/@core/utils/manageToken'
import { AiOutlineEye } from 'react-icons/ai'

const PerInvoice = ({ item, length, index }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [invoiceData, setInvoiceData] = useState(null)
  const [loading, setLoading] = useState(false)

  const invoice = item.split('(')[0]
  const quantity = item.split('(')[1].split(')')[0]

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getSingleInvoiceDetails(invoice, access_token).then(data => {
      if (data?.created_at) {
        setInvoiceData(data)
      }
      setLoading(false)
    })
  }, [])

  return (
    <Fragment>
      <Typography
        variant='body2'
        fontSize={12}
        style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}
      >
        Invc:{' '}
        <span
          style={{
            fontSize: '13px',
            fontWeight: '600',

            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {invoice}

          {loading ? (
            ''
          ) : (
            <Tooltip title='View' placement='top'>
              <Button
                onClick={() => setIsOpenModal(prev => !prev)}
                style={{
                  margin: '0',
                  padding: '0',
                  maxWidth: '25px',
                  minWidth: '25px',
                  borderBottom: '1px solid #000',
                  borderRadius: '0px',
                  marginLeft: '4px'
                }}
              >
                <AiOutlineEye fontSize={16} style={{ marginTop: '0px', cursor: 'pointer' }} />
              </Button>
            </Tooltip>
          )}
        </span>{' '}
        (Qyt: <span style={{ fontSize: '13px', fontWeight: '600' }}>{quantity}</span>){length - 1 === index ? '' : ','}
      </Typography>
      <PrintedInvoiceModal open={isOpenModal} setOpen={setIsOpenModal} invoice={invoiceData} />
    </Fragment>
  )
}

const ItemTable = ({ data, pageCount }) => {
  return (
    <Box component='div'>
      <Typography variant='body1' fontSize={16} fontWeight={500} marginBottom={2}>
        Item list
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell style={{ background: '#10072059' }}>SL</TableCell>
            <TableCell style={{ background: '#10072059' }}>Product Name</TableCell>
            <TableCell style={{ background: '#10072059' }}>Quantity</TableCell>
            <TableCell style={{ background: '#10072059' }}>Invoices</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{item?.invoice_items__product__product_name}</TableCell>
              <TableCell>{item?.quantity}</TableCell>
              <TableCell style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {item?.invoices?.map((invoiceItem, i) => {
                  return <PerInvoice key={i} item={invoiceItem} length={item?.invoices?.length} index={i} />
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        count={data?.total_pages}
        shape='rounded'
        style={{ margin: '20px 0' }}
        onChange={(e, value) => pageCount(value)}
      />
    </Box>
  )
}

export default ItemTable
