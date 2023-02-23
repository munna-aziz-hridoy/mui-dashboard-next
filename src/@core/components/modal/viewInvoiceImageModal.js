import React from 'react'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

// ** MUI imports
import { Box, Modal, Card } from '@mui/material'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 850,
  maxWidth: 550,
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
      <Box sx={style}>
        <Card style={{ cursor: 'zoom-in' }}>
          <TransformWrapper>
            <TransformComponent>
              <img src={invoiceImage} style={{ width: '100%' }} />
            </TransformComponent>
          </TransformWrapper>
        </Card>
      </Box>
    </Modal>
  )
}

export default ViewInvoiceImageModal
