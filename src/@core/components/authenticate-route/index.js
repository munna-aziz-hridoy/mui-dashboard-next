import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import useAuthStore from 'src/store/authStore'
import { getToken } from 'src/@core/utils/manageToken'

function Authenticate({ children }) {
  const router = useRouter()

  const { user } = useAuthStore()

  console.log('authenticate route')

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return null
    }
  }, [])

  if (router.asPath.includes('login')) {
    return children
  }

  return user && children
}

export default Authenticate
