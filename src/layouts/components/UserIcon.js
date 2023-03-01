const UserIcon = ({ icon, iconProps, isActive }) => {
  // ** Props

  const IconTag = icon

  return <IconTag {...iconProps} style={{ color: isActive ? '#fff' : '#100720' }} />
}

export default UserIcon
