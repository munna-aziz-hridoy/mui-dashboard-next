import { Box, Button, Card, CardHeader, CircularProgress, TextField, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import AddSuplierForm from 'src/@core/components/forms/addSuplierForm'
import TableSupplier from 'src/views/tables/TableSupplier'
import { getSearchedSuplier } from 'src/@core/apiFunction/suplier'
import { getToken } from 'src/@core/utils/manageToken'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const Supplier = () => {
  const [supplier, setSupplier] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getSearchedSuplier(searchQuery, access_token).then(data => {
      setSupplier(data)
      setLoading(false)
    })
  }, [refetch])

  return (
    <Fragment>
      <Card style={{ padding: '20px' }}>
        <CardHeader title='Supplier' titleTypographyProps={{ variant: 'h6' }} style={{ marginBottom: '20px' }} />

        <AddSuplierForm refetch={setRefetch} />
      </Card>
      <Card style={{ marginTop: '5rem' }}>
        {loading && <CircularProgress color='inherit' style={{ margin: '0 auto', display: 'inherit' }} />}

        <Box component='div' display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1' fontSize={18} fontWeight={600} marginLeft={4} marginBottom={5} marginTop={5}>
            Supplier list
          </Typography>

          <Box component='div' marginRight={3}>
            <TextField
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  setRefetch(prev => !prev)
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
              onClick={() => setRefetch(prev => !prev)}
              style={{ padding: '8.7px 18px', borderRadius: '0 5px 5px 0', marginTop: '0.5px' }}
              variant='outlined'
            >
              <HiMagnifyingGlass fontSize={20} />
            </Button>
          </Box>
        </Box>

        <TableSupplier supplier={supplier} />
      </Card>
    </Fragment>
  )
}

export default Supplier
