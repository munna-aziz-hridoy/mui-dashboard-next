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
  TextField,
  Typography
} from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { getOfflineProducts } from 'src/@core/apiFunction/product'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddOfflineProduct from 'src/@core/components/forms/addOfflineProductForm'
import TableDense from 'src/views/tables/TableDense'

import toast, { Toaster } from 'react-hot-toast'

import middleCategoryData from 'src/@core/utils/cat-data'
import { uploadOfflineProductCsv } from 'src/@core/apiFunction/csvUpload'
import AffectedTable from 'src/views/tables/affectedTable'
import { getToken } from 'src/@core/utils/manageToken'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const InternalProduct = () => {
  const [offlineProducts, setOfflineProducts] = useState([])
  const [middleCatData, setMiddleCatData] = useState(null)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProduct, setTotalProduct] = useState(0)
  const [mapped, setMapped] = useState(0)
  const [unMapped, setUnMapped] = useState(0)

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isMapped, setIsMapped] = useState(null)

  const [affectedRows, setAffectedRows] = useState([])

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getOfflineProducts(searchQuery, page, isMapped, access_token).then(data => {
      if (data.success) {
        setOfflineProducts(data.data?.results)
        setTotalPages(data?.total_pages)
        setMapped(data?.data?.total_mapped_count)
        setTotalProduct(data?.data?.total_products)
        setUnMapped(data?.data?.total_unmapped_count)
      }
      setLoading(false)
    })
  }, [refetch, page, searchQuery, isMapped])

  const handleUploadOfflineProductCsv = (csv, setCsv) => {
    if (csv && middleCatData?.middle_cat_code) {
      const offlineProductData = new FormData()
      offlineProductData.append('offline_product_file', csv)
      offlineProductData.append('middle_cat_code', middleCatData.middle_cat_code)
      offlineProductData.append('middle_cat_name', middleCatData.middle_cat_name)

      uploadOfflineProductCsv(offlineProductData, access_token).then(data => {
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

  return (
    <Fragment>
      <Box component='div' display='flex' justifyContent='space-between' alignItems='center' marginBottom={5}>
        <FormControl size='small'>
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
          size='small'
        >
          Download Sample CSV
        </Button>
      </Box>

      <CsvUpload handleUploadCsv={handleUploadOfflineProductCsv} />

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Card>
        <CardHeader
          style={{ padding: '10px 25px' }}
          title='Add offline Product'
          titleTypographyProps={{ variant: 'h6' }}
        />

        <AddOfflineProduct refetch={setRefetch} />
      </Card>

      <Box component='div' marginTop={4}>
        <Typography variant='body1' fontWeight={500}>
          Total Products: {totalProduct}
        </Typography>
        <Typography variant='body1' fontWeight={500}>
          Mapped: {mapped}
        </Typography>
        <Typography variant='body1' fontWeight={500}>
          Un Mapped: {unMapped}
        </Typography>
      </Box>

      <Card style={{ marginTop: '2rem' }}>
        <Box component='div' display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
            Product list
          </Typography>

          <Box component='div' display='flex' alignItems='center' gap={2}>
            <FormControl size='small'>
              <InputLabel id='form-layouts-separator-select-label'>Map Filter</InputLabel>
              <Select
                onChange={e => {
                  const value = e.target.value === 'all' ? null : e.target.value === 'mapped' ? true : false
                  setIsMapped(value)
                }}
                size='small'
                label='Map Filter'
              >
                <MenuItem value='all'>All</MenuItem>
                <MenuItem value='mapped'>Mapped</MenuItem>
                <MenuItem value='notmapped'>Not Mapped</MenuItem>
              </Select>
            </FormControl>
            <Box component='div' marginRight={3}>
              <TextField
                onChange={e => {
                  setSearchQuery(e.target.value)
                }}
                value={searchQuery}
                size='small'
                className='search-field'
                style={{ borderRight: 'none' }}
                placeholder='Search'
              />
              <Button
                style={{ padding: '8.7px 18px', borderRadius: '0 5px 5px 0', marginTop: '0.5px' }}
                variant='outlined'
              >
                <HiMagnifyingGlass fontSize={20} />
              </Button>
            </Box>
          </Box>
        </Box>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableDense products={offlineProducts} pageCount={setPage} totalPages={totalPages} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default InternalProduct
