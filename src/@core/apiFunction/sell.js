import API_URL from 'src/@core/utils/mainUrl'

export const getOfflineSells = async (searchQuery = '', page = 1, token, dateArray, isMapped) => {
  console.log(dateArray)
  const url = `${API_URL}/offline-sell/?search=${searchQuery}&is_mapped=${isMapped}&page=${page}${
    dateArray[1] && `&created_at__date__range=${dateArray[0].split(' ')[0]},${dateArray[1].split(' ')[0]}`
  }`

  const data = await getData(url, token)

  return data
}

export const getOfflineSellByBarcode = async (barcode, token) => {
  const url = `${API_URL}/offline-sell/?barcode=${barcode}`
  const data = await getData(url, token)
  return data
}

export const getOnlineSells = async (searchQuery = '', page, token, dateArray, isMapped) => {
  const url = `${API_URL}/online-sell/?search=${searchQuery}&is_mapped=${isMapped}&page=${page}${
    dateArray[1] && `&created_at__date__range=${dateArray[0].split(' ')[0]},${dateArray[1].split(' ')[0]}`
  }`
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

  return { response: res, responseData: data }
}
