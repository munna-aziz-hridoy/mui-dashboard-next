import React, { forwardRef, useEffect, useState } from 'react'

//** MUI import
import { Card, CardHeader, Divider, Grid, TextField, Button, Box } from '@mui/material'

import { AiOutlinePlus } from 'react-icons/ai'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import SelectSuplierSearch from 'src/@core/components/purchase-list/SelectSuplierSearch'
import SelectPaymentSearch from 'src/@core/components/purchase-list/SelectPaymentSearch'
import TableCustomized from 'src/views/tables/TableCustomized'
import { useRouter } from 'next/router'
import formatedDate from 'src/@core/utils/getFormatedDate'
import { getAllInvoiceList } from 'src/@core/apiFunction/invoice'
import { getToken } from 'src/@core/utils/manageToken'

import SelectProduct from 'src/@core/components/purchase-list/SelectProduct'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' fullWidth {...props} inputRef={ref} label='Purchase Date' autoComplete='off' />
})

const PurchaseList = ({}) => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState()
  const [supplier, setSupplier] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [productName, setProductName] = useState('')

  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(false)
  const [refetch, setRefetch] = useState(false)
  const [clearForm, setClearForm] = useState(false)

  const router = useRouter()

  const { access_token } = getToken()

  useEffect(() => {
    setLoading(true)

    const formatedStartDate = startDate ? formatedDate(startDate) : ''
    const formatedEndDate = endDate ? formatedDate(endDate) : ''

    async function fetchData() {
      await getAllInvoiceList(
        productName,
        [formatedStartDate, formatedEndDate],
        supplier,
        paymentStatus,
        access_token
      ).then(data => {
        setInvoices(data)
        setLoading(false)
      })
    }

    fetchData()
  }, [refetch])

  const handleSearch = () => {
    setRefetch(prev => !prev)
    setClearForm(prev => !prev)
  }

  const handleResetFilter = () => {
    setProductName('')
    setEndDate('')
    setStartDate('')
    setSupplier('')
    setPaymentStatus('')
    setRefetch(prev => !prev)
    setClearForm(prev => !prev)
  }

  return (
    <>
      <Card style={{ padding: '1px 20px', overflow: 'visible', marginBottom: '30px' }}>
        <CardHeader style={{ padding: '10px 25px' }} title='Purchase List' titleTypographyProps={{ variant: 'h6' }} />
        <Divider sx={{ margin: 0 }} />

        <Grid container spacing={2} marginTop={1} marginBottom={3}>
          <Grid item xs={3}>
            <SelectProduct selectedProduct={productName} setSelectedProduct={setProductName} clearForm={clearForm} />
          </Grid>
          <Grid item xs={3}>
            <DatePickerWrapper>
              <DatePicker
                selectsRange={true}
                showYearDropdown
                showMonthDropdown
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={value => {
                  setStartDate(value[0])
                  setEndDate(value[1])
                }}
                startDate={startDate}
                endDate={endDate}
              />
            </DatePickerWrapper>
          </Grid>

          <SelectSuplierSearch setSupplier={setSupplier} />

          <SelectPaymentSearch setPayment={setPaymentStatus} />

          <Grid item xs={12}>
            <Box component='div' display='flex' gap={5}>
              <Button onClick={handleSearch} fullWidth variant='contained' size='small'>
                Search
              </Button>
              <Button onClick={handleResetFilter} fullWidth variant='outlined' size='small'>
                Reset Filter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>

      <Button
        variant='contained'
        size='small'
        style={{ display: 'inline-block', marginBottom: '20px' }}
        onClick={() => router.push('/purchase/add-purchase')}
      >
        <AiOutlinePlus fontSize={16} color='#fff' style={{ marginRight: '5px' }} />
        Add Purchase
      </Button>

      <Card>
        <TableCustomized setRefetch={setRefetch} invoices={invoices} loading={loading} refetch={refetch} />
      </Card>
    </>
  )
}

export default PurchaseList
