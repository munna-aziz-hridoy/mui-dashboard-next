import React, { useEffect, useState } from 'react'

// ** MUI import

import { Grid, FormControl, RadioGroup, Radio, FormControlLabel } from '@mui/material'
import { getTaxChoices } from 'src/@core/apiFunction/product'

const FormSelectTax = ({ setPurchaseData, setTotalTax, invoiceTotal }) => {
  const [taxChoices, setTaxChoices] = useState([])

  useEffect(() => {
    getTaxChoices().then(data => setTaxChoices(data))
  }, [])

  const handleSetTax = e => {
    const taxInPercent = parseInt(e.target.value)
    const taxAmount = (invoiceTotal * taxInPercent) / 100
    setTotalTax(taxAmount)

    setPurchaseData(prev => {
      return {
        ...prev,
        tax: taxAmount,
        tax_percentage: taxInPercent
      }
    })
  }

  return (
    <Grid item xs={3}>
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

          {taxChoices.map(item => (
            <FormControlLabel key={item} value={item} control={<Radio />} label={`Tax ${item}%`} />
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  )
}

export default FormSelectTax
