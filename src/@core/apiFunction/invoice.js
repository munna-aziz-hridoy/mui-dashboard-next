import API_URL from 'src/@core/utils/mainUrl'

export const postInvoice = async postData => {
  const url = `${API_URL}/invoice/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  const data = await res.json()

  if (data?.invoice_date) {
    return { success: true }
  } else {
    return { success: false }
  }
}

export const getAllInvoiceList = async () => {
  const url = `${API_URL}/invoice/`
  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data?.data
  } else {
    return []
  }
}

export const postPayment = async postData => {
  const url = `${API_URL}/payment/`

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

export const getInvoicePaymentDetails = async invoiceId => {
  const url = `${API_URL}/invoice/${invoiceId}/payment_detail/`

  const res = await fetch(url)
  const data = await res.json()

  if (data?.payments) {
    return { success: true, data: data?.payments }
  } else {
    return { success: false }
  }
}

export const getAllPayment = async () => {
  const url = `${API_URL}/payment/`
  const res = await fetch(url)
  const data = await res.json()

  if (data?.length) {
    return data
  } else {
    return []
  }
}

export const uploadInvoiceImage = async formData => {
  const url = `${API_URL}/upload-image/`
  const res = await fetch(url, {
    method: 'POST',
    body: formData
  })
  const data = await res.json()

  if (data?.id) {
    return { success: true, ...data }
  } else {
    return { success: false, image_url: '' }
  }
}
