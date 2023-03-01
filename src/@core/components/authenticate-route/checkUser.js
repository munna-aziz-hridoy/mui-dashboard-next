import React, { useEffect } from 'react'
import { checkUser } from 'src/@core/apiFunction/authentication'

import useAuthStore from 'src/store/authStore'

const CheckUserRoute = ({ children }) => {
  const { removeUser, addUser, auth_token } = useAuthStore()

  if (!auth_token) {
    removeUser()
    return children
  }

  useEffect(() => {
    if (auth_token) {
      checkUser(`${auth_token.access_token}`).then(data => addUser(data))
    }
  }, [])

  return children
}

export default CheckUserRoute
