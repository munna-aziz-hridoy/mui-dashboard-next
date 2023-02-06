import mainUrl from 'src/@core/utils/mainUrl'

export const postInvoice = async postData => {
  const url = `${mainUrl}/invoice/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  const data = await res.json()

  if (data?.timestamp) {
    return { success: true }
  } else {
    return { success: false }
  }
}

export const getAllInvoiceList = async () => {
  const url = `${mainUrl}/invoice/`
  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

export const postPayment = async postData => {
  const url = `${mainUrl}/payment/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })

  const data = await res.json()

  if (data?.amount) {
    return { success: true }
  } else {
    return { success: false }
  }
}
