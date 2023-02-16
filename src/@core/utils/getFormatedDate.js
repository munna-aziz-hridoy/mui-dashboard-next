const formatedDate = date => {
  const dateArr = date.toString().split(' ')
  const time = `${dateArr[4].split(':')[0]}:${dateArr[4].split(':')[1]}`
  const timestamp = `${dateArr[3]}-${date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${
    dateArr[2]
  } ${time}`

  return timestamp
}

export default formatedDate
