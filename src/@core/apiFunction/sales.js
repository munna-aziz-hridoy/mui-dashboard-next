import API_URL from 'src/@core/utils/mainUrl'

export const uploadOfflineSalesCsv = async formData => {
  const url = `${API_URL}/offline-sell-upload/`

  const res = await fetch(url, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()

  console.log(data)
}
