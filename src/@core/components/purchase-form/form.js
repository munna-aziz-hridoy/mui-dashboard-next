// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports

import {
  Card,
  Grid,
  Button,
  Divider,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  FormControl
} from '@mui/material'

// ** Table Imports

import TableStickyHeader from 'src/views/tables/TableStickyHeader'

import FileUpload from 'src/@core/components/file-upload'

// ** Data import

import mainUrl from 'src/@core/utils/mainUrl'

// **  Form Components

import FormDatePicker from './formDatePicker'
import FormSuplierSelect from './formSuplierSelect'
import FormPaymentStatus from './formPaymentStatus'
import FormSelectProduct from './formSelectProduct'
import FormSelectTax from './formSelectTax'
import FormChangeTax from './formChangeTax'
import FormDiscount from './formDiscount'
import FormShippingCost from './formShippingCost'
import FormInvoiceNote from './formInvoiceNote'

const listStyle = {
  background: '#c140f5',
  position: 'absolute',
  width: '98%',
  padding: '1rem',
  zIndex: '5'
}

const AddPurchaseForm = () => {
  // ** States
  const [purchaseData, setPurchaseData] = useState({})

  const [selectedProduct, setSelectedProduct] = useState([])

  const [invoiceFile, setInvoiceFile] = useState(null)

  const [invoiceTotal, setInvoiceTotal] = useState(0)
  const [totalTax, setTotalTax] = useState(0)

  useEffect(() => {
    if (selectedProduct.length !== 0) {
      const selectedProductPrices = selectedProduct.map(product => {
        if (product?.quantity && product?.unit_cost) {
          return product?.quantity * product?.unit_cost
        } else {
          return 0
        }
      })

      const totalProductPrices = selectedProductPrices.reduce((prev, next) => prev + next)
      setInvoiceTotal(totalProductPrices)
    }
  }, [selectedProduct])

  const handlePurchaseDataSubmit = e => {
    e.preventDefault()
    const url = `${mainUrl}/invoice/`

    console.log({ ...purchaseData, products: selectedProduct, file: invoiceFile })
  }

  return (
    <Card>
      <CardHeader title='Add New Purchase' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      <form onSubmit={handlePurchaseDataSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            {/* purchase form start */}

            <FormDatePicker purchaseData={purchaseData} setPurchaseData={setPurchaseData} />

            <FormSuplierSelect setPurchaseData={setPurchaseData} />

            <FormPaymentStatus setPurchaseData={setPurchaseData} />

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <FileUpload setFiles={setInvoiceFile} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 0 }} />
            </Grid>

            {/* Product list and search */}

            <FormSelectProduct setSelectedProduct={setSelectedProduct} />

            {/* Product list table */}

            <TableStickyHeader products={selectedProduct} setProducts={setSelectedProduct} />

            <FormSelectTax setPurchaseData={setPurchaseData} setTotalTax={setTotalTax} invoiceTotal={invoiceTotal} />

            <FormChangeTax setTotalTax={setTotalTax} purchaseData={purchaseData} totalTax={totalTax} />

            <FormDiscount setPurchaseData={setPurchaseData} />

            <FormShippingCost setPurchaseData={setPurchaseData} />

            <FormInvoiceNote setPurchaseData={setPurchaseData} />

            <Grid item xs={12}>
              <Typography fontWeight={600} variant='h6'>
                Invoice Total:{' '}
                {invoiceTotal + totalTax - (purchaseData?.discount || 0) + (purchaseData?.shipping_cost || 0)}
              </Typography>
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
