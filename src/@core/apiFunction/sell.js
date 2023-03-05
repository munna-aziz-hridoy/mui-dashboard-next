import API_URL from 'src/@core/utils/mainUrl'

export const getOfflineSells = async (page = 1, token) => {
  const url = `${API_URL}/offline-sell/?page=${page}`
  const data = await getData(url, token)
  return data
}

export const getOfflineSellByBarcode = async (barcode, token) => {
  const url = `${API_URL}/offline-sell/?barcode=${barcode}`
  const data = await getData(url, token)
  return data
}

export const getOnlineSells = async (page, token) => {
  const url = `${API_URL}/online-sell/?page=${page}`
  const data = await getData(url, token)
  return data
}

export const getOnlineSellById = async (id, token) => {
  const url = `${API_URL}/online-sell/?product_id=${id}`
  const data = await getData(url, token)
  return data
}

// helper function

const getData = async (url, token) => {
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  return data
}
