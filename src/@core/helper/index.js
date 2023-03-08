import { internalProductPurchaseDetails, internalProductSellDetails } from '../apiFunction/product'

export const handleSetPurchaseHistory = (id, page, token, setHistory, setPageCount, setLoading) => {
  setLoading(true)

  internalProductPurchaseDetails(id, token, page).then(data => {
    if (data?.purchases) {
      setHistory(data?.purchases?.data)
      setPageCount(data?.purchases?.total_pages)
    }
    setLoading(false)
  })
}

export const handleSetSellHistory = (id, page, token, setHistory, setPageCount, setLoading) => {
  setLoading(true)
  internalProductSellDetails(id, token, page).then(data => {
    if (data?.sell) {
      setHistory(data?.sell?.data)
      setPageCount(data?.sell?.total_pages)
    }
    setLoading(false)
  })
}
