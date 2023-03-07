import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Button, Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'
import SupplierPurchaseHistoryTable from 'src/views/tables/supplierPurchaseHistoryTable'
import useSingleSupplier from 'src/@core/hooks/useSingleSupplier'
import { getToken } from 'src/@core/utils/manageToken'
import AddSuplierForm from 'src/@core/components/forms/addSuplierForm'

const StyledTypography = ({ children, label, icon = null }) => {
  return (
    <Typography variant='body2' display='flex' alignItems='center' gap={2}>
      {label} : <span style={{ fontWeight: '600' }}>{children}</span> {icon && icon}
    </Typography>
  )
}

const SupplierDetails = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [purchaseHistoryPage, setPurchaseHistoryPage] = useState(1)

  const {
    query: { supplierId }
  } = useRouter()

  const { access_token } = getToken()

  const { supplierDetails, loading, refetch } = useSingleSupplier(supplierId, purchaseHistoryPage, access_token)

  return (
    <Card>
      <CardHeader title='Supplier Details' />
      <Divider />
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        padding={5}
        paddingTop={0}
        paddingBottom={0}
      >
        <div />
        <Button onClick={() => setIsEditing(prev => !prev)} size='small' variant='outlined'>
          {isEditing ? 'Close' : 'Edit'}
        </Button>
      </Box>

      {loading && (
        <Box component='div' height={400} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='primary' />
        </Box>
      )}

      {!loading && (
        <Box component='div' padding={5}>
          {isEditing ? (
            <AddSuplierForm update previousData={supplierDetails} refetch={refetch} />
          ) : (
            <Fragment>
              <StyledTypography label='Supplier Id'>{supplierDetails?.id}</StyledTypography>
              <StyledTypography label='Supplier Name'>{supplierDetails?.name}</StyledTypography>
              <StyledTypography label='Phone'>{supplierDetails?.phone}</StyledTypography>
              <StyledTypography label='Email'>{supplierDetails?.email}</StyledTypography>
              <StyledTypography label='Fax'>{supplierDetails?.fax}</StyledTypography>
              <StyledTypography label='Address'>{supplierDetails?.address}</StyledTypography>
            </Fragment>
          )}

          <Box component='div' sx={{ margin: '20px 0' }}>
            <StyledTypography label='Purchase Count'>{supplierDetails?.total_invoices}</StyledTypography>
            <StyledTypography label='Total Transaction'>¥{supplierDetails?.total_purchase_amount}</StyledTypography>
            <StyledTypography label='Total Paid'>¥{supplierDetails?.total_paid_amount}</StyledTypography>
            <StyledTypography label='Total Due'>¥{supplierDetails?.total_due_amount}</StyledTypography>
          </Box>

          <Box component='div' sx={{ margin: '10px 0' }}>
            <Typography variant='body1' fontSize={18} fontWeight={500}>
              Purchase History
            </Typography>
            <Divider />

            <SupplierPurchaseHistoryTable invoices={supplierDetails?.invoices} pageCount={setPurchaseHistoryPage} />

            <Divider />
          </Box>
        </Box>
      )}
    </Card>
  )
}

export default SupplierDetails
