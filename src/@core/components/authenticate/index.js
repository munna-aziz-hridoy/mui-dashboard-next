import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

function Authenticate({ children }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(true)

  useEffect(() => {
    if (!authorized) {
      router.push('/login')
      return null
    }
  }, [])

  if (router.asPath.includes('login')) {
    return children
  }

  return authorized && children
}

export default Authenticate
