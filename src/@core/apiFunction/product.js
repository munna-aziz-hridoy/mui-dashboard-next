import mainUrl from 'src/@core/utils/mainUrl'

// get searched product item
export const getSearchedProduct = async searchValue => {
  const url = `${mainUrl}/internal_product/?search=${searchValue}`

  const res = await fetch(url)
  const data = await res.json()

  if (data?.data) {
    return data.data
  } else {
    return []
  }
}

// get all unit choices

export const getUnitChoice = async () => {
  const url = `${mainUrl}/common/unit-type-choices/`

  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

// get all payment status choices

export const getPaymentChoice = async () => {
  const url = `${mainUrl}/common/payment-status-choices/`
  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}

export const getTaxChoices = async () => {
  const url = `${mainUrl}/common/tax-percentage-choices/`
  const res = await fetch(url)
  const data = await res.json()

  if (data) {
    return data
  } else {
    return []
  }
}
