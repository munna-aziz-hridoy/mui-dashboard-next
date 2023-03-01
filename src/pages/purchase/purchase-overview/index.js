import React, { forwardRef, useState } from 'react'
import { Box, Button, Card, CardHeader, Divider, Grid, Tab as MuiTab, TextField, Typography } from '@mui/material'

import { AiFillEye } from 'react-icons/ai'

import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { styled } from '@mui/material/styles'
import ItemTable from 'src/@core/components/purchase-overview/ItemTable'
import SupplierTable from 'src/@core/components/purchase-overview/supplierTable'

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

const PurchaseOverview = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState()

  const [tabValue, setTabValue] = useState('item')

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
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
              customInput={<CustomInput label='Invoice Date' />}
              onChange={value => {
                setStartDate(value[0])
                setEndDate(value[1])
              }}
              startDate={startDate}
              endDate={endDate}
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
              customInput={<CustomInput label='Created Date' />}
              onChange={value => {
                setStartDate(value[0])
                setEndDate(value[1])
              }}
              startDate={startDate}
              endDate={endDate}
            />
          </DatePickerWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button variant='contained' fullWidth>
            Get Overview
          </Button>
        </Grid>
      </Grid>

      <Divider />

      <Box component='div' padding={5}>
        <StyledTypography label='Total Purchases' icon={<AiFillEye fontSize={20} style={{ marginTop: '-2px' }} />}>
          10
        </StyledTypography>
        <StyledTypography label='Purchase amount'>¥10000</StyledTypography>
        <StyledTypography label='Total item'>100</StyledTypography>
        <Divider style={{ width: '40%' }} />

        <StyledTypography label='Paid amount'>¥6000</StyledTypography>
        <StyledTypography label='Partial pay amount'>¥1000</StyledTypography>
        <StyledTypography label='Total Due'>¥5000</StyledTypography>
        <StyledTypography label='Unpaid'>6</StyledTypography>
      </Box>

      <Box component='div'>
        <TabContext value={tabValue}>
          <TabList onChange={handleTabChange} sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}>
            <Tab value='item' label={<TabName>All Items</TabName>} />
            <Tab value='supplier' label={<TabName>Supplier</TabName>} />
          </TabList>

          <TabPanel value='item'>
            <ItemTable />
          </TabPanel>
          <TabPanel value='supplier'>
            <SupplierTable />
          </TabPanel>
        </TabContext>
      </Box>
    </Card>
  )
}

export default PurchaseOverview
