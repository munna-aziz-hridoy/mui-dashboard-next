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
import { postInvoice, removeInvoiceImage, uploadInvoiceImage } from 'src/@core/apiFunction/invoice'
import FormStockStatus from './formStockStatus'
import formatedDate from 'src/@core/utils/getFormatedDate'
import { getToken } from 'src/@core/utils/manageToken'
import FormInvoiceStatus from './formInvoiceStatus'
import FormInvoiceNumber from './formInvoiceNumber'
import { useRouter } from 'next/router'
import ConfirmModal from '../modal/confirmModal'

const AddPurchaseForm = () => {
  const invoice_date = formatedDate(new Date())

  // ** States
  const [purchaseData, setPurchaseData] = useState({
    invoice_type: 'Regular Order',
    tax: 0,
    tax_percentage: 0,
    discount: 0,
    shipping_charge: 0,
    note: '',
    payment_status: '',
    amount_paid: null,
    invoice_date
    // invoice_no: null
  })

  const [selectedProduct, setSelectedProduct] = useState([])

  const [invoiceFile, setInvoiceFile] = useState(null)

  const [invoiceTotal, setInvoiceTotal] = useState(0)
  const [totalTax, setTotalTax] = useState(0)
  // const [totalProductCount, setTotalProductCount] = useState(0)

  const [clearForm, setClearForm] = useState(false)
  const [showError, setShowError] = useState(false)

  // const [confirmModal, setConfirmModal] = useState(false)

  // const [confirmSubmit, setConfirmSubmit] = useState(false)

  const [loading, setLoading] = useState(false)

  const { access_token } = getToken()

  const router = useRouter()

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

      // const totalQuantityArr = selectedProduct.map(item => item.quantity)
      // const totalQuantity = totalQuantityArr?.reduce((prev, next) => prev + next)
      // setTotalProductCount(totalQuantity)
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

    const isConfirm = window.confirm('Are you sure you want to submit this invoice?')

    if (!isConfirm) return

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

    const supplier_document = invoiceFile
    const data = { ...purchaseData, supplier_document, invoice_items }

    postInvoice(data, access_token)
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
          setClearForm(true)
          setTotalTax(0)
          setInvoiceTotal(0)
          setInvoiceFile(null)
        }
      })
      .catch(err => {
        toast.error('Invoice Not added')
        setLoading(false)
        setClearForm(true)
        setTotalTax(0)
        setInvoiceTotal(0)
        setInvoiceFile(null)
      })
  }

  const handleRemoveImage = () => {
    if (invoiceFile) {
      removeInvoiceImage(invoiceFile, access_token).then(data => {
        console.log(data)
      })
    }
  }

  return (
    <Card>
      <CardHeader title='Add New Purchase' titleTypographyProps={{ variant: 'h6' }} />
      {/* <ConfirmModal
        open={confirmModal}
        setOpen={setConfirmModal}
        setConfirm={setConfirmSubmit}
        cancel={handleRemoveImage}
        invoiceTotal={invoiceTotal + totalTax - (purchaseData?.discount || 0) + (purchaseData?.shipping_cost || 0)}
        paymentStatus={purchaseData?.payment_status}
        totalItems={totalProductCount}
      /> */}
      <Divider sx={{ margin: 0 }} />
      {loading ? (
        <LinearProgress color='primary' />
      ) : (
        <form id='purchase-form' onSubmit={handlePurchaseDataSubmit}>
          <CardContent>
            <Grid container spacing={5}>
              {/* purchase form start */}

              <Grid item xs={7}>
                <Grid container spacing={3}>
                  <FormInvoiceStatus setPurchaseData={setPurchaseData} clearForm={clearForm} />

                  <FormDatePicker purchaseData={purchaseData} setPurchaseData={setPurchaseData} />

                  <FormInvoiceNumber setPurchaseData={setPurchaseData} />

                  <FormSuplierSelect setPurchaseData={setPurchaseData} clearForm={clearForm} />

                  <FormPaymentStatus setPurchaseData={setPurchaseData} clearForm={clearForm} />

                  <FormStockStatus setPurchaseData={setPurchaseData} clearForm={clearForm} />
                </Grid>
              </Grid>

              <Grid item xs={5} padding={0}>
                <FormControl fullWidth>
                  <FileUpload setFiles={setInvoiceFile} clearForm={clearForm} file={invoiceFile} />
                </FormControl>
              </Grid>

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

              <Grid item xs={12}>
                <Divider sx={{ marginBottom: 0 }} />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ margin: 0 }} />
          <CardActions>
            <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
              Submit
            </Button>
            <Button
              onClick={() => {
                handleRemoveImage()
                router.push('/purchase/purchase-list')
              }}
              size='large'
              color='secondary'
              variant='outlined'
            >
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
