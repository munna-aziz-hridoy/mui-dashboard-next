import React, { useState } from 'react'
import { getSearchedSuplier } from 'src/@core/apiFunction/suplier'

// ** MUI import

import { Grid, TextField, Box, List, ListItem, CircularProgress, Typography } from '@mui/material'

const listStyle = {
  background: '#c140f5',
  position: 'absolute',
  width: '98%',
  padding: '1rem',
  zIndex: '5'
}

const SelectSuplierSearch = ({}) => {
  const [openSuplierList, setOpenSuplierList] = useState(false)
  const [suplierLoading, setSuplierLoading] = useState(false)

  const [searchedSuplier, setSearchedSuplier] = useState([])

  const [suplierName, setSuplierName] = useState('')

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

  return (
    <Grid item xs={12} sm={4} style={{ position: 'relative' }}>
      <TextField
        onClick={() => {
          setOpenSuplierList(prev => !prev)
          setSuplierLoading(true)
          getSearchedSuplier('').then(data => {
            setSearchedSuplier(data)
            setSuplierLoading(false)
          })
        }}
        onChange={handleSearchSuplier}
        fullWidth
        label='Search Suplier'
        placeholder='Search Suplier'
        value={suplierName}
      />

      <Box
        style={{ ...listStyle, display: openSuplierList ? 'block' : 'none', width: '92%' }}
        borderRadius={1}
        boxShadow={5}
      >
        <List>
          {suplierLoading ? (
            <ListItem>
              <CircularProgress color='inherit' style={{ margin: '0 auto' }} />
            </ListItem>
          ) : (
            searchedSuplier?.map(item => (
              <ListItem
                key={item?.id}
                onClick={() => {
                  setPurchaseData(prev => {
                    return {
                      ...prev,
                      suplier: item?.id
                    }
                  })
                  setSuplierName(item?.name)
                  setOpenSuplierList(false)
                }}
                color='#fff'
                style={{ cursor: 'pointer' }}
              >
                <Typography color='#fff' variant='body1'>
                  {item.name}
                </Typography>
              </ListItem>
            ))
          )}
        </List>
      </Box>
    </Grid>
  )
}

export default SelectSuplierSearch
