import { TableCell, TableRow, Box, Typography, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { BsPencilSquare } from 'react-icons/bs'
import EditProduct from 'src/@core/components/modal/editProductPropertiesModal'

const ProductTableRow = ({ product, setProducts }) => {
  const [openEditProductModal, setOpenEditProductModal] = useState(false)
  const { pk, total_quantity, product_name } = product

  console.log(product)

  return (
    <TableRow hover role='checkbox' tabIndex={-1}>
      <TableCell>
        <Box style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Typography variant='body1'>{product_name}</Typography>

          <BsPencilSquare onClick={() => setOpenEditProductModal(true)} fontSize={18} cursor='pointer' />
        </Box>
        <EditProduct
          open={openEditProductModal}
          setOpen={setOpenEditProductModal}
          product={product}
          setProducts={setProducts}
        />
      </TableCell>
      <TableCell>{pk}</TableCell>
      <TableCell>
        <TextField
          onChange={e => {
            const quantity = parseFloat(e.target.value)
            setProducts(prev => {
              const exists = prev.find(item => item.product === pk)
              const restItem = prev.filter(item => item.product !== pk)
              exists.quantity = quantity
              return [...restItem, exists]
            })
          }}
          type='number'
          value={product?.quantity}
        />
      </TableCell>
      <TableCell>
        <TextField disabled style={{ background: '#eee', borderRadius: '3px' }} />
      </TableCell>
      <TableCell>
        <TextField disabled style={{ background: '#eee', borderRadius: '3px' }} />
      </TableCell>
      <TableCell>{product?.unitCost ? product?.unitCost : '0.00'}</TableCell>
      <TableCell>{product?.discount ? product?.discount : '0.00'}</TableCell>
      <TableCell>{product?.tax ? product?.tax : '0.00'}</TableCell>
      <TableCell>{product?.unitCost && product?.discount ? product?.unitCost - product?.discount : '0.00'} </TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setProducts(prev => prev.filter(item => item.id !== pk))
          }}
          variant='contained'
          color='error'
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default ProductTableRow
