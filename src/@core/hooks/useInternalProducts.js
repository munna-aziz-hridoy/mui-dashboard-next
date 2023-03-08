const { useState, useEffect } = require('react')
import { getInternalProducts } from 'src/@core/apiFunction/product'

const useInternalProducts = (token, searchQuery, page) => {
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(false)

  const [totalPages, setTotalPages] = useState(1)
  const [productCount, setProductCount] = useState(0)

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    setLoading(true)
    getInternalProducts(token, searchQuery, page).then(data => {
      console.log(data)
      if (data?.success) {
        setTotalPages(data?.data?.total_pages)
        setProductCount(data?.data?.total_records)
        setProducts(data?.data?.data)
      }
      setLoading(false)
    })
  }, [refetch])

  return { products, productCount, totalPages, loading, refetch: setRefetch }
}

export default useInternalProducts
