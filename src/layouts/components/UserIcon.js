const UserIcon = props => {
  // ** Props
  const { icon, iconProps, isActive } = props
  const IconTag = icon
  let styles

  /* styles = {
      color: 'red',
      fontSize: '2rem'
    } */
  // @ts-ignore
  return <IconTag {...iconProps} style={{ color: isActive ? '#fff' : '#100720' }} />
}

export default UserIcon
