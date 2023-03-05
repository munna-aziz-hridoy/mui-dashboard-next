import React, { useEffect, useState } from 'react'
import { Grid, TextField, Button, Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import {
  addInternalProduct,
  getOfflineProducts,
  getOnlineProducts,
  getUnitChoice,
  updateInternalProduct
} from 'src/@core/apiFunction/product'
import toast, { Toaster } from 'react-hot-toast'
import { getToken } from 'src/@core/utils/manageToken'
import { useRouter } from 'next/router'

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001
  }
]

const AddInternalProduct = ({
  closeModal,
  refetch,
  previousData = null,
  setPreviousProduct = null,
  update = false
}) => {
  const [offlineProducts, setOfflineProducts] = useState([])
  const [onlineProducts, setOnlineProducts] = useState([])

  const [offlineProductName, setOfflineProductName] = useState(previousData ? previousData?.offlineProduct : [])
  const [onlineProductName, setOnlineProductName] = useState(previousData ? previousData?.onlineProduct : [])

  const [units, setUnits] = useState([])

  const [unitValue, setUnitValue] = useState('')

  const { access_token } = getToken()
  const router = useRouter()

  useEffect(() => {
    getOfflineProducts('', 1, access_token).then(data => {
      if (data?.success) {
        setOfflineProducts(data?.data)
      }
    })

    getOnlineProducts('', 1, access_token).then(data => {
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

    if (offlineProductName.length === 0 || onlineProductName.length === 0) {
      return toast.error('Select product')
    }

    const productData = {
      product_name,
      product_unit,
      offlineProduct: offlineProductName?.map(item => parseFloat(item?.barcode)),
      onlineProduct: onlineProductName?.map(item => parseFloat(item?.product_ID))
    }

    if (update) {
      updateInternalProduct(productData, access_token, previousData?.id).then(data => {
        if (data.success) {
          setPreviousProduct(data?.data)
          toast.success('Internal Product Updated')
          e.target.product_name.value = ''
          e.target.product_unit.value = ''
          setOfflineProductName([])
          setOnlineProductName([])
          // router.push('/products/internal-product')

          if (refetch) {
            refetch(prev => !prev)
          }
          if (closeModal) {
            closeModal(false)
          }
        } else {
          toast.error('Failed to Update product')
        }
      })
    } else {
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
            defaultValue={previousData?.product_name}
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
              defaultValue={previousData?.product_unit}
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
            id='tags-outlined'
            onChange={(e, value) => {
              const productName = value.map(item => {
                return { product_name: item.product_name, barcode: item.barcode }
              })

              setOfflineProductName(productName)
            }}
            filterSelectedOptions
            defaultValue={offlineProductName}
            multiple
            options={offlineProducts}
            getOptionLabel={option => option.product_name}
            renderInput={params => <TextField size='small' {...params} label='Offline Products' />}
            size='small'
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            filterSelectedOptions
            onChange={(e, value) => {
              const productName = value.map(item => {
                return { product_name: item.product_name, product_ID: item.product_ID }
              })
              setOnlineProductName(productName)
            }}
            multiple
            defaultValue={onlineProductName}
            options={onlineProducts}
            getOptionLabel={option => option.product_name}
            renderInput={params => <TextField size='small' name='onlineProduct' {...params} label='Online Products' />}
            size='small'
          />
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
            {update ? 'Update' : 'Add Internal product'}
          </Button>
        </Grid>
      </Grid>
      <Toaster />
    </form>
  )
}

export default AddInternalProduct
