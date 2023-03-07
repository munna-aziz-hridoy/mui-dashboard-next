import { useState } from 'react'

const useFilterOptions = () => {
  const [isMapped, setIsMapped] = useState('')
  const [isPublished, setIsPublished] = useState('')
  const [isInStock, setIsInStock] = useState('')
  const [isVisible, setIsVisible] = useState('')
  const [isSpecialProduct, setIsSpecialProduct] = useState('')

  return {
    isMapped,
    setIsMapped,
    isPublished,
    setIsPublished,
    isInStock,
    setIsInStock,
    isVisible,
    setIsVisible,
    isSpecialProduct,
    setIsSpecialProduct
  }
}

export default useFilterOptions
