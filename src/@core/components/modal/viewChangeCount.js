import React from 'react'

// ** MUI imports
import { Box, Modal, Typography, Card, CardContent, Button } from '@mui/material'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const ViewChangeCountModal = ({ open, setOpen, totalUpdate, totalCreated }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='keep-mounted-modal-title'
      aria-describedby='keep-mounted-modal-description'
    >
      <Box sx={style}>
        <Typography variant='body1' fontSize={20} fontWeight={600} color='success' mt={1} mb={3}>
          Data saved successfully
        </Typography>
        <Typography variant='body2' fontSize={16} fontWeight={500}>
          Total Updated: {totalUpdate}
        </Typography>
        <Typography variant='body2' fontSize={16} fontWeight={500}>
          Total Created: {totalCreated}
        </Typography>
        <Button style={{ margin: '10px 0' }} onClick={() => setOpen(false)} variant='contained' size='small'>
          OK
        </Button>
      </Box>
    </Modal>
  )
}

export default ViewChangeCountModal
