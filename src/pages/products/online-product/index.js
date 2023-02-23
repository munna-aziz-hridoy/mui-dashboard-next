import React, { Fragment, useEffect, useState } from 'react'
import { Button, Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'

import toast, { Toaster } from 'react-hot-toast'

import { getOnlineProducts } from 'src/@core/apiFunction/product'
import { uploadOnlineProductCsv } from 'src/@core/apiFunction/csvUpload'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddOnlineProduct from 'src/@core/components/forms/addOnlineProductForm'
import TableDense from 'src/views/tables/TableDense'
import AffectedTable from 'src/views/tables/affectedTable'
import { getToken } from 'src/@core/utils/manageToken'

const OnlineProduct = () => {
  const [onlineProducts, setOnlineProducts] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const [affectedRows, setAffectedRows] = useState([])

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getOnlineProducts(page, access_token).then(data => {
      if (data.success) {
        setOnlineProducts(data.data)
        setTotalPages(data?.total_pages)
      }
      setLoading(false)
    })
  }, [refetch, page])

  const handleUploadOnlineProductCsv = (csv, setCsv) => {
    if (csv) {
      const onlineProductData = new FormData()
      onlineProductData.append('online_product_file', csv)
      uploadOnlineProductCsv(onlineProductData, access_token).then(data => {
        if (data.success) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
          setAffectedRows(data.affected_rows)
        }
        setCsv([])

        setRefetch(prev => !prev)
      })
    }
  }

  return (
    <Fragment>
      <Button
        href='https://pims-live.s3.ap-northeast-1.amazonaws.com/sample_files/OnlineProducts+HEADER.csv'
        style={{ margin: '10px', marginLeft: 'auto', display: 'block', width: '230px' }}
        variant='contained'
        color='primary'
      >
        Download Sample CSV
      </Button>
      <CsvUpload handleUploadCsv={handleUploadOnlineProductCsv} />

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Card>
        <CardHeader title='Add online product' titleTypographyProps={{ variant: 'h6' }} />

        <AddOnlineProduct refetch={setRefetch} />
      </Card>
      <Card style={{ marginTop: '2rem' }}>
        <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
          Product list
        </Typography>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableDense products={onlineProducts} totalPages={totalPages} pageCount={setPage} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default OnlineProduct
