import API_URL from 'src/@core/utils/mainUrl'

// get all unit choices

export const getUnitChoice = async token => {
  const url = `${API_URL}/common/unit-type-choices/`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// get all payment status choices

export const getPaymentChoice = async token => {
  const url = `${API_URL}/common/payment-status-choices/`
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// tax choices

export const getTaxChoices = async token => {
  const url = `${API_URL}/common/tax-percentage-choices/`
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// stock status choices

export const getStockStatus = async token => {
  const url = `${API_URL}/common/invoice-stock-choices/`
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// invoice status choices

export const getInvoiceStatusChoices = async token => {
  const url = `${API_URL}/common/invoice-type-choices/`
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()
  if (data) {
    return data
  } else {
    return []
  }
}

// get internal product item
export const getInternalProducts = async (token, searchValue = '', page = 1) => {
  const url = `${API_URL}/internal-product/?search=${searchValue}&page=${page}`

  const res = await fetch(url, {
    headers: { authorization: `Bearer ${token}` }
  })

  const data = await res.json()

  console.log(data)

  if (data?.data) {
    return { data: data, success: true }
  } else {
    return { data: [], total_pages: 1 }
  }
}

// online product

export const getOnlineProducts = async (
  token,
  searchQuery = '',
  page = 1,
  isMapped = '',
  isPublished = '',
  isInStock = '',
  isVisible = ''
) => {
  const url = `${API_URL}/online-product/?search=${searchQuery}&page=${page}&is_mapped=${isMapped}&is_published=${isPublished}&is_in_stock=${isInStock}&is_visible=${isVisible}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  if (res.status !== 200) return { success: false, data: [] }
  const data = await res.json()

  if (data?.total_records >= 0) {
    return { success: true, data }
  } else {
    return { success: false, data: null }
  }
}

// offline product

export const getOfflineProducts = async (token, searchQuery = '', page = 1, isMapped = '', isSpecialProduct = '') => {
  const url = `${API_URL}/offline-product/?search=${searchQuery}&page=${page}&is_mapped=${isMapped}&is_special_product=${isSpecialProduct}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  if (res.status !== 200) return { success: false, data: [] }
  const data = await res.json()

  console.log(data)

  if (data?.total_records >= 0) {
    return { success: true, data }
  } else {
    return { success: false, data: null }
  }
}

// get internal product by id

export const getInternalProductById = async (id, token) => {
  const url = `${API_URL}/internal-product/${id}/`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (data?.id) {
    return data
  } else {
    return null
  }
}

// add internal product

export const addInternalProduct = async (productData, token) => {
  const url = `${API_URL}/internal-product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
  const data = await res.json()

  return { data, response: res }
}

// update internal product

export const updateInternalProduct = async (productData, token, id) => {
  const url = `${API_URL}/internal-product/${id}`

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
  const data = await res.json()

  if (data?.product_name) {
    return { success: true, data }
  } else {
    return {
      success: false
    }
  }
}

// add online product

export const addOnlineProduct = async (productData, token) => {
  const url = `${API_URL}/online-product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
  const data = await res.json()

  return { responseData: data, response: res }
}

// add offline product

export const addOfflineProduct = async (productData, token) => {
  const url = `${API_URL}/offline-product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
  const data = await res.json()

  return { responseData: data, response: res }
}

export const internalProductPurchaseDetails = async (id, token, page) => {
  const url = `${API_URL}/internal-product/${id}/purchase_detail/?page=${page}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  return data
}

export const internalProductSellDetails = async (id, token, page) => {
  const url = `${API_URL}/internal-product/${id}/offline_sell_detail/?page=${page}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json(data)

  return data
}
