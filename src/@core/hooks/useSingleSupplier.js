const { useState, useEffect } = require('react')
const { getSingleSupplier } = require('../apiFunction/suplier')

const useSingleSupplier = (id, token) => {
  const [supplierDetails, setSupplierDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSingleSupplier(id, token).then(data => {
      if (data?.id) {
        setSupplierDetails(data)
      }
      setLoading(false)
    })
  }, [id, refetch])

  return { supplierDetails, loading, refetch: setRefetch }
}

export default useSingleSupplier
