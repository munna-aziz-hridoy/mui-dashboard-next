import API_URL from 'src/@core/utils/mainUrl'

export const uploadOfflineSalesCsv = async (formData, token) => {
  const url = `${API_URL}/offline-sell-upload/`
  // const url = 'https://pims.goldlavender.jp/offline-sell-upload/'

  const data = await uploadCsv(url, formData, token)

  return data
}

export const uploadOnlineSalesCsv = async (formData, token) => {
  const url = `${API_URL}/online-sell-upload/`
  const data = await uploadCsv(url, formData, token)
  return data
}

export const uploadOfflineProductCsv = async (formData, token) => {
  const url = `${API_URL}/offline-product-upload/`
  const data = await uploadCsv(url, formData, token)
  return data
}

export const uploadOnlineProductCsv = async (formData, token) => {
  const url = `${API_URL}/online-product-upload/`
  const data = await uploadCsv(url, formData, token)
  return data
}

export const uploadInternalProductCsv = async (formData, token) => {
  const url = `${API_URL}/internal-product-upload/`
  const data = await uploadCsv(url, formData, token)
  return data
}

// helper function to upload csv

const uploadCsv = async (url, formData, token) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`
    },
    body: formData
  })

  const data = await res.json()

  return { response: res, responseData: data }
}
