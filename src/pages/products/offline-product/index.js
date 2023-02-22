import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { getOfflineProducts } from 'src/@core/apiFunction/product'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddOfflineProduct from 'src/@core/components/forms/addOfflineProductForm'
import TableDense from 'src/views/tables/TableDense'

import toast, { Toaster } from 'react-hot-toast'

import middleCategoryData from 'src/@core/utils/cat-data'
import { uploadOfflineProductCsv } from 'src/@core/apiFunction/sales'
import AffectedTable from 'src/views/tables/affectedTable'

const InternalProduct = () => {
  const [offlineProducts, setOfflineProducts] = useState([])
  const [middleCatData, setMiddleCatData] = useState(null)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const [affectedRows, setAffectedRows] = useState([])

  useEffect(() => {
    setLoading(true)
    getOfflineProducts(page).then(data => {
      if (data.success) {
        setOfflineProducts(data.data)
        setTotalPages(data?.total_pages)
      }
      setLoading(false)
    })
  }, [refetch])

  const handleUploadOfflineProductCsv = (csv, setCsv) => {
    if (csv && middleCatData?.middle_cat_code) {
      const offlineProductData = new FormData()
      offlineProductData.append('offline_product_file', csv)
      offlineProductData.append('middle_cat_code', middleCatData.middle_cat_code)
      offlineProductData.append('middle_cat_name', middleCatData.middle_cat_name)

      uploadOfflineProductCsv(offlineProductData).then(data => {
        if (data.success) {
          toast.success(data.message)
        } else {
          toast.error(data.message)
          setAffectedRows(data.affected_rows)
        }
        setCsv([])
        setMiddleCatData(null)
        setRefetch(prev => !prev)
      })
    } else toast.error('Please select middle category')
  }

  console.log(affectedRows)

  return (
    <Fragment>
      <Box component='div' display='flex' justifyContent='space-between' alignItems='center' marginBottom={5}>
        <FormControl>
          <InputLabel id='form-layouts-separator-select-label'>Middle Category</InputLabel>
          <Select
            style={{ width: '300px' }}
            onChange={e => {
              setMiddleCatData(e.target.value)
            }}
            label='Middle Category'
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
            required
            value={middleCatData}
          >
            {middleCategoryData.map((item, i) => (
              <MenuItem key={i} value={item}>
                {item.middle_cat_code}:{item.middle_cat_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          href='https://pims-live.s3.ap-northeast-1.amazonaws.com/sample_files/OfflineSell+HEADER.csv'
          variant='contained'
          color='primary'
        >
          Download Sample CSV
        </Button>
      </Box>

      <CsvUpload handleUploadCsv={handleUploadOfflineProductCsv} />

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Card>
        <CardHeader title='Add offline Product' titleTypographyProps={{ variant: 'h6' }} />

        <AddOfflineProduct refetch={setRefetch} />
      </Card>
      <Card style={{ marginTop: '2rem' }}>
        <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
          Product list
        </Typography>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableDense products={offlineProducts} pageCount={setPage} totalPages={totalPages} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default InternalProduct
