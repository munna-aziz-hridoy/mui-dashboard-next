import React, { useEffect, useRef, useState } from 'react'
import { Grid, TextField, Button, Autocomplete, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

import {
  addInternalProduct,
  getOfflineProducts,
  getUnitChoice,
  updateInternalProduct
} from 'src/@core/apiFunction/product'
import toast, { Toaster } from 'react-hot-toast'
import { getToken } from 'src/@core/utils/manageToken'
import { useRouter } from 'next/router'
import useOnlineProducts from 'src/@core/hooks/useOnlineProducts'
import useOfflineProducts from 'src/@core/hooks/useOfflineProducts'

function CustomOption(props) {
  console.log(props)
  if (props?.['data-option-index'] === props.length) {
    return (
      <li ref={props.refFn} style={{ fontSize: '14px', padding: '5px 10px' }}>
        <span>{props.option.product_name}</span>
        im last
      </li>
    )
  }
  return (
    <li style={{ fontSize: '14px', padding: '5px 10px' }}>
      <span>{props.option.product_name}</span>
    </li>
  )
}

const AddInternalProduct = ({
  closeModal,
  refetch,
  previousData = null,
  setPreviousProduct = null,
  update = false
}) => {
  const [offlineProductName, setOfflineProductName] = useState(previousData ? previousData?.offlineProduct : [])
  const [onlineProductName, setOnlineProductName] = useState(previousData ? previousData?.onlineProduct : [])

  const [units, setUnits] = useState([])

  const [unitValue, setUnitValue] = useState('')

  const [offlineSearchQuery, setOfflineSearchQuery] = useState('')
  const [onlineSearchQuery, setOnlineSearchQuery] = useState('')

  const { access_token } = getToken()
  const router = useRouter()

  const {
    products: onlineProducts,
    refetch: refetchOnline,
    loading: onlineLoading
  } = useOnlineProducts(access_token, onlineSearchQuery, 1)

  const {
    products: offlineProducts,
    refetch: refetchOffline,
    loading: offlineLoading
  } = useOfflineProducts(access_token, offlineSearchQuery, 1)

  useEffect(() => {
    refetchOffline(prev => !prev)
  }, [offlineSearchQuery])

  useEffect(() => {
    refetchOnline(prev => !prev)
  }, [onlineSearchQuery])

  useEffect(() => {
    getUnitChoice(access_token).then(data => {
      setUnits(data)
    })
  }, [])

  const handleLoadOfflineProduct = () => {
    getOfflineProducts(access_token, '')
  }

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
          router.push('/products/internal-product')

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
            loading={offlineLoading}
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
            renderInput={params => (
              <TextField
                onChange={e => setOfflineSearchQuery(e.target.value)}
                onClick={handleLoadOfflineProduct}
                size='small'
                {...params}
                label='Offline Products'
              />
            )}
            size='small'
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            filterSelectedOptions
            loading={onlineLoading}
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
            renderInput={params => (
              <TextField
                onChange={e => {
                  setOnlineSearchQuery(e.target.value)
                }}
                size='small'
                name='onlineProduct'
                {...params}
                label='Online Products'
              />
            )}
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
