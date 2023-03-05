import API_URL from 'src/@core/utils/mainUrl'

export const getSearchedSuplier = async (searchValue, token) => {
  const url = `${API_URL}/supplier/?search=${searchValue}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (data?.data) {
    return data.data
  } else {
    return []
  }
}

export const addSupplier = async (supplierData, token) => {
  const url = `${API_URL}/supplier/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(supplierData)
  })
  const data = await res.json()
  if (data?.id) {
    return { success: true }
  } else return { success: false }
}

export const updateSupplier = async (supplierData, id, token) => {
  const url = `${API_URL}/supplier/${id}`

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(supplierData)
  })
  const data = await res.json()
  if (data?.id) {
    return { success: true, data }
  } else return { success: false, data }
}

export const getSingleSupplier = async (id, token) => {
  const url = `${API_URL}/supplier/${id}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  return data
}
