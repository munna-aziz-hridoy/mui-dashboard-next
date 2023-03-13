import React, { useEffect, useState } from 'react'

// ** MUI imports
import { Box, Modal, Card, CardContent, Grid, CardHeader, Typography } from '@mui/material'

import { getUnitChoice } from 'src/@core/apiFunction/product'
import { getToken } from 'src/@core/utils/manageToken'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '6px',
  border: 'none',
  outline: 'none'
}

const EditProduct = ({ open, setOpen, productData, setProducts }) => {
  const { product, product_name, product_unit } = productData
  const [units, setUnits] = useState([])

  const { access_token } = getToken()

  useEffect(() => {
    getUnitChoice(access_token).then(data => setUnits(data))
  }, [])

  const handleSetProductProperty = (property, e, isNumber) => {
    setProducts(prev => {
      const exists = prev.find(item => item.product === product)
      const restItem = prev.filter(item => item.product !== product)
      exists[property] = isNumber ? parseFloat(e.target.value) : e.target.value
      return [...restItem, exists]
    })
  }

  return (
    <Modal id={product} open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Card>
          <CardHeader title={product_name} titleTypographyProps={{ variant: 'h6' }} />
          <CardContent>
            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={3}>
                <Grid item xs={6} marginBottom={5}>
                  <Typography variant='body2' fontSize={14}>
                    Online Name:{' '}
                    <span style={{ fontWeight: 600, fontSize: 16 }}>
                      {productData.online_name.length > 0 &&
                        productData.online_name?.reduce((prev, next) => prev + next)}
                    </span>
                  </Typography>
                </Grid>
                <Grid marginBottom={5} item xs={6}>
                  <Typography variant='body2' fontSize={14}>
                    Offline Name:{' '}
                    <span style={{ fontWeight: 600, fontSize: 16 }}>
                      {productData?.offline_name.length > 0 &&
                        productData.offline_name?.reduce((prev, next) => prev + next)}
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  )
}

export default EditProduct
