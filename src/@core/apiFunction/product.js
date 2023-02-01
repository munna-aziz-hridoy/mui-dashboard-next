import mainUrl from 'src/@core/utils/mainUrl'

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
