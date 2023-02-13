import React, { useEffect, useState } from 'react'
import { getSearchedSuplier } from 'src/@core/apiFunction/suplier'
import AddSuplier from 'src/@core/components/modal/addSuplierModal'

// ** MUI import

import { Grid, TextField, Box, List, ListItem, CircularProgress, Typography, Button } from '@mui/material'

const FormSuplierSelect = ({ setPurchaseData, clearForm }) => {
  const [openSuplierModal, setOpenSuplierModal] = useState(false)
  const [openSuplierList, setOpenSuplierList] = useState(false)
  const [suplierLoading, setSuplierLoading] = useState(false)

  const [searchedSuplier, setSearchedSuplier] = useState([])

  const [suplierName, setSuplierName] = useState('')

  useEffect(() => {
    setSuplierName('')
  }, [clearForm])

  const handleSearchSuplier = e => {
    const searchText = e.target.value
    setSuplierName(searchText)
    if (searchText !== '') {
      setSuplierLoading(true)
      setOpenSuplierList(true)
      getSearchedSuplier(searchText).then(data => {
        setSearchedSuplier(data)
        setSuplierLoading(false)
      })
    } else {
      setOpenSuplierList(false)
    }
  }

  const handleInputClick = () => {
    setOpenSuplierList(prev => !prev)
    setSuplierLoading(true)
    getSearchedSuplier('').then(data => {
      setSearchedSuplier(data)
      setSuplierLoading(false)
    })
  }

  const handleSetPurchaseData = item => {
    setPurchaseData(prev => {
      return {
        ...prev,
        suplier: item?.id
      }
    })
    setSuplierName(item?.name)
    setOpenSuplierList(false)
  }

  return (
    <Grid item xs={12} sm={6} style={{ position: 'relative' }}>
      <TextField
        onClick={handleInputClick}
        onChange={handleSearchSuplier}
        fullWidth
        label='Search Suplier'
        placeholder='Search Suplier'
        value={suplierName}
        required
      />

      {/* {!suplierName && (
        <Typography variant='body2' color='error' fontSize={12}>
          Please Add a supplier
        </Typography>
      )} */}

      <Box
        style={{ display: openSuplierList ? 'block' : 'none', width: '92%' }}
        borderRadius={1}
        boxShadow={5}
        bgcolor='#100720'
        position='absolute'
        width='98%'
        zIndex={5}
        padding='1rem'
      >
        <List>
          {suplierLoading ? (
            <ListItem>
              <CircularProgress color='inherit' style={{ margin: '0 auto' }} />
            </ListItem>
          ) : searchedSuplier?.length !== 0 ? (
            searchedSuplier?.map(item => (
              <ListItem
                key={item?.id}
                onClick={() => handleSetPurchaseData(item)}
                color='#fff'
                style={{ cursor: 'pointer' }}
              >
                <Typography color='#fff' variant='body1'>
                  {item.name}
                </Typography>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Button
                onClick={() => setOpenSuplierModal(true)}
                fullWidth
                variant='outlined'
                style={{ borderColor: '#fff', color: '#fff' }}
              >
                Add Suplier
              </Button>
            </ListItem>
          )}
        </List>
      </Box>
      <AddSuplier open={openSuplierModal} setOpen={setOpenSuplierModal} />
    </Grid>
  )
}

export default FormSuplierSelect
