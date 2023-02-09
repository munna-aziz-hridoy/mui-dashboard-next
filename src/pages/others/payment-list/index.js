import { Card, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllPayment } from 'src/@core/apiFunction/invoice'
import PaymentTable from 'src/views/tables/PaymentTable'

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([])

  useEffect(() => {
    getAllPayment().then(data => {
      setPaymentList(data)
    })
  }, [])

  return (
    <Card>
      <CardHeader title='Payment list' />
      <PaymentTable payment={paymentList} />
    </Card>
  )
}

export default PaymentList
