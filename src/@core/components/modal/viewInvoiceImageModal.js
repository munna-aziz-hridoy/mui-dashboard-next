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
  width: 700,
  height: 850,
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
        <Card>
          <TransformWrapper>
            <TransformComponent>
              <img src={invoiceImage} width={700} height={850} />
            </TransformComponent>
          </TransformWrapper>
        </Card>
      </Box>
    </Modal>
  )
}

export default ViewInvoiceImageModal
