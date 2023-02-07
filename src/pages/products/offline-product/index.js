import { Card, CardHeader, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getOfflineProducts } from 'src/@core/apiFunction/product'
import AddOfflineProduct from 'src/@core/components/forms/addOfflineProductForm'
import TableDense from 'src/views/tables/TableDense'

const InternalProduct = () => {
  const [offlineProducts, setOfflineProducts] = useState([])

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    getOfflineProducts().then(data => {
      if (data.success) {
        setOfflineProducts(data.data)
      }
    })
  }, [refetch])

  return (
    <Card>
      <CardHeader title='Offline Product' titleTypographyProps={{ variant: 'h6' }} />

      <AddOfflineProduct refetch={setRefetch} />

      <Divider />
      <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5}>
        Product list
      </Typography>

      <TableDense products={offlineProducts} />
    </Card>
  )
}

export default InternalProduct
