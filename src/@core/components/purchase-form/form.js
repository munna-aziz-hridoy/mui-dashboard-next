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
  Autocomplete
} from '@mui/material'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import TableStickyHeader from 'src/views/tables/TableStickyHeader'
import AddSuplier from 'src/@core/components/modal/addSuplierModal'
import FileUpload from 'src/@core/components/file-upload'
const CustomInput = forwardRef((props, ref) => {
  return <TextField fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const AddPurchaseForm = () => {
  // ** States
  const [language, setLanguage] = useState([])
  const [date, setDate] = useState(null)

  const [values, setValues] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  const [openSuplierModal, setOpenSuplierModal] = useState(false)

  // Handle Password
  const handlePasswordChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Handle Confirm Password
  const handleConfirmChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showPassword2: !values.showPassword2 })
  }

  const handleMouseDownConfirmPassword = event => {
    event.preventDefault()
  }

  // Handle Select
  const handleSelectChange = event => {
    setLanguage(event.target.value)
  }

  return (
    <Card>
      <CardHeader title='Add New Purchase' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            {/* <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Account Details
              </Typography>
            </Grid> */}
            <Grid item xs={12} sm={4}>
              {/* <TextField fullWidth label='Username' placeholder='carterLeonard' /> */}
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                id='form-layouts-separator-date'
                onChange={date => setDate(date)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              {/* <TextField fullWidth type='email' label='Email' placeholder='carterleonard@gmail.com' /> */}
              <Autocomplete
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
              />
              <AddSuplier open={openSuplierModal} setOpen={setOpenSuplierModal} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Purchase Status</InputLabel>
                <Select
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
                <FileUpload />

                {/* <OutlinedInput
                  value={values.password2}
                  label='Confirm Password'
                  id='form-layouts-separator-password-2'
                  onChange={handleConfirmChange('password2')}
                  type={values.showPassword2 ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        aria-label='toggle password visibility'
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                      >
                        {values.showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                /> */}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>

            <Grid item xs={12} marginBottom={8}>
              <TextField fullWidth label='Search Products' placeholder='Search Products' />
            </Grid>

            {/* Product list table */}

            <TableStickyHeader />

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Order Tax</InputLabel>
                <Select
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
              <TextField type='number' fullWidth label='Discount' placeholder='30%' />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField type='number' fullWidth label='Shipping Cost' placeholder='Shipping cost' />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
