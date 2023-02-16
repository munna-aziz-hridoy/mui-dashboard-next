import { Button, Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { getOfflineProducts } from 'src/@core/apiFunction/product'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
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
      <Button
        href='https://pims-live.s3.ap-northeast-1.amazonaws.com/sample_files/OfflineProducts+HEADER.csv'
        style={{ margin: '10px', marginLeft: 'auto', display: 'block', width: '230px' }}
        variant='contained'
        color='primary'
      >
        Download Sample CSV
      </Button>
      <CsvUpload />
      <Card>
        <CardHeader title='Add offline Product' titleTypographyProps={{ variant: 'h6' }} />

        <AddOfflineProduct refetch={setRefetch} />
      </Card>
      <Card style={{ marginTop: '2rem' }}>
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
