import { Card, CardHeader, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getOnlineProducts } from 'src/@core/apiFunction/product'
import AddOnlineProduct from 'src/@core/components/forms/addOnlineProductForm'
import TableDense from 'src/views/tables/TableDense'

const OnlineProduct = () => {
  const [onlineProducts, setOnlineProducts] = useState([])

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    getOnlineProducts().then(data => {
      if (data.success) {
        setOnlineProducts(data.data)
      }
    })
  }, [refetch])

  return (
    <Card>
      <CardHeader title='Online Product' titleTypographyProps={{ variant: 'h6' }} />

      <AddOnlineProduct refetch={setRefetch} />

      <Divider />
      <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5}>
        Product list
      </Typography>

      <TableDense products={onlineProducts} />
    </Card>
  )
}

export default OnlineProduct
