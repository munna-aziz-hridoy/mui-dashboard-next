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
  FormControl,
  LinearProgress
} from '@mui/material'

// ** Table Imports

import TableStickyHeader from 'src/views/tables/TableStickyHeader'

import FileUpload from 'src/@core/components/file-upload/fileUpload'

// ** Data import

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
import toast, { Toaster } from 'react-hot-toast'
import { postInvoice, uploadInvoiceImage } from 'src/@core/apiFunction/invoice'
import FormStockStatus from './formStockStatus'

const AddPurchaseForm = () => {
  const date = new Date()
  const dateArr = date.toString().split(' ')
  const time = `${dateArr[4].split(':')[0]}:${dateArr[4].split(':')[1]}`
  const timestamp = `${dateArr[3]}-${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${
    dateArr[2]
  } ${time}`

  // ** States
  const [purchaseData, setPurchaseData] = useState({
    invoice_type: 'Purchase',
    tax: 0,
    tax_percentage: 0,
    discount: 0,
    shipping_charge: 0,
    note: '',
    payment_status: '',
    amount_paid: null,
    invoice_date: timestamp
  })

  const [selectedProduct, setSelectedProduct] = useState([])

  const [invoiceFile, setInvoiceFile] = useState(null)

  const [invoiceTotal, setInvoiceTotal] = useState(0)
  const [totalTax, setTotalTax] = useState(0)
  const [clearForm, setClearForm] = useState(false)
  const [showError, setShowError] = useState(false)

  const [loading, setLoading] = useState(false)

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
    if (!invoiceFile) {
      return
    }

    if (selectedProduct.length === 0) {
      setShowError(true)
      return
    }
    setLoading(true)
    const invoice_items = selectedProduct.map(item => {
      const { product, product_unit, unit_cost, quantity } = item

      return {
        product,
        product_unit,
        unit_cost,
        quantity
      }
    })

    uploadInvoiceImage(invoiceFile).then(imageData => {
      if (imageData.success) {
        const supplier_document = imageData?.id
        const data = { ...purchaseData, supplier_document, invoice_items }

        postInvoice(data)
          .then(data => {
            if (data.success) {
              setClearForm(true)
              setTotalTax(0)
              setInvoiceTotal(0)
              setInvoiceFile(null)
              toast.success('Added to purchase list')
              setLoading(false)
            } else {
              toast.error('Invoice Not added')
              setLoading(false)
            }
          })
          .catch(err => {
            toast.error('Invoice Not added')
            setLoading(false)
          })
      } else {
        toast.error('Failed to upload image')
        setLoading(false)
      }
    })
  }

  return (
    <Card>
      <CardHeader title='Add New Purchase' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ margin: 0 }} />
      {loading ? (
        <LinearProgress color='primary' />
      ) : (
        <form id='purchase-form' onSubmit={handlePurchaseDataSubmit}>
          <CardContent>
            <Grid container spacing={5}>
              {/* purchase form start */}

              <Grid item xs={8}>
                <Grid container spacing={2}>
                  <FormDatePicker purchaseData={purchaseData} setPurchaseData={setPurchaseData} />

                  <FormSuplierSelect setPurchaseData={setPurchaseData} clearForm={clearForm} />

                  <FormPaymentStatus setPurchaseData={setPurchaseData} clearForm={clearForm} />

                  <FormStockStatus setPurchaseData={setPurchaseData} clearForm={clearForm} />

                  <FormSelectProduct
                    setSelectedProduct={setSelectedProduct}
                    // selectedProduct={selectedProduct}
                    clearForm={clearForm}
                    // showError={showError}
                  />

                  {/* Product list table */}

                  <TableStickyHeader
                    products={selectedProduct}
                    setProducts={setSelectedProduct}
                    invoiceTotal={invoiceTotal}
                    setInvoiceTotal={setInvoiceTotal}
                    setTotalTax={setTotalTax}
                  />

                  {selectedProduct?.length !== 0 && (
                    <>
                      <FormDiscount setPurchaseData={setPurchaseData} clearForm={clearForm} />

                      <FormShippingCost setPurchaseData={setPurchaseData} clearForm={clearForm} />
                      <FormChangeTax
                        setTotalTax={setTotalTax}
                        purchaseData={purchaseData}
                        totalTax={totalTax}
                        clearForm={clearForm}
                        invoiceTotal={invoiceTotal}
                      />
                      <FormSelectTax
                        setPurchaseData={setPurchaseData}
                        setTotalTax={setTotalTax}
                        invoiceTotal={invoiceTotal}
                        clearForm={clearForm}
                      />
                    </>
                  )}

                  <Grid item xs={12}>
                    <FormInvoiceNote setPurchaseData={setPurchaseData} clearForm={clearForm} />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography fontWeight={600} variant='h6'>
                      Invoice Total:{' '}
                      {invoiceTotal + totalTax - (purchaseData?.discount || 0) + (purchaseData?.shipping_cost || 0)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={4} padding={0}>
                <FormControl fullWidth>
                  <FileUpload setFiles={setInvoiceFile} clearForm={clearForm} file={invoiceFile} />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>

              {/* 
            <FormSelectProduct
              setSelectedProduct={setSelectedProduct}
              selectedProduct={selectedProduct}
              clearForm={clearForm}
              showError={showError}
            />

            

            <TableStickyHeader
              products={selectedProduct}
              setProducts={setSelectedProduct}
              invoiceTotal={invoiceTotal}
              setInvoiceTotal={setInvoiceTotal}
              setTotalTax={setTotalTax}
            /> */}

              {/* {selectedProduct?.length !== 0 && (
              <>
                <FormDiscount setPurchaseData={setPurchaseData} clearForm={clearForm} />

                <FormShippingCost setPurchaseData={setPurchaseData} clearForm={clearForm} />
                <FormChangeTax
                  setTotalTax={setTotalTax}
                  purchaseData={purchaseData}
                  totalTax={totalTax}
                  clearForm={clearForm}
                  invoiceTotal={invoiceTotal}
                />
                <FormSelectTax
                  setPurchaseData={setPurchaseData}
                  setTotalTax={setTotalTax}
                  invoiceTotal={invoiceTotal}
                  clearForm={clearForm}
                />
              </>
            )} */}

              {/* <Grid item xs={12}>
              <FormInvoiceNote setPurchaseData={setPurchaseData} clearForm={clearForm} />
            </Grid>

            <Grid item xs={12}>
              <Typography fontWeight={600} variant='h6'>
                Invoice Total:{' '}
                {invoiceTotal + totalTax - (purchaseData?.discount || 0) + (purchaseData?.shipping_cost || 0)}
              </Typography>
            </Grid> */}
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
      )}
      <Toaster />
    </Card>
  )
}

export default AddPurchaseForm
