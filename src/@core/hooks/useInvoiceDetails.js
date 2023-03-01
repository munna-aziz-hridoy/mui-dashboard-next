const { useState, useEffect } = require('react')
const { getSingleInvoiceDetails } = require('../apiFunction/invoice')

const useInvoiceDetails = (id, token) => {
  const [invoiceData, setInvoiceData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSingleInvoiceDetails(id, token).then(data => {
      if (data?.id) {
        setInvoiceData(data)
      }
      setLoading(false)
    })
  }, [id])

  return { invoiceData, loading }
}

export default useInvoiceDetails
