import React, { Fragment, useEffect, useRef, useState } from 'react'
import { getSearchedProduct } from 'src/@core/apiFunction/product'
import AddProduct from 'src/@core/components/modal/addProductModal'

// ** MUI import

import { Grid, TextField, Box, List, ListItem, CircularProgress, Typography, Button } from '@mui/material'
import { getToken } from 'src/@core/utils/manageToken'

const listStyle = {
  // background: '#c140f5',
  position: 'absolute',
  width: '98%',
  padding: '1rem',
  zIndex: '5'
}

const FormSelectProduct = ({ setSelectedProduct, clearForm }) => {
  const [productName, setProductName] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const [searchedProduct, setSearchedProduct] = useState([])

  const [productLoading, setProductLoading] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openProductList, setOpenProductList] = useState(false)

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const bottomBoundaryRef = useRef()

  const { access_token } = getToken()

  useEffect(() => {
    setSelectedProduct([])
  }, [clearForm])

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         setPage(prev => {
  //           if (totalPage > 1) {
  //             return prev + 1
  //           } else {
  //             return prev
  //           }
  //         })
  //       }
  //     },
  //     {
  //       root: null,
  //       rootMargin: '0px',
  //       threshold: 1.0
  //     }
  //   )

  //   if (bottomBoundaryRef.current) {
  //     observer.observe(bottomBoundaryRef.current)
  //   }

  //   return () => {
  //     if (bottomBoundaryRef.current) {
  //       observer.unobserve(bottomBoundaryRef.current)
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   setProductLoading(true)
  //   setOpenProductList(true)
  //   getSearchedProduct(searchValue, page, access_token).then(data => {
  //     setSearchedProduct(data.data)
  //     setTotalPage(data.total_pages)
  //     setProductLoading(false)
  //   })
  // }, [searchValue, page])

  const handleSearchProduct = e => {
    const searchText = e.target.value

    setProductName(searchText)
    if (searchText !== '') {
      setProductLoading(true)
      setOpenProductList(true)
      getSearchedProduct(searchText, 0, access_token).then(data => {
        setSearchedProduct(data.data)
        setTotalPage(data.total_pages)
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
        product_name: item.product_name,
        prev_unit_cost: item.unit_cost,
        offline_name: item.offlineProduct.map(productItem => productItem?.product_name),
        online_name: item.onlineProduct.map(productItem => productItem?.product_name)
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

  const handleInputClick = () => {
    setOpenProductList(prev => !prev)
    getSearchedProduct('', 0, access_token).then(data => {
      setSearchedProduct(data.data)
      setTotalPage(data.total_pages)
    })
  }

  return (
    <Grid item xs={12} marginBottom={8} style={{ position: 'relative' }}>
      <TextField
        onClick={handleInputClick}
        onChange={handleSearchProduct}
        onBlur={() => {
          setTimeout(() => {
            setOpenProductList(false)
          }, [200])
        }}
        fullWidth
        label='Search Products'
        placeholder='Search Products'
        value={productName}
        size='small'
      />

      {/* {showError && (
        <Typography variant='body2' color='error' fontSize={12}>
          Add product
        </Typography>
      )} */}

      <Box
        position='absolute'
        padding='1rem'
        width='98%'
        zIndex={5}
        bgcolor='#100720'
        style={{ display: openProductList ? 'block' : 'none' }}
        borderRadius={1}
        boxShadow={5}
        height={400}
        overflow='auto'
      >
        <List style={{ overflow: 'auto' }}>
          {productLoading ? (
            <ListItem>
              <CircularProgress color='inherit' style={{ margin: '0 auto' }} />
            </ListItem>
          ) : searchedProduct?.length !== 0 ? (
            searchedProduct?.map(item => (
              <Fragment key={item?.id}>
                <ListItem onClick={() => handleSelectProduct(item)} color='#fff' style={{ cursor: 'pointer' }}>
                  <Typography color='#fff' variant='body1'>
                    {item.product_name}
                  </Typography>
                </ListItem>
                <div ref={bottomBoundaryRef} />
              </Fragment>
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
