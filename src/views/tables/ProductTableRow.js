import { TableCell, TableRow, Box, Typography, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs'
import EditProduct from 'src/@core/components/modal/editProductPropertiesModal'

const ProductTableRow = ({ productData, setProducts, setInvoiceTotal, setTotalTax, index }) => {
  const [openEditProductModal, setOpenEditProductModal] = useState(false)
  const { product, product_name, prev_unit_cost, product_unit } = productData

  const handleSetProductProperty = (property, e) => {
    setProducts(prev => {
      const exists = prev.find(item => item.product === product)
      exists[property] = parseFloat(e.target.value)

      const itemIndex = prev.indexOf(productData)

      const restItem = prev.filter(item => item.product !== product)

      restItem.splice(itemIndex, 0, exists)
      return restItem
    })
  }

  console.log(productData)

  return (
    <TableRow hover role='checkbox' tabIndex={-1} style={{ padding: '30px' }}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography variant='body1'>{product_name}</Typography>

          <BsPencilSquare onClick={() => setOpenEditProductModal(true)} fontSize={18} cursor='pointer' />
        </Box>
        <EditProduct
          open={openEditProductModal}
          setOpen={setOpenEditProductModal}
          productData={productData}
          setProducts={setProducts}
        />
      </TableCell>
      {/* <TableCell>{product}</TableCell> */}
      <TableCell style={{ position: 'relative' }}>
        <TextField
          className='table_input'
          onChange={e => {
            e.preventDefault()
            if (parseFloat(e.target.value) < 0) return
            handleSetProductProperty('quantity', e)
          }}
          type='number'
          onWheel={e => e.preventDefault()}
          onKeyDown={e => {
            if (e.which === 38 || e.which === 40) {
              e.preventDefault()
            }
          }}
          value={productData?.quantity}
          required
        />
        {/* {!productData?.quantity && (
          <Typography style={{ position: 'absolute' }} variant='body2' textAlign='center' color='error' fontSize={12}>
            Please input product quantity
          </Typography>
        )} */}
      </TableCell>
      <TableCell>{product_unit}</TableCell>

      <TableCell style={{ position: 'relative' }}>
        <TextField
          className='table_input'
          onChange={e => {
            if (parseFloat(e.target.value) < 0) return
            handleSetProductProperty('unit_cost', e)
          }}
          type='number'
          onWheel={e => e.preventDefault()}
          onKeyDown={e => {
            if (e.which === 38 || e.which === 40) {
              e.preventDefault()
            }
          }}
          value={productData?.unit_cost}
          required
        />
        {/* {!productData?.unit_cost && (
          <Typography style={{ position: 'absolute' }} variant='body2' textAlign='center' color='error' fontSize={12}>
            Please input product unit cost
          </Typography>
        )} */}
      </TableCell>
      <TableCell>
        <Typography>
          {productData?.quantity && productData?.unit_cost ? productData?.quantity * productData?.unit_cost : '0.00'}
        </Typography>
      </TableCell>
      {/* <TableCell>{productData?.unitCost ? productData?.unitCost : '0.00'}</TableCell>
      <TableCell>{productData?.discount ? productData?.discount : '0.00'}</TableCell>
      <TableCell>{productData?.tax ? productData?.tax : '0.00'}</TableCell>
      <TableCell>
        {productData?.unitCost && productData?.discount ? productData?.unitCost - productData?.discount : '0.00'}{' '}
      </TableCell> */}
      <TableCell height={85}>{prev_unit_cost}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setProducts(prev => prev.filter(item => item.product !== product))
            setInvoiceTotal(0)
            setTotalTax(0)
          }}
          variant='contained'
          color='error'
        >
          <BsTrashFill fontSize={18} color='#fff' />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ProductTableRow
