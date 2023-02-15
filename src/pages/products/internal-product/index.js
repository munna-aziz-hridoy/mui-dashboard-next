import { Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'
import React, { useEffect, useState, Fragment } from 'react'
import { getSearchedProduct } from 'src/@core/apiFunction/product'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddInternalProduct from 'src/@core/components/forms/addInternalProductForm'
import TableCollapsible from 'src/views/tables/TableCollapsible'

const InternalProduct = () => {
  const [internalProducts, setInternalProducts] = useState([])

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSearchedProduct('').then(data => {
      setInternalProducts(data)
      setLoading(false)
    })
  }, [refetch])

  return (
    <Fragment>
      <CsvUpload />
      <Card>
        <CardHeader title='Add internal Product' titleTypographyProps={{ variant: 'h6' }} />

        <AddInternalProduct refetch={setRefetch} />
      </Card>

      <Card style={{ marginTop: '2rem' }}>
        <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
          Product list
        </Typography>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableCollapsible products={internalProducts} />
      </Card>
    </Fragment>
  )
}

export default InternalProduct
