import React from 'react'

// ** MUI import

import { Grid, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material'

const FormSelectTax = ({ setPurchaseData, setTotalTax, invoiceTotal }) => {
  const handleSetTax = e => {
    const taxInPercent = parseInt(e.target.value)
    if (taxInPercent === 0) {
      setPurchaseData(prev => {
        return {
          ...prev,
          tax_8: 0,
          tax_10: 0
        }
      })
      setTotalTax(0)
    } else if (taxInPercent === 8) {
      const taxAmount = (invoiceTotal * taxInPercent) / 100

      setPurchaseData(prev => {
        return {
          ...prev,
          tax_8: taxAmount,
          tax_10: 0
        }
      })

      setTotalTax(taxAmount)
    } else if (taxInPercent === 10) {
      const taxAmount = (invoiceTotal * taxInPercent) / 100

      setPurchaseData(prev => {
        return {
          ...prev,
          tax_8: 0,
          tax_10: taxAmount
        }
      })

      setTotalTax(taxAmount)
    }
  }

  return (
    <Grid item xs={12} sm={4}>
      <FormControl>
        {/* <FormLabel id='demo-radio-buttons-group-label'>Tax</FormLabel> */}
        <RadioGroup
          onChange={e => handleSetTax(e)}
          aria-labelledby='demo-radio-buttons-group-label'
          defaultValue='0'
          name='radio-buttons-group'
          style={{ flexDirection: 'row' }}
        >
          <FormControlLabel value='0' control={<Radio />} label='No Tax' />
          <FormControlLabel value='8' control={<Radio />} label='Tax 8%' />
          <FormControlLabel value='10' control={<Radio />} label='Tax 10%' />
        </RadioGroup>
      </FormControl>
    </Grid>
  )
}

export default FormSelectTax
