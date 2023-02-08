import { Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { getOnlineProducts } from 'src/@core/apiFunction/product'
import AddOnlineProduct from 'src/@core/components/forms/addOnlineProductForm'
import TableDense from 'src/views/tables/TableDense'

const OnlineProduct = () => {
  const [onlineProducts, setOnlineProducts] = useState([])

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getOnlineProducts().then(data => {
      if (data.success) {
        setOnlineProducts(data.data)
      }
      setLoading(false)
    })
  }, [refetch])

  return (
    <Fragment>
      <Card>
        <CardHeader title='Online Product' titleTypographyProps={{ variant: 'h6' }} />

        <AddOnlineProduct refetch={setRefetch} />
      </Card>
      <Card style={{ marginTop: '5rem' }}>
        <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
          Product list
        </Typography>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableDense products={onlineProducts} />
      </Card>
    </Fragment>
  )
}

export default OnlineProduct
