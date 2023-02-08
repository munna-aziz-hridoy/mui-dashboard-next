import { Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { getOfflineProducts } from 'src/@core/apiFunction/product'
import AddOfflineProduct from 'src/@core/components/forms/addOfflineProductForm'
import TableDense from 'src/views/tables/TableDense'

const InternalProduct = () => {
  const [offlineProducts, setOfflineProducts] = useState([])

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getOfflineProducts().then(data => {
      if (data.success) {
        setOfflineProducts(data.data)
      }
      setLoading(false)
    })
  }, [refetch])

  return (
    <Fragment>
      <Card>
        <CardHeader title='Offline Product' titleTypographyProps={{ variant: 'h6' }} />

        <AddOfflineProduct refetch={setRefetch} />
      </Card>
      <Card style={{ marginTop: '5rem' }}>
        <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
          Product list
        </Typography>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableDense products={offlineProducts} />
      </Card>
    </Fragment>
  )
}

export default InternalProduct
