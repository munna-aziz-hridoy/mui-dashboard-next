import React, { useState } from 'react'

import { Grid, TextField, InputAdornment, Button, Typography } from '@mui/material'

import { Phone, AccountOutline, EmailOutline } from 'mdi-material-ui'
import { FaAddressCard, FaFax } from 'react-icons/fa'
import { addSupplier, updateSupplier } from 'src/@core/apiFunction/suplier'
import toast, { Toaster } from 'react-hot-toast'
import { getToken } from 'src/@core/utils/manageToken'

const AddSuplierForm = ({ refetch, previousData = null, update = false }) => {
  const [emailLength, setEmailLength] = useState(0)

  const { access_token } = getToken()

  const handleAddSuplier = e => {
    e.preventDefault()

    const name = e.target.name.value || previousData?.name
    const email = e.target.email.value || previousData?.email || ''
    const phone = e.target.phone.value || previousData?.phone || ''
    const fax = e.target.fax.value || previousData?.fax || ''
    const address = e.target.address.value || previousData?.address || ''

    const supplierData = { name, email, phone, fax, address }

    if (update) {
      updateSupplier(supplierData, previousData?.id, access_token).then(data => {
        if (data.success) {
          toast.success('Supplier is Updated')
          e.target.name.value = ''
          e.target.email.value = ''
          e.target.phone.value = ''
          e.target.fax.value = ''
          e.target.address.value = ''
          if (refetch) {
            refetch(prev => !prev)
          }
        } else {
          toast.error('Failed to Update supplier')
        }
      })
    } else {
      addSupplier(supplierData, access_token).then(data => {
        if (data.success) {
          toast.success('Supplier is added')
          e.target.name.value = ''
          e.target.email.value = ''
          e.target.phone.value = ''
          e.target.fax.value = ''
          e.target.address.value = ''
          if (refetch) {
            refetch(prev => !prev)
          }
        } else {
          toast.error('Failed to create supplier')
        }
      })
    }
  }

  return (
    <form onSubmit={handleAddSuplier}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Full Name'
            placeholder='Suplier Name'
            name='name'
            size='small'
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountOutline />
                </InputAdornment>
              )
            }}
            defaultValue={previousData?.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={e => setEmailLength(e.target.value.length)}
            fullWidth
            type='email'
            label='Email'
            size='small'
            placeholder='Suplier Email'
            name='email'
            helperText='You can use letters, numbers & periods'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <EmailOutline />
                </InputAdornment>
              )
            }}
            defaultValue={previousData?.email}
          />
          {/* {emailLength > 20 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Email can't be more than 20 character
            </Typography>
          )} */}
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type='phone'
            label='Phone No.'
            name='phone'
            size='small'
            placeholder='Suplier Phone'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Phone />
                </InputAdornment>
              )
            }}
            defaultValue={previousData?.phone}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size='small'
            type='fax'
            label='Fax.'
            placeholder='Fax'
            name='fax'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FaFax />
                </InputAdornment>
              )
            }}
            defaultValue={previousData?.fax}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size='small'
            multiline
            minRows={3}
            label='Address'
            placeholder='Address'
            name='address'
            sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <FaAddressCard />
                </InputAdornment>
              )
            }}
            defaultValue={previousData?.address}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' size='small'>
            {update ? 'Update' : 'Add'} Supplier
          </Button>
        </Grid>
      </Grid>
      <Toaster />
    </form>
  )
}

export default AddSuplierForm
