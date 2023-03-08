import React, { useEffect, useState, Fragment } from 'react'
import { Box, Button, Card, CardHeader, CircularProgress, TextField, Typography } from '@mui/material'

import { HiMagnifyingGlass } from 'react-icons/hi2'

import toast, { Toaster } from 'react-hot-toast'
import { uploadInternalProductCsv } from 'src/@core/apiFunction/csvUpload'
import { getInternalProducts } from 'src/@core/apiFunction/product'
import CsvUpload from 'src/@core/components/file-upload/csvUpload'
import AddInternalProduct from 'src/@core/components/forms/addInternalProductForm'
import { getToken } from 'src/@core/utils/manageToken'
import AffectedTable from 'src/views/tables/affectedTable'
import TableCollapsible from 'src/views/tables/TableCollapsible'
import useInternalProducts from 'src/@core/hooks/useInternalProducts'

const InternalProduct = () => {
  const [affectedRows, setAffectedRows] = useState([])

  const [page, setPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  const { productCount, products, totalPages, loading, refetch } = useInternalProducts(access_token, searchQuery, page)

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

        refetch(prev => !prev)
      })
    }
  }

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

        <AddInternalProduct refetch={refetch} />
      </Card>

      <Typography variant='body1' fontSize={14} fontWeight={600} marginBottom={5} marginTop={5}>
        Total Products: {productCount}
      </Typography>

      <Card style={{ marginTop: '2rem' }}>
        <Box component='div' display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
            Product list
          </Typography>

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

        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <TableCollapsible products={products} pageCount={setPage} totalPages={totalPages} />
      </Card>
      <Toaster />
    </Fragment>
  )
}

export default InternalProduct
