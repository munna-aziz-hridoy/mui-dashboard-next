import API_URL from 'src/@core/utils/mainUrl'

export const loginUser = async userData => {
  const url = `${API_URL}/login/`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(userData)
  })

  const data = await res.json()
  console.log(data)
  return data
}
