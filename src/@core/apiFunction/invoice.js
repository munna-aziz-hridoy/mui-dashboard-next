import API_URL from 'src/@core/utils/mainUrl'

export const postInvoice = async (postData, token) => {
  const url = `${API_URL}/invoice/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
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

export const getAllInvoiceList = async (
  searchText,
  dateRangePurchase,
  dateRangeCreated,
  supplier,
  paymentStatus,
  token
) => {
  const dateRangeFormatedPurchase =
    dateRangePurchase[0] && dateRangePurchase[1]
      ? `${dateRangePurchase[0].split(' ')[0]},${dateRangePurchase[1].split(' ')[0]}`
      : ''

  const dateRangeFormatedCreated =
    dateRangeCreated[0] && dateRangeCreated[1]
      ? `${dateRangeCreated[0].split(' ')[0]},${dateRangeCreated[1].split(' ')[0]}`
      : ''

  const url = `${API_URL}/invoice/?search=${searchText || supplier || ''}${
    dateRangeFormatedPurchase && `&invoice_date__date__range=${dateRangeFormatedPurchase}`
  }&payment_status=${paymentStatus || ''}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (data?.total_records) {
    return data?.data
  } else {
    return []
  }
}

export const getSingleInvoiceDetails = async (id, token) => {
  const url = `${API_URL}/invoice/${id}/`
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (data?.id) {
    return data
  } else {
    return null
  }
}

export const postPayment = async (postData, token) => {
  const url = `${API_URL}/payment/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`
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

export const getInvoicePaymentDetails = async (invoiceId, token) => {
  const url = `${API_URL}/invoice/${invoiceId}/payment_detail/`

  const res = await fetch(url, {
    headers: { authorization: `Bearer ${token}` }
  })
  const data = await res.json()

  if (data?.payments) {
    return { success: true, data: data?.payments }
  } else {
    return { success: false }
  }
}

export const getAllPayment = async token => {
  const url = `${API_URL}/payment/`
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const data = await res.json()

  if (data?.length) {
    return data
  } else {
    return []
  }
}

export const uploadInvoiceImage = async (formData, token) => {
  const url = `${API_URL}/upload-image/`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`
    },
    body: formData
  })
  const data = await res.json()

  if (data?.id) {
    return { success: true, ...data }
  } else {
    return { success: false, image_url: '' }
  }
}

export const purchaseOverview = async (createdDateRange, invoiceDateRange, token, pageProduct, pageSup) => {
  const formatedCreatedDate =
    createdDateRange[0] && createdDateRange[1]
      ? `${createdDateRange[0].split(' ')[0]},${createdDateRange[1].split(' ')[0]}`
      : ''

  const formatedInvoiceDate =
    invoiceDateRange[0] && invoiceDateRange[1]
      ? `${invoiceDateRange[0].split(' ')[0]},${invoiceDateRange[1].split(' ')[0]}`
      : ''

  const url = `${API_URL}/purchase-overview/?${formatedCreatedDate && `created_date_range=${formatedCreatedDate}`}${
    formatedInvoiceDate && `&invoice_date_range=${formatedInvoiceDate}`
  }&page_product=${pageProduct}&page_sup=${pageSup}`

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()
  return data
}
