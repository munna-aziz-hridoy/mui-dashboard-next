import React, { useEffect, useState } from 'react'

// ** MUI imports
import {
  Box,
  Modal,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  CardHeader,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'

// ** Icon imports

import { Phone, AccountOutline, EmailOutline, MessageOutline } from 'mdi-material-ui'

import { BiMoney } from 'react-icons/bi'
import { getUnitChoice } from 'src/@core/apiFunction/product'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const EditProduct = ({ open, setOpen, productData, setProducts }) => {
  const { product, product_name, product_unit } = productData
  const [units, setUnits] = useState([])

  useEffect(() => {
    getUnitChoice().then(data => setUnits(data))
  }, [])

  const handleSetProductProperty = (property, e, isNumber) => {
    setProducts(prev => {
      const exists = prev.find(item => item.product === product)
      const restItem = prev.filter(item => item.product !== product)
      exists[property] = isNumber ? parseFloat(e.target.value) : e.target.value
      return [...restItem, exists]
    })
  }

  return (
    <Modal id={product} open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <CardHeader title={product_name} titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    onChange={e => handleSetProductProperty('quantity', e, true)}
                    fullWidth
                    type='number'
                    label='Quantity'
                    placeholder='Quantity'
                    value={productData?.quantity}
                  />
                </Grid>
                {/* <Grid item xs={4}>
                  <TextField
                    onChange={e => handleSetProductProperty('discount', e)}
                    fullWidth
                    type='number'
                    label='Discount'
                    placeholder='Discount'
                    value={product?.discount}
                  />
                </Grid> */}
                <Grid item xs={4}>
                  <TextField
                    onChange={e => handleSetProductProperty('unit_cost', e)}
                    fullWidth
                    type='number'
                    label='Unit Cost'
                    placeholder='Unit Cost'
                    value={productData?.unit_cost}
                  />
                </Grid>
                {/* <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Tax</InputLabel>
                    <Select
                      onChange={e => {
                        console.log(e)
                        const tax = e.target.value
                        setProducts(prev => {
                          const exists = prev.find(item => item.id === id)
                          const restItem = prev.filter(item => item.id !== id)
                          exists.tax = tax
                          return [...restItem, exists]
                        })
                      }}
                      label='Tax'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                    >
                      {['no tax', 'vat@10', 'vat@15', 'vat@20'].map((item, i) => (
                        <MenuItem key={i} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Product Unit</InputLabel>
                    <Select
                      onChange={e => handleSetProductProperty('product_unit', e, false)}
                      label='Product Unit'
                      defaultValue={product_unit}
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
                  <TextField
                    onChange={e => handleSetProductProperty('EN_number', e, false)}
                    fullWidth
                    multiline
                    minRows={1}
                    label='EN Number'
                    placeholder='EN'
                    sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={() => setOpen(false)} type='submit' variant='contained' size='large'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default EditProduct
