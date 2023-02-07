import React, { useEffect, useState } from 'react'
import {
  Grid,
  TextField,
  Button,
  Autocomplete,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
import { addInternalProduct, getOfflineProducts, getOnlineProducts, getUnitChoice } from 'src/@core/apiFunction/product'
import { toast } from 'react-hot-toast'

const AddInternalProduct = ({ closeModal, refetch }) => {
  const [offlineProducts, setOfflineProducts] = useState([])
  const [onlineProducts, setOnlineProducts] = useState([])

  const [offlineProductId, setOfflineProductId] = useState([])
  const [onlineProductId, setOnlineProductId] = useState([])

  const [units, setUnits] = useState([])

  useEffect(() => {
    getOfflineProducts().then(data => {
      if (data?.success) {
        setOfflineProducts(data?.data)
      }
    })

    getOnlineProducts().then(data => {
      if (data?.success) {
        setOnlineProducts(data?.data)
      }
    })

    getUnitChoice().then(data => {
      setUnits(data)
    })
  }, [])

  const handleAddInternalProduct = e => {
    const product_name = e.target.product_name.value
    const product_unit = e.target.product_unit.value || null

    if (offlineProductId.length === 0 || onlineProductId.length === 0) {
      return toast.error('Select product')
    }

    const productData = {
      product_name,
      product_unit,
      offlineProduct: offlineProductId,
      onlineProduct: onlineProductId
    }

    addInternalProduct(productData).then(data => {
      if (data.success) {
        e.target.product_name.value = ''
        e.target.product_unit.value = ''
        e.target.onlineProduct.value = ''
        e.target.offlineProduct.value = ''
        toast.success('Internal Product added')
        if (refetch) {
          refetch(prev => !prev)
        }
        if (closeModal) {
          closeModal(false)
        }
      } else {
        toast.error('Failed to add product')
      }
    })
  }

  return (
    <form onSubmit={handleAddInternalProduct} style={{ padding: '20px' }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField name='product_name' fullWidth label='Prodct Name' placeholder='Product Name' required />
        </Grid>

        <Grid item xs={6}>
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
          {offlineProductId.length === 0 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Select offline product
            </Typography>
          )}
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
          {onlineProductId.length === 0 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Select Online product
            </Typography>
          )}
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

export default AddInternalProduct
