import { Card, CardHeader, CircularProgress } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import AddSuplierForm from 'src/@core/components/forms/addSuplierForm'
import TableSupplier from 'src/views/tables/TableSupplier'
import { getSearchedSuplier } from 'src/@core/apiFunction/suplier'
import { getToken } from 'src/@core/utils/manageToken'

const Supplier = () => {
  const [supplier, setSupplier] = useState([])
  const [refetch, setRefetch] = useState(false)
  const [loading, setLoading] = useState(false)

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)
    getSearchedSuplier('', access_token).then(data => {
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

        <TableSupplier supplier={supplier} />
      </Card>
    </Fragment>
  )
}

export default Supplier
