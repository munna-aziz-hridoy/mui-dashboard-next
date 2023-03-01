import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { addInternalProduct, getOfflineProducts, getOnlineProducts, getUnitChoice } from 'src/@core/apiFunction/product'
import { toast } from 'react-hot-toast'
import { getToken } from 'src/@core/utils/manageToken'

const AddInternalProduct = ({ closeModal, refetch }) => {
  const [offlineProducts, setOfflineProducts] = useState([])
  const [onlineProducts, setOnlineProducts] = useState([])

  const [offlineProductId, setOfflineProductId] = useState([])
  const [onlineProductId, setOnlineProductId] = useState([])

  const [offlineProductName, setOfflineProductName] = useState([])
  const [onlineProductName, setOnlineProductName] = useState([])

  const [units, setUnits] = useState([])

  const [unitValue, setUnitValue] = useState('')

  const { access_token } = getToken()

  useEffect(() => {
    getOfflineProducts('', access_token).then(data => {
      if (data?.success) {
        setOfflineProducts(data?.data)
      }
    })

    getOnlineProducts('', access_token).then(data => {
      if (data?.success) {
        setOnlineProducts(data?.data)
      }
    })

    getUnitChoice(access_token).then(data => {
      setUnits(data)
    })
  }, [])

  const handleAddInternalProduct = e => {
    e.stopPropagation()
    e.preventDefault()
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

    addInternalProduct(productData, access_token).then(data => {
      if (data.success) {
        toast.success('Internal Product added')
        e.target.product_name.value = ''
        e.target.product_unit.value = ''
        setOfflineProductName([])
        setOnlineProductName([])
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
        <Grid item xs={6}>
          <TextField
            name='product_name'
            fullWidth
            label='Prodct Name'
            placeholder='Product Name'
            required
            size='small'
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl size='small' fullWidth>
            <InputLabel id='form-layouts-separator-select-label'>Product Unit</InputLabel>
            <Select
              name='product_unit'
              label='Product Unit'
              id='form-layouts-separator-select'
              labelId='form-layouts-separator-select-label'
              required
              value={unitValue}
              onChange={e => setUnitValue(e.target.value)}
              size='small'
            >
              {units?.map((item, i) => (
                <MenuItem key={i} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            filterSelectedOptions
            onChange={(e, value) => {
              const productId = value.map(item => parseFloat(item.barcode))
              const productName = value.map(item => {
                return { product_name: item.product_name, barcode: item.barcode }
              })

              setOfflineProductName(productName)
              setOfflineProductId(productId)
            }}
            value={offlineProductName}
            multiple
            options={offlineProducts}
            getOptionLabel={option => option.product_name}
            renderInput={params => (
              <TextField size='small' name='offlineProduct' {...params} label='Offline Products' />
            )}
            size='small'
          />
          {/* {offlineProductId.length === 0 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Select offline product
            </Typography>
          )} */}
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            filterSelectedOptions
            onChange={(e, value) => {
              const productId = value.map(item => parseFloat(item.product_ID))
              const productName = value.map(item => {
                return { product_name: item.product_name, product_ID: item.product_ID }
              })
              setOnlineProductName(productName)
              setOnlineProductId(productId)
            }}
            multiple
            value={onlineProductName}
            options={onlineProducts}
            getOptionLabel={option => option.product_name}
            renderInput={params => <TextField size='small' name='onlineProduct' {...params} label='Online Products' />}
            size='small'
          />
          {/* {onlineProductId.length === 0 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Select Online product
            </Typography>
          )} */}
        </Grid>

        <Grid item xs={12}>
          <Button
            onClick={e => {
              e.stopPropagation()
            }}
            type='submit'
            variant='contained'
            size='small'
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddInternalProduct
