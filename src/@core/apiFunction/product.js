import API_URL from 'src/@core/utils/mainUrl'

// get searched product item
export const getSearchedProduct = async (searchValue, page, token) => {
  const url = `${API_URL}/internal_product/?search=${searchValue}&page=${page + 1}`

  const res = await fetch(url, {
    headers: { authorization: `Bearer ${token}` }
  })
  const data = await res.json()

  if (data?.data) {
    return { data: data.data, total_pages: data?.total_pages }
  } else {
    return { data: [], total_pages: 1 }
  }
}

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

// online product

export const getOnlineProducts = async (page, token) => {
  const url = page > 1 ? `${API_URL}/online_product/?page=${page}` : `${API_URL}/online_product/`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  if (res.status !== 200) return { success: false, data: [] }
  const data = await res.json()

  if (data?.data) {
    return { success: true, data: data?.data, total_pages: data?.total_pages }
  } else {
    return { success: false, data: [] }
  }
}

// offline product

export const getOfflineProducts = async (page, token) => {
  const url = page > 1 ? `${API_URL}/offline_product/?page=${page}` : `${API_URL}/offline_product/`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  if (res.status !== 200) return { success: false, data: [] }
  const data = await res.json()

  if (data?.data) {
    return { success: true, data: data?.data, total_pages: data?.total_pages }
  } else {
    return { success: false, data: [] }
  }
}

// add internal product

export const addInternalProduct = async (productData, token) => {
  const url = `${API_URL}/internal_product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
  const data = await res.json()

  if (data?.product_name) {
    return { success: true }
  } else {
    return {
      success: false
    }
  }
}

// add online product

export const addOnlineProduct = async (productData, token) => {
  const url = `${API_URL}/online_product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
  const data = await res.json()

  if (data?.product_name) {
    return { success: true }
  } else {
    return {
      success: false
    }
  }
}

// add offline product

export const addOfflineProduct = async (productData, token) => {
  const url = `${API_URL}/offline_product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
  const data = await res.json()

  if (data?.product_name) {
    return { success: true }
  } else {
    return {
      success: false
    }
  }
}

export const internalProductDetailsInfo = async (id, token) => {
  const url = `${API_URL}/internal_product/${id}/purchase_detail/`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  console.log(res)

  const data = await res.json()
  console.log(data)
}
