import API_URL from 'src/@core/utils/mainUrl'

export const uploadOfflineSalesCsv = async formData => {
  const url = `${API_URL}/offline-sell-upload/`

  const data = await uploadCsv(url, formData)
  return data
}

export const uploadOnlineSalesCsv = async formData => {
  const url = `${API_URL}/online-sell-upload/`
  const data = await uploadCsv(url, formData)
  return data
}

export const uploadOfflineProductCsv = async formData => {
  const url = `${API_URL}/offline-product-upload/`
  const data = await uploadCsv(url, formData)
  return data
}

export const uploadOnlineProductCsv = async formData => {
  const url = `${API_URL}/online-product-upload/`
  const data = await uploadCsv(url, formData)
  return data
}

// helper function to upload csv

const uploadCsv = async (url, formData) => {
  const res = await fetch(url, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()

  if (data?.affected_rows) return { success: false, message: data.detail, affected_rows: data?.affected_rows }
  return { success: true, message: data.detail }
}
