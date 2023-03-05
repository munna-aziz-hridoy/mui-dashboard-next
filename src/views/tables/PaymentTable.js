import React, { Fragment } from 'react'
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography } from '@mui/material'

const StyledTableCell = ({ children }) => {
  return <TableCell style={{ background: '#100720', color: '#fff' }}>{children}</TableCell>
}

const PaymentTable = ({ payment }) => {
  return (
    <TableContainer sx={{ maxHeight: 750 }}>
      <Table size='small' stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell>Invoice Id</StyledTableCell>
            <StyledTableCell>Payment date</StyledTableCell>
            <StyledTableCell>Payment Amount</StyledTableCell>
            {payment[0]?.invoice && (
              <Fragment>
                <StyledTableCell>Invoice Total</StyledTableCell>
                <StyledTableCell>Payment Status</StyledTableCell>
                <StyledTableCell>Supplier</StyledTableCell>
              </Fragment>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {payment?.map(item => {
            const {
              id,
              amount,

              created_at
            } = item

            return (
              <TableRow key={id}>
                <TableCell component='th' scope='row'>
                  {id}
                </TableCell>
                <TableCell>{created_at?.split(' ')[0]}</TableCell>
                <TableCell>¥{amount}</TableCell>
                {item?.invoice && (
                  <Fragment>
                    <TableCell>¥{item?.invoice?.invoice_total}</TableCell>
                    <TableCell align='center'>
                      <Typography
                        bgcolor={
                          item?.invoice?.payment_status === 'Paid'
                            ? '#56CA00'
                            : item?.invoice?.payment_status === 'Partial'
                            ? '#FFB400'
                            : '#FF4C51'
                        }
                        padding={2}
                        borderRadius={3}
                        fontSize={12}
                        fontWeight={500}
                        color='#000'
                        width={60}
                        style={{ margin: '0 auto' }}
                      >
                        {item?.invoice?.payment_status}
                      </Typography>
                    </TableCell>
                    <TableCell>{item?.invoice?.supplier?.name}</TableCell>
                  </Fragment>
                )}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PaymentTable
