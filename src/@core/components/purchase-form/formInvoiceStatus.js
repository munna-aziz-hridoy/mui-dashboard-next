import React, { useState, useEffect } from 'react'
import { getInvoiceStatusChoices } from 'src/@core/apiFunction/product'

// ** MUI import
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { getToken } from 'src/@core/utils/manageToken'
import { useRouter } from 'next/router'

const FormInvoiceStatus = ({ setPurchaseData, clearForm }) => {
  const [invoiceStatus, setInvoiceStatus] = useState([])

  const [selectedStatus, setSelectedStatus] = useState('')

  const { access_token } = getToken()

  const { pathname } = useRouter()

  useEffect(() => {
    getInvoiceStatusChoices(access_token).then(data => setInvoiceStatus(data))
  }, [])

  useEffect(() => {
    setSelectedStatus('')
  }, [clearForm])

  useEffect(() => {
    if (pathname.includes('add-purchase')) {
      setSelectedStatus('Regular Order')
    }
  }, [])

  console.log(invoiceStatus)

  const handleChangeInvoiceStatus = e => {
    const invoice = e.target.value

    setPurchaseData(prev => {
      return {
        ...prev,
        invoice_type: invoice
      }
    })
    setSelectedStatus(invoice)
  }

  return (
    <Grid item xs={12}>
      <FormControl size='small' fullWidth>
        <InputLabel id='form-layouts-separator-select-label'>Invoice Status</InputLabel>
        <Select
          onChange={handleChangeInvoiceStatus}
          required
          label='Invoice Status'
          defaultValue=''
          id='form-layouts-separator-select'
          labelId='form-layouts-separator-select-label'
          value={selectedStatus}
        >
          {invoiceStatus?.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default FormInvoiceStatus
