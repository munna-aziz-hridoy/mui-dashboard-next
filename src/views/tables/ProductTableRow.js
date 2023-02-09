import { TableCell, TableRow, Box, Typography, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BsPencilSquare, BsTrashFill } from 'react-icons/bs'
import EditProduct from 'src/@core/components/modal/editProductPropertiesModal'

const ProductTableRow = ({ productData, setProducts, setInvoiceTotal, setTotalTax }) => {
  const [openEditProductModal, setOpenEditProductModal] = useState(false)
  const { product, product_name, prev_unit_cost } = productData

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

  return (
    <TableRow hover role='checkbox' tabIndex={-1} style={{ padding: '30px' }}>
      <TableCell>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography variant='body1'>{product_name.split(' -')[0]}</Typography>

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
          onChange={e => handleSetProductProperty('quantity', e)}
          type='number'
          value={productData?.quantity}
          required
        />
        {!productData?.quantity && (
          <Typography style={{ position: 'absolute' }} variant='body2' textAlign='center' color='error' fontSize={12}>
            Please input product quantity
          </Typography>
        )}
      </TableCell>
      <TableCell height={85}>{prev_unit_cost}</TableCell>
      <TableCell style={{ position: 'relative' }}>
        <TextField
          className='table_input'
          onChange={e => handleSetProductProperty('unit_cost', e)}
          type='number'
          value={productData?.unit_cost}
          required
        />
        {!productData?.unit_cost && (
          <Typography style={{ position: 'absolute' }} variant='body2' textAlign='center' color='error' fontSize={12}>
            Please input product unit cost
          </Typography>
        )}
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
