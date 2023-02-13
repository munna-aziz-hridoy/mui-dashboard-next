import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'

import { IoMdArrowDropdown } from 'react-icons/io'
import { AiFillEye, AiFillPlusSquare } from 'react-icons/ai'

import { BiMoney } from 'react-icons/bi'

const ActionButton = ({ viewInvoiceModal, viewPaymentModal, paymentStatus, openPaymentModal }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant='outlined'
      >
        Action
        <IoMdArrowDropdown />
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose()
            viewInvoiceModal(true)
          }}
        >
          <AiFillEye fontSize={18} style={{ marginRight: '8px' }} color='#100720' />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            viewPaymentModal(true)
            handleClose()
          }}
        >
          <BiMoney fontSize={18} style={{ marginRight: '8px' }} color='#100720' /> View Payment
        </MenuItem>
        {paymentStatus !== 'Paid' && (
          <MenuItem
            onClick={() => {
              handleClose()
              openPaymentModal(true)
            }}
          >
            <AiFillPlusSquare fontSize={18} style={{ marginRight: '8px' }} color='#100720' /> Add Payment
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}

export default ActionButton
