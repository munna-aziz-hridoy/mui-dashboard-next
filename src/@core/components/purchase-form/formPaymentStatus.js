import React, { useState, useEffect } from 'react'
import { getPaymentChoice } from 'src/@core/apiFunction/product'

// ** MUI import
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import PartialPaymentModal from '../modal/partialPaymentModal'

const FormPaymentStatus = ({ setPurchaseData, clearForm }) => {
  const [paymentStatus, setPaymentStatus] = useState([])
  const [openPartialAmountModal, setOpenPartialAmountModal] = useState(false)

  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    getPaymentChoice().then(data => setPaymentStatus(data))
  }, [])

  useEffect(() => {
    setSelectedStatus('')
  }, [clearForm])

  const handleChangePaymentStatus = e => {
    const status = e.target.value

    if (status !== 'Partial') {
      setPurchaseData(prev => {
        return {
          ...prev,
          payment_status: status,
          amount_paid: 0
        }
      })
      setOpenPartialAmountModal(false)
    } else {
      setPurchaseData(prev => {
        return {
          ...prev,
          payment_status: status
        }
      })
      setOpenPartialAmountModal(true)
    }

    setSelectedStatus(status)
  }

  return (
    <Grid item xs={12} sm={6}>
      <FormControl fullWidth>
        <InputLabel id='form-layouts-separator-select-label'>Payment Status</InputLabel>
        <Select
          onChange={handleChangePaymentStatus}
          required
          label='Payment Status'
          defaultValue=''
          id='form-layouts-separator-select'
          labelId='form-layouts-separator-select-label'
          value={selectedStatus}
        >
          {paymentStatus.map((item, i) => (
            <MenuItem key={i} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* {!selectedStatus && (
        <Typography variant='body2' color='error' fontSize={12}>
          Add Payment status
        </Typography>
      )} */}
      <PartialPaymentModal
        open={openPartialAmountModal}
        setOpen={setOpenPartialAmountModal}
        setPurchaseData={setPurchaseData}
      />
    </Grid>
  )
}

export default FormPaymentStatus
