const { useState, useEffect } = require('react')
const { getSingleSupplier } = require('../apiFunction/suplier')

const useSingleSupplier = (id, token) => {
  const [supplierDetails, setSupplierDetails] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSingleSupplier(id, token).then(data => {
      if (data?.id) {
        setSupplierDetails(data)
      }
      setLoading(false)
    })
  }, [id])

  return { supplierDetails, loading }
}

export default useSingleSupplier
