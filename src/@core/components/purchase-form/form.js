// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports

import {
  Card,
  Grid,
  Button,
  Divider,
  MenuItem,
  TextField,
  CardHeader,
  InputLabel,
  IconButton,
  Typography,
  CardContent,
  CardActions,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Select,
  Autocomplete,
  List,
  ListItem,
  ListItemText,
  Box,
  CircularProgress
} from '@mui/material'

import { LoadingButton } from '@mui/lab'

import { createFilterOptions } from '@mui/material/Autocomplete'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import AddSuplier from 'src/@core/components/modal/addSuplierModal'
import FileUpload from 'src/@core/components/file-upload'

// ** Data import
import { product } from 'src/@core/utils/demoProduct'
import AddProduct from 'src/@core/components/modal/addProductModal'
import { getSearchedProduct } from 'src/@core/apiFunction/product'
import { getSearchedSuplier } from 'src/@core/apiFunction/suplier'

const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const listStyle = {
  background: '#c140f5',
  position: 'absolute',
  width: '98%',
  padding: '1rem',
  zIndex: '5'
}

const AddPurchaseForm = () => {
  // ** States
  const [purchaseData, setPurchaseData] = useState({})

  const [openSuplierModal, setOpenSuplierModal] = useState(false)
  const [openProductModal, setOpenProductModal] = useState(false)
  const [openProductList, setOpenProductList] = useState(false)
  const [openSuplierList, setOpenSuplierList] = useState(false)
  const [productLoading, setProductLoading] = useState(false)
  const [suplierLoading, setSuplierLoading] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState([])
  const [searchedProduct, setSearchedProduct] = useState([])
  const [searchedSuplier, setSearchedSuplier] = useState([])

  const [productName, setProductName] = useState('')
  const [suplierName, setSuplierName] = useState('')
  const [suplierData, setSuplierData] = useState({})

  const [invoice, setInvoice] = useState(null)

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

  const handleSearchSuplier = e => {
    const searchText = e.target.value
    setSuplierName(searchText)
    if (searchText !== '') {
      setSuplierLoading(true)
      setOpenSuplierList(true)
      getSearchedSuplier(searchText).then(data => {
        setSearchedSuplier(data)
        setSuplierLoading(false)
      })
    } else {
      setOpenSuplierList(false)
    }
  }

  const handlePurchaseDataSubmit = e => {
    e.preventDefault()
    const url = 'https://pims.goldlavender.jp/invoice/'

    console.log({ ...purchaseData, products: selectedProduct, suplier: suplierData?.id, file: invoice })

    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(purchaseProductData)
    // })
    //   .then(res => res.json())
    //   .then(data => console.log(data))
  }

  console.log(selectedProduct)

  return (
    <Card>
      <CardHeader
        onClick={() => console.log('wroking')}
        title='Add New Purchase'
        titleTypographyProps={{ variant: 'h6' }}
      />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handlePurchaseDataSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            {/* purchase form start */}

            <Grid item xs={12} sm={4}>
              <DatePicker
                selected={purchaseData?.purchaseDate}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date =>
                  setPurchaseData(prev => {
                    return {
                      ...prev,
                      purchaseDate: date
                    }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4} style={{ position: 'relative' }}>
              {/* <Autocomplete
                onChange={(e, value) => {
                  setPurchaseData(prev => {
                    return {
                      ...prev,
                      suplier: value
                    }
                  })
                }}
                fullWidth
                disablePortal
                id='combo-box-demo'
                options={['Suplier 1', 'Suplier 2', 'Suplier 3', 'Suplier 4', 'Suplier 5']}
                renderInput={params => {
                  return <TextField {...params} label='Suplier' />
                }}
                noOptionsText={
                  <Button
                    onClick={() => {
                      console.log('im working')
                      setOpenSuplierModal(true)
                    }}
                  >
                    Add Suplier
                  </Button>
                }
              /> */}

              <TextField
                onClick={() => {
                  setOpenSuplierList(true)
                  setSuplierLoading(true)
                  getSearchedSuplier('').then(data => {
                    setSearchedSuplier(data)
                    setSuplierLoading(false)
                  })
                }}
                onChange={handleSearchSuplier}
                fullWidth
                label='Search Suplier'
                placeholder='Search Suplier'
                value={suplierName}
              />

              <Box
                style={{ ...listStyle, display: openSuplierList ? 'block' : 'none', width: '92%' }}
                borderRadius={1}
                boxShadow={5}
              >
                <List>
                  {suplierLoading ? (
                    <ListItem>
                      <CircularProgress color='inherit' style={{ margin: '0 auto' }} />
                    </ListItem>
                  ) : searchedSuplier?.length !== 0 ? (
                    searchedSuplier?.map(item => (
                      <ListItem
                        onClick={() => {
                          setSuplierData(item)
                          setSuplierName(item?.name)
                          setOpenSuplierList(false)
                        }}
                        color='#fff'
                        style={{ cursor: 'pointer' }}
                      >
                        <Typography onClick={() => console.log('wroking')} color='#fff' variant='body1'>
                          {item.name}
                        </Typography>
                      </ListItem>
                    ))
                  ) : (
                    <ListItem>
                      <Button
                        onClick={() => setOpenSuplierModal(true)}
                        fullWidth
                        variant='outlined'
                        style={{ borderColor: '#fff', color: '#fff' }}
                      >
                        Add Suplier
                      </Button>
                    </ListItem>
                  )}
                </List>
              </Box>
              <AddSuplier open={openSuplierModal} setOpen={setOpenSuplierModal} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Purchase Status</InputLabel>
                <Select
                  onChange={e => {
                    setPurchaseData(prev => {
                      return {
                        ...prev,
                        status: e.target.value
                      }
                    })
                  }}
                  label='Purchase Status'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  {['Received', 'Partial', 'Pending', 'Ordered'].map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FileUpload setFiles={setInvoice} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>

            {/* Product list and search */}

            <Grid item xs={12} marginBottom={8} style={{ position: 'relative' }}>
              <TextField
                onClick={() => {
                  setOpenProductList(true)
                  getSearchedProduct('').then(data => setSearchedProduct(data))
                }}
                onChange={handleSearchProduct}
                fullWidth
                label='Search Products'
                placeholder='Search Products'
                value={productName}
              />

              <Box style={{ ...listStyle, display: openProductList ? 'block' : 'none' }} borderRadius={1} boxShadow={5}>
                <List>
                  {productLoading ? (
                    <ListItem>
                      <CircularProgress color='inherit' style={{ margin: '0 auto' }} />
                    </ListItem>
                  ) : searchedProduct?.length !== 0 ? (
                    searchedProduct?.map(item => (
                      <ListItem
                        onClick={() => {
                          setSelectedProduct(prev => [...prev, { product: item.pk, product_unit: item.product_unit }])
                          setOpenProductList(false)
                          setProductName('')
                        }}
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

            {/* Product list table */}

            <TableStickyHeader products={selectedProduct} setProducts={setSelectedProduct} />

            {/* Purchase form last section */}

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Order Tax</InputLabel>
                <Select
                  onChange={e => {
                    setPurchaseData(prev => {
                      return {
                        ...prev,
                        tax: e.target.value
                      }
                    })
                  }}
                  label='Order Tax'
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
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={e => {
                  setPurchaseData(prev => {
                    return {
                      ...prev,
                      discount: parseFloat(e.target.value)
                    }
                  })
                }}
                type='number'
                fullWidth
                label='Discount'
                placeholder='30%'
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                onChange={e => {
                  setPurchaseData(prev => {
                    return {
                      ...prev,
                      shippingCost: parseFloat(e.target.value)
                    }
                  })
                }}
                type='number'
                fullWidth
                label='Shipping Cost'
                placeholder='Shipping cost'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={e => {
                  setPurchaseData(prev => {
                    return {
                      ...prev,
                      note: e.target.value
                    }
                  })
                }}
                fullWidth
                multiline
                minRows={3}
                label='Note'
                placeholder='Note'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ margin: 0 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined'>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default AddPurchaseForm
