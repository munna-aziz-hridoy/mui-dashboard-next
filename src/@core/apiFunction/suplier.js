import API_URL from 'src/@core/utils/mainUrl'
import { getToken } from '../utils/manageToken'

const token = getToken()

export const getSearchedSuplier = async searchValue => {
  const url = `${API_URL}/supplier/?search=${searchValue}`

  const res = await fetch(url, {
    authorization: `Bearer ${token.access_token}`
  })
  const data = await res.json()

  if (data?.data) {
    return data.data
  } else {
    return []
  }
}

export const addSupplier = async supplierData => {
  const url = `${API_URL}/supplier/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token.access_token}`
    },
    body: JSON.stringify(supplierData)
  })
  const data = await res.json()
  if (data?.id) {
    return { success: true }
  } else return { success: false }
}
