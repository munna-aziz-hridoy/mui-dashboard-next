import { useState, useEffect } from 'react'
import { internalProductSellDetails } from 'src/@core/apiFunction/product'

const useSellDetails = (id, token, page = 1) => {
  const [sellHistory, setSellHistory] = useState([])
  const [sellHistoryTotalPage, setSellHistoryTotalPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    internalProductSellDetails(id, token, page).then(data => {
      if (data?.purchases) {
        setSellHistory(data?.purchases?.data)
        setSellHistoryTotalPage(data?.purchases?.total_pages)
      }
      setLoading(false)
    })
  }, [id, page, token])

  return { sellHistory, sellHistoryTotalPage, sellHistoryLoading: loading }
}

export default useSellDetails
