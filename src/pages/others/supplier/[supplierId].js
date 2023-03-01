import React from 'react'
import { useRouter } from 'next/router'
import { Box, Card, CardHeader, CircularProgress, Divider, Typography } from '@mui/material'
import SupplierPurchaseHistoryTable from 'src/views/tables/supplierPurchaseHistoryTable'
import useSingleSupplier from 'src/@core/hooks/useSingleSupplier'
import { getToken } from 'src/@core/utils/manageToken'

const StyledTypography = ({ children, label, icon = null }) => {
  return (
    <Typography variant='body2' display='flex' alignItems='center' gap={2}>
      {label} : <span style={{ fontWeight: '600' }}>{children}</span> {icon && icon}
    </Typography>
  )
}

const SupplierDetails = () => {
  const {
    query: { supplierId }
  } = useRouter()

  const { access_token } = getToken()

  const { supplierDetails, loading } = useSingleSupplier(supplierId, access_token)

  return (
    <Card>
      <CardHeader title='Supplier Details' />
      <Divider />

      {loading && (
        <Box component='div' height={400} display='flex' justifyContent='center' alignItems='center'>
          <CircularProgress color='primary' />
        </Box>
      )}

      {!loading && (
        <Box component='div' padding={5}>
          <StyledTypography label='Supplier Name'>{supplierDetails?.name}</StyledTypography>
          <StyledTypography label='Phone'>{supplierDetails?.phone}</StyledTypography>
          <StyledTypography label='Email'>{supplierDetails?.email}</StyledTypography>
          <StyledTypography label='Fax'>{supplierDetails?.fax}</StyledTypography>
          <StyledTypography label='Address'>{supplierDetails?.address}</StyledTypography>

          <Box component='div' sx={{ margin: '20px 0' }}>
            <StyledTypography label='Purchase Count'>20</StyledTypography>
            <StyledTypography label='Total Transaction'>¥175000</StyledTypography>
            <StyledTypography label='Total Paid'>¥50000</StyledTypography>
            <StyledTypography label='Total Due'>¥125000</StyledTypography>
          </Box>

          <Box component='div' sx={{ margin: '10px 0' }}>
            <Typography variant='body1' fontSize={18} fontWeight={500}>
              Purchase History
            </Typography>
            <Divider />

            <SupplierPurchaseHistoryTable />

            <Divider />
          </Box>
        </Box>
      )}
    </Card>
  )
}

export default SupplierDetails
