import React, { useEffect, useState, Fragment } from 'react'
import { Box, Button, Card, CardHeader, CircularProgress, TextField, Typography } from '@mui/material'

import { HiMagnifyingGlass } from 'react-icons/hi2'

import toast, { Toaster } from 'react-hot-toast'
import { uploadInternalProductCsv } from 'src/@core/apiFunction/csvUpload'
import { getSearchedProduct } from 'src/@core/apiFunction/product'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddInternalProduct from 'src/@core/components/forms/addInternalProductForm'
import { getToken } from 'src/@core/utils/manageToken'
import AffectedTable from 'src/views/tables/affectedTable'
import TableCollapsible from 'src/views/tables/TableCollapsible'

const InternalProduct = () => {
  const [internalProducts, setInternalProducts] = useState([])
  const [affectedRows, setAffectedRows] = useState([])

  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getSearchedProduct(searchQuery || '', page, access_token).then(data => {
      setInternalProducts(data.data)
      setTotalPages(data.total_pages)
      setLoading(false)
    })
  }, [refetch, page, searchQuery])

  const handleUploadInternalProductCsv = (csv, setCsv) => {
    if (csv) {
      const internalProductData = new FormData()
      internalProductData.append('internal_product_file', csv)
      uploadInternalProductCsv(internalProductData, access_token).then(data => {
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

  console.log('internal product list page')

  return (
    <Fragment>
      <Button
        style={{ margin: '10px', marginLeft: 'auto', display: 'block', width: '230px' }}
        variant='contained'
        color='primary'
        size='small'
      >
        Download Sample CSV
      </Button>
      <CsvUpload handleUploadCsv={handleUploadInternalProductCsv} />

      {affectedRows.length > 0 && <AffectedTable affectedRows={affectedRows} setAffectedRows={setAffectedRows} />}

      <Card>
        <CardHeader
          style={{ padding: '10px 25px' }}
          title='Add internal Product'
          titleTypographyProps={{ variant: 'h6' }}
        />

        <AddInternalProduct refetch={setRefetch} />
      </Card>

      <Card style={{ marginTop: '2rem' }}>
        <Box component='div' display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
            Product list
          </Typography>

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

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableCollapsible products={internalProducts} pageCount={setPage} totalPages={totalPages} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default InternalProduct
