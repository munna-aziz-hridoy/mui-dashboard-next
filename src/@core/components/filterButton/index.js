import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'

import { BiFilter } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import useFilterOptions from 'src/@core/hooks/useFilterOptions'

const FilterButton = ({
  setIsMapped = false,
  setIsVisible = false,
  setPublished = false,
  setInStock = false,
  setIsSpecialProduct = false,
  isMapped = false,
  isVisible = false,
  isPublished = false,
  isInStock = false,
  isSpecialProduct = false,
  refetch
}) => {
  const [openFilterPromt, setOpenFilterPromt] = useState(false)

  const handleSetFilterOptions = (valueType, setMethod) => {
    if (valueType) {
      setMethod(prev => {
        if (prev === 'true') {
          return ''
        } else {
          return 'true'
        }
      })
    } else {
      setMethod(prev => {
        if (prev === 'false') {
          return ''
        } else {
          return 'false'
        }
      })
    }
  }

  const handleApplyFilter = () => {
    refetch(prev => !prev)
    setOpenFilterPromt(false)
  }

  const handleResetFilter = () => {
    setIsMapped && setIsMapped('')
    setIsVisible && setIsVisible('')
    setPublished && setPublished('')
    setInStock && setInStock('')
    setIsSpecialProduct && setIsSpecialProduct('')
    refetch(prev => !prev)
    setOpenFilterPromt(false)
  }

  return (
    <Box component='div' position='relative'>
      <Button onClick={() => setOpenFilterPromt(prev => !prev)} variant='outlined' color='primary' size='small'>
        Filter By <BiFilter />
      </Button>
      {openFilterPromt && (
        <Box
          component='div'
          position='absolute'
          bgcolor='#fff'
          borderRadius={1}
          boxShadow={1}
          zIndex={999}
          padding={4}
          minWidth={260}
        >
          {setIsMapped && (
            <Box component='div'>
              <Typography variant='body1' fontSize={16} fontWeight={600}>
                Filter By Mapped
              </Typography>
              <Button
                onClick={() => handleSetFilterOptions(true, setIsMapped)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Mapped {isMapped === 'true' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
              <Button
                onClick={() => handleSetFilterOptions(false, setIsMapped)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Unmapped {isMapped === 'false' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
            </Box>
          )}
          {setPublished && (
            <Box component='div'>
              <Typography variant='body1' fontSize={16} fontWeight={600}>
                Filter By Publish
              </Typography>
              <Button
                onClick={() => handleSetFilterOptions(true, setPublished)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Published {isPublished === 'true' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
              <Button
                onClick={() => handleSetFilterOptions(false, setPublished)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Un Published {isPublished === 'false' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
            </Box>
          )}
          {setIsVisible && (
            <Box component='div'>
              <Typography variant='body1' fontSize={16} fontWeight={600}>
                Filter By Visible
              </Typography>
              <Button
                onClick={() => handleSetFilterOptions(true, setIsVisible)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Visible {isVisible === 'true' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
              <Button
                onClick={() => handleSetFilterOptions(false, setIsVisible)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Not Visible {isVisible === 'false' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
            </Box>
          )}
          {setInStock && (
            <Box component='div'>
              <Typography variant='body1' fontSize={16} fontWeight={600}>
                Filter By Stock
              </Typography>
              <Button
                onClick={() => handleSetFilterOptions(true, setInStock)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  In Stock {isInStock === 'true' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
              <Button
                onClick={() => handleSetFilterOptions(false, setInStock)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Out of stock {isInStock === 'false' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
            </Box>
          )}

          {setIsSpecialProduct && (
            <Box component='div'>
              <Typography variant='body1' fontSize={16} fontWeight={600}>
                Is Special Products
              </Typography>
              <Button
                onClick={() => handleSetFilterOptions(true, setIsSpecialProduct)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  Yes {isSpecialProduct === 'true' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
              <Button
                onClick={() => handleSetFilterOptions(false, setIsSpecialProduct)}
                style={{ fontSize: '13px', textTransform: 'capitalize' }}
              >
                <Typography variant='body2' fontSize={13} fontWeight={400} display='flex' alignItems='center' gap={1}>
                  No {isSpecialProduct === 'false' && <BsCheck fontSize={16} color='green' />}
                </Typography>
              </Button>
            </Box>
          )}

          <Box component='div' display='flex' justifyContent='center' alignItems='center' gap={3}>
            <Button
              onClick={handleResetFilter}
              variant='outlined'
              color='error'
              size='small'
              style={{ fontSize: '11px' }}
            >
              Reset Filter
            </Button>
            <Button
              onClick={handleApplyFilter}
              variant='contained'
              color='primary'
              size='small'
              style={{ fontSize: '11px' }}
            >
              Apply Filter
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default FilterButton
