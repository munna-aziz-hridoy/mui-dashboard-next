import React from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, CardHeader } from '@mui/material'

// ** Icon imports

import AddSuplierForm from '../forms/addSuplierForm'

const style = {
  position: 'absolute',
  top: '50%',
  left: '30%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const AddSuplier = ({ open, setOpen }) => {
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
          <CardHeader title='Add Suplier' titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <AddSuplierForm refetch={setOpen} />
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default AddSuplier
