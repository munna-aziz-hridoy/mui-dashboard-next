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
import { FaAddressCard, FaFax } from 'react-icons/fa'

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

const AddSuplier = ({ open, setOpen }) => {
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
          <CardHeader title='Add Suplier' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Full Name'
                    placeholder='Suplier Name'
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
                    fullWidth
                    type='email'
                    label='Email'
                    placeholder='Suplier Email'
                    helperText='You can use letters, numbers & periods'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <EmailOutline />
                        </InputAdornment>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Phone No.'
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Fax.'
                    placeholder='Fax'
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
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default AddSuplier
