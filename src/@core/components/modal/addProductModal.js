import React from 'react'

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
  Button
} from '@mui/material'

// ** Icon imports

import { Phone, AccountOutline, EmailOutline, MessageOutline } from 'mdi-material-ui'

import { BiMoney } from 'react-icons/bi'
import AddInternalProduct from '../forms/addInternalProductForm'

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

const AddProduct = ({ open, setOpen }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='keep-mounted-modal-title'
      aria-describedby='keep-mounted-modal-description'
    >
      <Box sx={style}>
        <Card>
          <CardHeader title='Add Product' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <AddInternalProduct closeModal={setOpen} />
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default AddProduct
