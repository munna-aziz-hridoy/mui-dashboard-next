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
import useOfflineProducts from 'src/@core/hooks/useOfflineProducts'
import FilterButton from 'src/@core/components/filterButton'
import useFilterOptions from 'src/@core/hooks/useFilterOptions'

const InternalProduct = () => {
  const [middleCatData, setMiddleCatData] = useState(null)

  const [page, setPage] = useState(1)

  const [affectedRows, setAffectedRows] = useState([])

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  const { isMapped, setIsMapped, isSpecialProduct, setIsSpecialProduct } = useFilterOptions()

  const { products, productCount, totalPages, mappedCount, unMappedCount, refetch, loading } = useOfflineProducts(
    access_token,
    searchQuery,
    page,
    isMapped,
    isSpecialProduct
  )

  useEffect(() => {
    setSearchQuery('')
  }, [products?.length])

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
        refetch(prev => !prev)
      })
    } else toast.error('Please select middle category')
  }

  const handleSearch = () => {
    refetch(prev => !prev)
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

        <AddOfflineProduct refetch={refetch} />
      </Card>

      <Box component='div' marginTop={4}>
        <Typography variant='body1' fontWeight={500}>
          Total Products: {productCount}
        </Typography>
        <Typography variant='body1' fontWeight={500}>
          Mapped: {mappedCount}
        </Typography>
        <Typography variant='body1' fontWeight={500}>
          Un Mapped: {unMappedCount}
        </Typography>
      </Box>

      <Card style={{ marginTop: '2rem', minHeight: '380px' }}>
        <Box component='div' display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
            Product list
          </Typography>

          <Box component='div' display='flex' alignItems='center' gap={2}>
            <FilterButton
              isMapped={isMapped}
              setIsMapped={setIsMapped}
              isSpecialProduct={isSpecialProduct}
              setIsSpecialProduct={setIsSpecialProduct}
              refetch={refetch}
            />
            <Box component='div' marginRight={3}>
              <TextField
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
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
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
                onClick={() => {
                  handleSearch()
                }}
                style={{ padding: '8.7px 18px', borderRadius: '0 5px 5px 0', marginTop: '0.5px' }}
                variant='outlined'
              >
                <HiMagnifyingGlass fontSize={20} />
              </Button>
            </Box>
          </Box>
        </Box>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableDense products={products} pageCount={setPage} totalPages={totalPages} refetch={refetch} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default InternalProduct
