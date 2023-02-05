import React, { useEffect, useState } from 'react'
import { getSearchedProduct } from 'src/@core/apiFunction/product'
import AddProduct from 'src/@core/components/modal/addProductModal'

// ** MUI import

import { Grid, TextField, Box, List, ListItem, CircularProgress, Typography, Button } from '@mui/material'

const listStyle = {
  background: '#c140f5',
  position: 'absolute',
  width: '98%',
  padding: '1rem',
  zIndex: '5'
}

const FormSelectProduct = ({ selectedProduct, setSelectedProduct, clearForm }) => {
  const [productName, setProductName] = useState('')

  const [searchedProduct, setSearchedProduct] = useState([])

  const [productLoading, setProductLoading] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openProductList, setOpenProductList] = useState(false)

  useEffect(() => {
    setSelectedProduct([])
  }, [clearForm])

  const handleSearchProduct = e => {
    const searchText = e.target.value
    setProductName(searchText)
    if (searchText !== '') {
      setProductLoading(true)
      setOpenProductList(true)
      getSearchedProduct(searchText).then(data => {
        setSearchedProduct(data)
        setProductLoading(false)
      })
    } else {
      setOpenProductList(false)
    }
  }

  const handleSelectProduct = item => {
    setSelectedProduct(prev => {
      const selectedItem = {
        product: item.id,
        product_unit: item.product_unit,
        product_name: item.product_name
      }
      const exists = prev.find(prevPro => prevPro.product === selectedItem.product)

      if (!exists) {
        return [...prev, selectedItem]
      } else {
        return prev
      }
    })
    setOpenProductList(false)
    setProductName('')
  }

  return (
    <Grid item xs={12} marginBottom={8} style={{ position: 'relative' }}>
      <TextField
        onClick={() => {
          setOpenProductList(prev => !prev)
          getSearchedProduct('').then(data => setSearchedProduct(data))
        }}
        onChange={handleSearchProduct}
        fullWidth
        label='Search Products'
        placeholder='Search Products'
        value={productName}
      />

      {selectedProduct?.length === 0 && (
        <Typography variant='body2' color='error' fontSize={12}>
          Add product
        </Typography>
      )}

      <Box style={{ ...listStyle, display: openProductList ? 'block' : 'none' }} borderRadius={1} boxShadow={5}>
        <List>
          {productLoading ? (
            <ListItem>
              <CircularProgress color='inherit' style={{ margin: '0 auto' }} />
            </ListItem>
          ) : searchedProduct?.length !== 0 ? (
            searchedProduct?.map(item => (
              <ListItem
                key={item?.id}
                onClick={() => handleSelectProduct(item)}
                color='#fff'
                style={{ cursor: 'pointer' }}
              >
                <Typography color='#fff' variant='body1'>
                  {item.product_name}
                </Typography>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Button
                onClick={() => setOpenProductModal(true)}
                fullWidth
                variant='outlined'
                style={{ borderColor: '#fff', color: '#fff' }}
              >
                Add This product
              </Button>
            </ListItem>
          )}
        </List>
      </Box>

      <AddProduct open={openProductModal} setOpen={setOpenProductModal} />
    </Grid>
  )
}

export default FormSelectProduct
