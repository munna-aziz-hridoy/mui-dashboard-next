import { Card, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllPayment } from 'src/@core/apiFunction/invoice'
import { getToken } from 'src/@core/utils/manageToken'
import PaymentTable from 'src/views/tables/PaymentTable'

const PaymentList = () => {
  const [paymentList, setPaymentList] = useState([])

  const { access_token } = getToken()

  useEffect(() => {
    getAllPayment(access_token).then(data => {
      setPaymentList(data)
    })
  }, [])

  console.log(paymentList)

  return (
    <Card>
      <CardHeader title='Payment list' />
      <PaymentTable payment={paymentList} />
    </Card>
  )
}

export default PaymentList
