import React, { useState } from 'react'

import { Grid, TextField, Button } from '@mui/material'
import { addOfflineProduct } from 'src/@core/apiFunction/product'
import { toast } from 'react-hot-toast'
import { getToken } from 'src/@core/utils/manageToken'

const AddOfflineProduct = ({ refetch }) => {
  const [name, setName] = useState('')

  const { access_token } = getToken()
  const handleAddOnlineProduct = e => {
    e.preventDefault()

    const product_name = e.target.product_name.value
    const product_sku = e.target.product_sku.value
    const barcode = e.target.barcode.value
    const category = e.target.category.value || null

    const productData = { product_name, product_sku, barcode, category }

    addOfflineProduct(productData, access_token).then(data => {
      const { response, responseData } = data

      if (response?.status === 200) {
        toast.success('Product added successfully')
        e.target.product_name.value = ''
        e.target.product_sku.value = ''
        e.target.barcode.value = ''
        e.target.category.value = ''
        refetch(prev => !prev)
      } else if (response?.status === 500) {
        toast.error('Internal Server error')
      } else if (response?.status !== 200 && response?.status !== 500) {
        toast.error(`${responseData?.product_name[0]} ${'|' + responseData?.barcode}`)
      } else {
        toast.error('Failed to add product')
      }
    })
  }

  return (
    <form onSubmit={handleAddOnlineProduct} style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            onChange={e => setName(e.target.value)}
            name='product_name'
            fullWidth
            label='Prodct Name'
            placeholder='Product Name'
            required
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size='small'
            type='number'
            name='product_sku'
            fullWidth
            label='Prodct Sku'
            placeholder='Product Sku'
            required
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            size='small'
            type='number'
            name='barcode'
            fullWidth
            label='EAN number'
            placeholder='Bar Code'
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField size='small' name='category' fullWidth label='Category' placeholder='Category' />
        </Grid>

        <Grid item xs={12}>
          <Button size='small' type='submit' variant='contained'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddOfflineProduct
