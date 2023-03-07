import { useEffect, useState } from 'react'
import { getOfflineProducts } from 'src/@core/apiFunction/product'

const useOfflineProducts = (token, searchQuery, page, isMapped, isSpecialProduct) => {
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [mappedCount, setMappedCount] = useState(0)
  const [unMappedCount, setUnMappedCount] = useState(0)
  const [productCount, setProductCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    setLoading(true)

    getOfflineProducts(token, searchQuery, page, isMapped, isSpecialProduct).then(data => {
      const { success } = data

      if (success) {
        const {
          data: {
            total_pages,

            data: { total_products, total_mapped_count, total_unmapped_count, results }
          }
        } = data

        console.log(results)

        setProducts(results)
        setTotalPages(total_pages)
        setMappedCount(total_mapped_count)
        setUnMappedCount(total_unmapped_count)
        setProductCount(total_products)
      }
      setLoading(false)
    })
  }, [refetch])

  return { products, totalPages, mappedCount, unMappedCount, productCount, loading, refetch: setRefetch }
}

export default useOfflineProducts
