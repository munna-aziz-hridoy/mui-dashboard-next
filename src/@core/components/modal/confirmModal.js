import React from 'react'

// ** MUI imports
import { Box, Modal, Typography, Card, CardContent, Button } from '@mui/material'

// ** Icon imports

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const ConfirmModal = ({ open, setOpen, setConfirm, cancel }) => {
  return (
    <Modal
      keepMounted
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='keep-mounted-modal-title'
      aria-describedby='keep-mounted-modal-description'
    >
      <Box sx={style}>
        <Card>
          <Typography
            variant='body1'
            fontSize={18}
            fontWeight={500}
            textAlign='center'
            marginTop={1}
            marginBottom={2}
            color='error'
          >
            Are you sure you want to upload this invoice?
          </Typography>
          <CardContent>
            <Typography variant='body2'>Invoice Amount: 100</Typography>
            <Typography variant='body2'>Total Item: 100</Typography>
            <Typography variant='body2'>Payment Status: Paid</Typography>
          </CardContent>

          <Box
            component='div'
            marginTop={1}
            marginBottom={2}
            display='flex'
            justifyContent='center'
            alignItems='center'
            gap={2}
          >
            <Button onClick={() => setConfirm(true)} variant='outlined' size='small'>
              Confirm
            </Button>
            <Button
              onClick={() => {
                setOpen(false)
                cancel()
              }}
              variant='outlined'
              size='small'
              color='error'
            >
              Cancel
            </Button>
          </Box>
        </Card>
      </Box>
    </Modal>
  )
}

export default ConfirmModal
