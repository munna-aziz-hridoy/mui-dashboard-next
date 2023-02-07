import React from 'react'

import { Grid, TextField, Button } from '@mui/material'
import { addOfflineProduct, addOnlineProduct } from 'src/@core/apiFunction/product'
import { toast } from 'react-hot-toast'

const AddOfflineProduct = ({ refetch }) => {
  const handleAddOnlineProduct = e => {
    e.preventDefault()

    const product_name = e.target.product_name.value
    const product_sku = e.target.product_sku.value
    const ean = e.target.ean.value
    const category = e.target.category.value || null

    const productData = { product_name, product_sku, ean, category }

    addOfflineProduct(productData).then(data => {
      if (data.success) {
        toast.success('Product added successfully')
        e.target.product_name.value = ''
        e.target.product_sku.value = ''
        e.target.ean.value = ''
        e.target.category.value = ''
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
          <TextField name='product_name' fullWidth label='Prodct Name' placeholder='Product Name' required />
        </Grid>
        <Grid item xs={6}>
          <TextField type='number' name='product_sku' fullWidth label='Prodct Sku' placeholder='Product Sku' required />
        </Grid>

        <Grid item xs={6}>
          <TextField type='number' name='ean' fullWidth label='EAN number' placeholder='EAN number' required />
        </Grid>
        <Grid item xs={6}>
          <TextField name='category' fullWidth label='Category' placeholder='Category' />
        </Grid>

        {/* <Grid item xs={6}>
          <Autocomplete
            onChange={(e, value) => {
              const productId = value.map(item => parseFloat(item.product_sku))
              setOfflineProductId(productId)
            }}
            multiple
            options={offlineProducts}
            getOptionLabel={option => option.product_name}
            renderInput={params => <TextField name='offlineProduct' {...params} label='Offline Products' />}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            onChange={(e, value) => {
              const productId = value.map(item => parseFloat(item.product_ID))
              setOnlineProductId(productId)
            }}
            multiple
            options={onlineProducts}
            getOptionLabel={option => option.product_name}
            renderInput={params => <TextField name='onlineProduct' {...params} label='Online Products' />}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id='form-layouts-separator-select-label'>Product Unit</InputLabel>
            <Select
              name='product_unit'
              label='Product Unit'
              id='form-layouts-separator-select'
              labelId='form-layouts-separator-select-label'
            >
              {units?.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid> */}

        <Grid item xs={12}>
          <Button type='submit' variant='contained' size='large'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddOfflineProduct
