import { Button, Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'
import React, { useEffect, useState, Fragment } from 'react'
import { getSearchedProduct } from 'src/@core/apiFunction/product'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddInternalProduct from 'src/@core/components/forms/addInternalProductForm'
import TableCollapsible from 'src/views/tables/TableCollapsible'

const InternalProduct = () => {
  const [internalProducts, setInternalProducts] = useState([])

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    getSearchedProduct('', page).then(data => {
      setInternalProducts(data.data)
      setTotalPages(data.total_pages)
      setLoading(false)
    })
  }, [refetch, page])

  return (
    <Fragment>
      <Button
        style={{ margin: '10px', marginLeft: 'auto', display: 'block', width: '230px' }}
        variant='contained'
        color='primary'
      >
        Download Sample CSV
      </Button>
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

        <TableCollapsible products={internalProducts} pageCount={setPage} totalPages={totalPages} />
      </Card>
    </Fragment>
  )
}

export default InternalProduct
