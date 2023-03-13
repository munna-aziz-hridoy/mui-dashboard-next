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

import { uploadOnlineProductCsv } from 'src/@core/apiFunction/csvUpload'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddOnlineProduct from 'src/@core/components/forms/addOnlineProductForm'
import TableDense from 'src/views/tables/TableDense'
import AffectedTable from 'src/views/tables/affectedTable'
import { getToken } from 'src/@core/utils/manageToken'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import useOnlineProducts from 'src/@core/hooks/useOnlineProducts'
import FilterButton from 'src/@core/components/filterButton'
import useFilterOptions from 'src/@core/hooks/useFilterOptions'
import ViewChangeCountModal from 'src/@core/components/modal/viewChangeCount'

const OnlineProduct = () => {
  const [affectedRows, setAffectedRows] = useState([])

  const [page, setPage] = useState(1)

  const [totalCreated, setTotalCreated] = useState(0)
  const [totalUpdated, setTotalUpdated] = useState(0)

  const [searchQuery, setSearchQuery] = useState('')

  const [uploadLoading, setUploadLoading] = useState(false)
  const [openSuccessModal, setOpenSuccessModal] = useState(false)

  const { access_token } = getToken()

  const { isMapped, setIsMapped, isInStock, setIsInStock, isPublished, setIsPublished, isVisible, setIsVisible } =
    useFilterOptions()

  const { products, productCount, totalPages, mappedCount, unMappedCount, refetch, loading } = useOnlineProducts(
    access_token,
    searchQuery,
    page,
    isMapped,
    isPublished,
    isInStock,
    isVisible
  )

  useEffect(() => {
    setSearchQuery('')
  }, [products?.length])

  const handleUploadOnlineProductCsv = (csv, setCsv) => {
    if (csv) {
      setUploadLoading(true)
      const onlineProductData = new FormData()
      onlineProductData.append('online_product_file', csv)
      uploadOnlineProductCsv(onlineProductData, access_token).then(data => {
        const { response, responseData } = data
        setUploadLoading(false)
        if (responseData?.affected_rows) {
          setAffectedRows(responseData?.affected_rows)
        }

        if (response.status === 200) {
          setOpenSuccessModal(true)
          setTotalCreated(responseData?.total_created)
          setTotalUpdated(responseData?.total_updated)
        } else if (response.status === 500) {
          toast.error('Internal Server error')
        } else if (response.status !== 200 && response.status !== 500) {
          Object.keys(responseData).forEach(key => {
            if (key !== 'affected_rows') {
              toast.error(responseData[key])
            }
          })
        }
        setCsv([])

        refetch(prev => !prev)
        setUploadLoading(false)
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

      <ViewChangeCountModal
        open={openSuccessModal}
        setOpen={setOpenSuccessModal}
        totalCreated={totalCreated}
        totalUpdate={totalUpdated}
      />

      {uploadLoading ? (
        <Box height={180} component='div' display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='primary' />
        </Box>
      ) : (
        <CsvUpload handleUploadCsv={handleUploadOnlineProductCsv} />
      )}

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Card>
        <CardHeader title='Add online product' titleTypographyProps={{ variant: 'h6' }} />

        <AddOnlineProduct refetch={refetch} />
      </Card>

      <Box component='div' marginTop={4}>
        <Typography variant='body1' fontWeight={500}>
          Products found: {productCount}
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
              isInStock={isInStock}
              isMapped={isMapped}
              isPublished={isPublished}
              isVisible={isVisible}
              setInStock={setIsInStock}
              setIsMapped={setIsMapped}
              setIsVisible={setIsVisible}
              setPublished={setIsPublished}
              refetch={refetch}
            />
            <Box component='div' marginRight={3}>
              <TextField
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    refetch(prev => !prev)
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
                onClick={() => refetch(prev => !prev)}
                style={{ padding: '8.7px 18px', borderRadius: '0 5px 5px 0', marginTop: '0.5px' }}
                variant='outlined'
              >
                <HiMagnifyingGlass fontSize={20} />
              </Button>
            </Box>
          </Box>
        </Box>

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableDense products={products} totalPages={totalPages} pageCount={setPage} refetch={refetch} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default OnlineProduct
