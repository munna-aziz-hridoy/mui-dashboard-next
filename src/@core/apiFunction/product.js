import API_URL from 'src/@core/utils/mainUrl'

// get searched product item
export const getSearchedProduct = async searchValue => {
  const url = `${API_URL}/internal_product/?search=${searchValue}`

  const res = await fetch(url)
  const data = await res.json()

  if (data?.data) {
    return data.data
  } else {
    return []
  }
}

// get all unit choices

export const getUnitChoice = async () => {
  const url = `${API_URL}/common/unit-type-choices/`

  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// get all payment status choices

export const getPaymentChoice = async () => {
  const url = `${API_URL}/common/payment-status-choices/`
  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// tax choices

export const getTaxChoices = async () => {
  const url = `${API_URL}/common/tax-percentage-choices/`
  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// stock status choices

export const getStockStatus = async () => {
  const url = `${API_URL}/common/invoice-stock-choices/`
  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// online product

export const getOnlineProducts = async () => {
  const url = `${API_URL}/online_product/`

  const res = await fetch(url)
  const data = await res.json()

  if (data?.data) {
    return { success: true, data: data?.data }
  } else {
    return { success: false, data: [] }
  }
}

// offline product

export const getOfflineProducts = async () => {
  const url = `${API_URL}/offline_product/`

  const res = await fetch(url)
  const data = await res.json()

  if (data?.data) {
    return { success: true, data: data?.data }
  } else {
    return { success: false, data: [] }
  }
}

// add internal product

export const addInternalProduct = async productData => {
  const url = `${API_URL}/internal_product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
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

export const addOnlineProduct = async productData => {
  const url = `${API_URL}/online_product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
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

export const addOfflineProduct = async productData => {
  const url = `${API_URL}/offline_product/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
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
