export const saveToken = (accessToken, refreshToken) => {
  const tokens = {
    access_token: accessToken,
    refresh_token: refreshToken
  }
  localStorage.setItem('pims-credentials-token', JSON.stringify(tokens))
}

export const getToken = () => {
  const tokenString = window.localStorage.getItem('pims-credentials-token')

  if (tokenString) {
    const tokens = JSON.parse(tokenString)
    return { success: true, ...tokens }
  } else {
    return { success: false }
  }
}

export const removeToken = () => {
  localStorage.removeItem('pims-credentials-token')
}
