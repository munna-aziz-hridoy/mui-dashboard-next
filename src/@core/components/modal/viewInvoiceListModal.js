import React, { useState } from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, Grid, TextField, CardHeader, Button, Typography } from '@mui/material'

// ** Icon imports

import { getToken } from 'src/@core/utils/manageToken'
import TableCustomized from 'src/views/tables/TableCustomized'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const ViewInvoiceModal = ({ open, setOpen }) => {
  const [errorText, setErrorText] = useState('')

  const { access_token } = getToken()

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <CardHeader title='Invoice list' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <TableCustomized />
          </CardContent>
        </Card>
      </Box>
      {/* <Toaster /> */}
    </Modal>
  )
}

export default ViewInvoiceModal
