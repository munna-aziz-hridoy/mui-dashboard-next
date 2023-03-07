import React, { forwardRef, useEffect, useState } from 'react'
import { Box, Button, Card, CardHeader, Divider, Grid, Tab as MuiTab, TextField, Typography } from '@mui/material'

import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { styled } from '@mui/material/styles'
import ItemTable from 'src/@core/components/purchase-overview/ItemTable'
import SupplierTable from 'src/@core/components/purchase-overview/supplierTable'

import 'react-datepicker/dist/react-datepicker.css'
import { purchaseOverview } from 'src/@core/apiFunction/invoice'
import formatedDate from 'src/@core/utils/getFormatedDate'
import { getToken } from 'src/@core/utils/manageToken'

const CustomInput = forwardRef((props, ref) => {
  return <TextField size='small' fullWidth {...props} inputRef={ref} label={props.label} autoComplete='off' />
})

const StyledTypography = ({ children, label, icon = null }) => {
  return (
    <Typography variant='body2' display='flex' alignItems='center' gap={2}>
      {label} : <span style={{ fontWeight: '600' }}>{children}</span> {icon && icon}
    </Typography>
  )
}

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

function last30Days() {
  const result = []
  for (let i = 0; i < 30; i++) {
    let d = new Date()
    d.setDate(d.getDate() - i)
    result.push(d)
  }

  return result
}

const PurchaseOverview = () => {
  const [purchaseOverviewData, setPurchaseOverviewData] = useState(null)
  const [loading, setLoading] = useState(false)

  const [createdStartDate, setCreatedStartDate] = useState(last30Days()[29])
  const [createdEndDate, setCreatedEndDate] = useState(new Date())

  const [invoiceStartDate, setInvoiceStartDate] = useState()
  const [invoiceEndDate, setInvoiceEndDate] = useState()

  const [tabValue, setTabValue] = useState('item')

  const [refetch, setRefetch] = useState(false)

  const [pageProduct, setPageProduct] = useState(1)
  const [pageSup, setPageSup] = useState(1)

  const { access_token } = getToken()

  useEffect(() => {
    const formatedCreatedDate =
      createdEndDate && createdStartDate ? [formatedDate(createdStartDate), formatedDate(createdEndDate)] : []

    const formatedInvoiceDate =
      invoiceStartDate && invoiceEndDate ? [formatedDate(invoiceStartDate), formatedDate(invoiceEndDate)] : []

    setLoading(true)
    purchaseOverview(formatedCreatedDate, formatedInvoiceDate, access_token, pageProduct, pageSup).then(data => {
      if (data?.invoices) {
        setPurchaseOverviewData(data)
      }
    })
  }, [refetch, pageProduct, pageSup])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleRefetch = () => {
    setRefetch(prev => !prev)
  }

  return (
    <Card>
      <CardHeader title='Purchase Overview' />
      <Divider />
      <Grid container spacing={3} padding={5}>
        <Grid item xs={12} sm={4}>
          <DatePickerWrapper>
            <DatePicker
              selectsRange={true}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput label='Created Date' />}
              onChange={value => {
                setCreatedStartDate(value[0])
                setCreatedEndDate(value[1])
              }}
              startDate={createdStartDate}
              endDate={createdEndDate}
            />
          </DatePickerWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <DatePickerWrapper>
            <DatePicker
              selectsRange={true}
              showYearDropdown
              showMonthDropdown
              placeholderText='MM-DD-YYYY'
              customInput={<CustomInput label='Invoice Date' />}
              onChange={value => {
                setInvoiceStartDate(value[0])
                setInvoiceEndDate(value[1])
              }}
              startDate={invoiceStartDate}
              endDate={invoiceEndDate}
            />
          </DatePickerWrapper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Button onClick={handleRefetch} variant='contained' fullWidth>
            Get Overview
          </Button>
        </Grid>
      </Grid>

      <Divider />

      <Box component='div' padding={5}>
        <StyledTypography label='Total Purchases'>{purchaseOverviewData?.invoices?.invoice_count}</StyledTypography>
        <StyledTypography label='Purchase amount'>
          ¥{purchaseOverviewData?.invoices?.total_purchase_amount}
        </StyledTypography>
        <StyledTypography label='Grand Total'>
          ¥{purchaseOverviewData?.invoices?.total_invoice_amount?.toFixed(2)}
        </StyledTypography>
        <StyledTypography label='Total item'>{purchaseOverviewData?.items?.total_records}</StyledTypography>
        <Divider style={{ width: '40%' }} />

        <StyledTypography label='Paid amount'>
          ¥${purchaseOverviewData?.invoices?.total_paid_amount?.toFixed(2)}
        </StyledTypography>
        <StyledTypography label='Partial pay amount'>
          ¥{purchaseOverviewData?.invoices?.total_partial_paid_amount}
        </StyledTypography>
        <StyledTypography label='Total Due'>
          ¥{purchaseOverviewData?.invoices?.total_unpaid_amount?.toFixed(2)}
        </StyledTypography>
        <StyledTypography label='Unpaid'>{purchaseOverviewData?.invoices?.total_unpaid_count}</StyledTypography>
      </Box>

      <Box component='div'>
        <TabContext value={tabValue}>
          <TabList onChange={handleTabChange} sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
            <Tab value='item' label={<TabName>All Items</TabName>} />
            <Tab value='supplier' label={<TabName>Supplier</TabName>} />
          </TabList>

          <TabPanel value='item'>
            <ItemTable data={purchaseOverviewData?.items} pageCount={setPageProduct} />
          </TabPanel>
          <TabPanel value='supplier'>
            <SupplierTable data={purchaseOverviewData?.suppliers} pageCount={setPageSup} />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  )
}

export default PurchaseOverview
