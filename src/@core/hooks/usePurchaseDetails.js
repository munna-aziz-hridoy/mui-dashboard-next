import { useState, useEffect } from 'react'
import { internalProductPurchaseDetails } from 'src/@core/apiFunction/product'

const usePurchaseDetails = (id, token, page = 1) => {
  const [purchaseHistory, setPurchaseHistory] = useState([])
  const [purchaseHistoryTotalPage, setPurchaseHistoryTotalPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    internalProductPurchaseDetails(id, token, page).then(data => {
      if (data?.purchases) {
        setPurchaseHistory(data?.purchases?.data)
        setPurchaseHistoryTotalPage(data?.purchases?.total_pages)
      }
      setLoading(false)
    })
  }, [id, page, token])

  return { purchaseHistory, purchaseHistoryTotalPage, purchaseHistoryLoading: loading }
}

export default usePurchaseDetails
