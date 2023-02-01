import mainUrl from 'src/@core/utils/mainUrl'

export const getSearchedSuplier = async searchValue => {
  const url = `${mainUrl}/supplier/?search=${searchValue}`

  const res = await fetch(url)
  const data = await res.json()

  if (data?.data) {
    return data.data
  } else {
    return []
  }
}
