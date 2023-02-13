import React, { useState } from 'react'

import { Grid, TextField, InputAdornment, Button, Typography } from '@mui/material'

import { Phone, AccountOutline, EmailOutline } from 'mdi-material-ui'
import { FaAddressCard, FaFax } from 'react-icons/fa'
import { addSupplier } from 'src/@core/apiFunction/suplier'
import { toast } from 'react-hot-toast'

const AddSuplierForm = ({ refetch }) => {
  const [emailLength, setEmailLength] = useState(0)

  const handleAddSuplier = e => {
    e.preventDefault()

    const name = e.target.name.value
    const email = e.target.email.value || ''
    const phone = e.target.phone.value || ''
    const fax = e.target.fax.value || ''
    const address = e.target.address.value || ''

    const supplierData = { name, email, phone, fax, address }

    addSupplier(supplierData).then(data => {
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

  return (
    <form onSubmit={handleAddSuplier}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label='Full Name'
            placeholder='Suplier Name'
            name='name'
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountOutline />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={e => setEmailLength(e.target.value.length)}
            fullWidth
            type='email'
            label='Email'
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
          />
          {emailLength > 20 && (
            <Typography variant='body2' color='error' fontSize={12}>
              Email can't be more than 20 character
            </Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type='phone'
            label='Phone No.'
            name='phone'
            placeholder='Suplier Phone'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Phone />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
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
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
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
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' size='large'>
            Add Supplier
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddSuplierForm
