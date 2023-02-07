import { Card, CardHeader, Divider, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSearchedProduct } from 'src/@core/apiFunction/product'
import AddInternalProduct from 'src/@core/components/forms/addInternalProductForm'
import TableCollapsible from 'src/views/tables/TableCollapsible'

const InternalProduct = () => {
  const [internalProducts, setInternalProducts] = useState([])

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    getSearchedProduct('').then(data => setInternalProducts(data))
  }, [refetch])

  return (
    <Card>
      <CardHeader title='Internal Product' titleTypographyProps={{ variant: 'h6' }} />

      <AddInternalProduct refetch={setRefetch} />

      <Divider />
      <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5}>
        Product list
      </Typography>

      <TableCollapsible products={internalProducts} />
    </Card>
  )
}

export default InternalProduct
