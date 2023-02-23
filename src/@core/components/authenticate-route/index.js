import React, { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import useAuthStore from 'src/store/authStore'

function Authenticate({ children }) {
  const router = useRouter()

  const { user } = useAuthStore()

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
