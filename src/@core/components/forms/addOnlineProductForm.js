import React, { useState } from 'react'

import { Grid, TextField, Button, Typography } from '@mui/material'
import { addOnlineProduct } from 'src/@core/apiFunction/product'
import { toast } from 'react-hot-toast'
import { getToken } from 'src/@core/utils/manageToken'

const AddOnlineProduct = ({ refetch }) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')

  const { access_token } = getToken()

  const handleAddOnlineProduct = e => {
    e.preventDefault()

    const product_name = e.target.product_name.value
    const product_ID = e.target.product_id.value
    const regular_price = e.target.regular_price.value
    const sale_price = e.target.sale_price.value
    const category = e.target.category.value || null
    const sku = e.target.sku.value || ''

    const productData = {
      product_name,
      product_ID,
      regular_price,
      sale_price,
      category,
      weight: null,
      image_url: null,
      sku
    }

    addOnlineProduct(productData, access_token).then(data => {
      if (data.success) {
        toast.success('Product added successfully')
        e.target.product_name.value = ''
        e.target.product_id.value = ''
        e.target.regular_price.value = ''
        e.target.sale_price.value = ''
        e.target.category.value = ''
        e.target.sku.value = ''
        refetch(prev => !prev)
      } else {
        toast.error('Failed to add product')
      }
    })
  }

  return (
    <form onSubmit={handleAddOnlineProduct} style={{ padding: '20px' }}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <TextField
            onChange={e => setName(e.target.value)}
            name='product_name'
            fullWidth
            label='Prodct Name'
            placeholder='Product Name'
            required
          />
          {/* {name.length > 20 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Name should be under 20 character
            </Typography>
          )} */}
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={e => setId(e.target.value)}
            type='number'
            name='product_id'
            fullWidth
            label='Prodct Id'
            placeholder='Product Id'
            required
          />

          {id.length > 3 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Id must be in 3 digit
            </Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            type='number'
            name='regular_price'
            fullWidth
            label='Regular Price'
            placeholder='Regular Price'
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField type='number' name='sale_price' fullWidth label='Sale Price' placeholder='Sale Price' required />
        </Grid>
        <Grid item xs={6}>
          <TextField name='category' fullWidth label='Category' placeholder='Category' />
        </Grid>

        <Grid item xs={6}>
          <TextField type='number' name='sku' fullWidth label='Sku' placeholder='Sku' />
        </Grid>

        <Grid item xs={12}>
          <Button type='submit' variant='contained' size='large'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddOnlineProduct
