import React, { Fragment, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel
} from '@mui/material'

import toast, { Toaster } from 'react-hot-toast'

import { getOnlineProducts } from 'src/@core/apiFunction/product'
import { uploadOnlineProductCsv } from 'src/@core/apiFunction/csvUpload'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddOnlineProduct from 'src/@core/components/forms/addOnlineProductForm'
import TableDense from 'src/views/tables/TableDense'
import AffectedTable from 'src/views/tables/affectedTable'
import { getToken } from 'src/@core/utils/manageToken'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const OnlineProduct = () => {
  const [onlineProducts, setOnlineProducts] = useState([])
  const [affectedRows, setAffectedRows] = useState([])

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProduct, setTotalProduct] = useState(0)
  const [mapped, setMapped] = useState(0)
  const [unMapped, setUnMapped] = useState(0)

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isMapped, setIsMapped] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getOnlineProducts(searchQuery, page, isMapped, access_token).then(data => {
      if (data.success) {
        setOnlineProducts(data.data)
        setTotalPages(data?.total_pages)
        setMapped(data?.data?.total_mapped_count)
        setTotalProduct(data?.data?.total_products)
        setUnMapped(data?.data?.total_unmapped_count)
      }
      setLoading(false)
    })
  }, [refetch, page, searchQuery, isMapped])

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
        size='small'
      >
        Download Sample CSV
      </Button>
      <CsvUpload handleUploadCsv={handleUploadOnlineProductCsv} />

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Card>
        <CardHeader title='Add online product' titleTypographyProps={{ variant: 'h6' }} />

        <AddOnlineProduct refetch={setRefetch} />
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

        <TableDense products={onlineProducts} totalPages={totalPages} pageCount={setPage} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default OnlineProduct
