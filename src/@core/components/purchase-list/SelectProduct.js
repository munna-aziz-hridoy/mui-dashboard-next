import React, { Fragment, useEffect, useRef, useState } from 'react'
import { getSearchedProduct } from 'src/@core/apiFunction/product'

// ** MUI import

import { Grid, TextField, Box, List, ListItem, CircularProgress, Typography } from '@mui/material'
import { getToken } from 'src/@core/utils/manageToken'

const SelectProduct = ({ selectedProduct, setSelectedProduct, clearForm }) => {
  const [searchedProduct, setSearchedProduct] = useState([])

  const [productLoading, setProductLoading] = useState(false)

  const [openProductList, setOpenProductList] = useState(false)

  const bottomBoundaryRef = useRef()

  const { access_token } = getToken()

  useEffect(() => {
    setSelectedProduct('')
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

    setSelectedProduct(searchText)
    if (searchText !== '') {
      setProductLoading(true)
      setOpenProductList(true)
      getSearchedProduct(searchText, 0, access_token).then(data => {
        setSearchedProduct(data.data)

        setProductLoading(false)
      })
    } else {
      setOpenProductList(false)
    }
  }

  const handleSelectProduct = item => {
    setOpenProductList(false)
    setSelectedProduct(item.product_name)
  }

  const handleInputClick = () => {
    setOpenProductList(prev => !prev)
    getSearchedProduct('', 0, access_token).then(data => {
      setSearchedProduct(data.data)
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
        label='Search by Products'
        placeholder='Search by Products'
        value={selectedProduct}
        size='small'
      />

      <Box
        position='absolute'
        padding='1rem'
        width='98%'
        zIndex={5}
        bgcolor='#100720'
        style={{ display: openProductList ? 'block' : 'none' }}
        borderRadius={1}
        boxShadow={5}
        maxHeight={400}
        overflow='auto'
      >
        <List style={{ overflow: 'auto' }}>
          {productLoading ? (
            <ListItem>
              <CircularProgress color='inherit' style={{ margin: '0 auto' }} />
            </ListItem>
          ) : (
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
          )}
        </List>
      </Box>
    </Grid>
  )
}

export default SelectProduct
