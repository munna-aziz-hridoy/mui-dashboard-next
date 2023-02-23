import React, { useEffect, useRef, useState } from 'react'
import { getOnlineProducts } from 'src/@core/apiFunction/product'
import { getToken } from 'src/@core/utils/manageToken'

const Test = () => {
  const bottomBoundaryRef = useRef(null)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  const { access_token } = getToken()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage(prev => prev + 1)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      }
    )

    if (bottomBoundaryRef.current) {
      observer.observe(bottomBoundaryRef.current)
    }

    return () => {
      if (bottomBoundaryRef.current) {
        observer.unobserve(bottomBoundaryRef.current)
      }
    }
  }, [])

  useEffect(() => {
    getOnlineProducts(page, access_token).then(data => {
      if (data.success) {
        setData(prev => [...prev, ...data.data])
      }
    })
  }, [page])

  return (
    <div>
      {data?.map((item, i) => (
        <p key={i}> Item - {i}</p>
      ))}

      <div ref={bottomBoundaryRef} />
    </div>
  )
}

export default Test
