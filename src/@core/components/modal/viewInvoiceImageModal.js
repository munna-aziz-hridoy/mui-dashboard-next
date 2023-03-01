import React from 'react'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

// ** MUI imports
import { Box, Modal, Card, Typography } from '@mui/material'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 850,
  maxWidth: 550,
  minWidth: 500,
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none',
  overflowY: 'scroll'
}

const ViewInvoiceImageModal = ({ open, setOpen, invoiceImage }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box component='div' sx={style}>
        {invoiceImage ? (
          <Card style={{ cursor: 'zoom-in' }}>
            <TransformWrapper>
              <TransformComponent>
                <img src={invoiceImage} style={{ width: '100%' }} />
              </TransformComponent>
            </TransformWrapper>
          </Card>
        ) : (
          <Box
            component='div'
            style={{ width: '100%', height: '100%' }}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <Typography variant='body2' fontWeight={500}>
              No Preview Available
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  )
}

export default ViewInvoiceImageModal
