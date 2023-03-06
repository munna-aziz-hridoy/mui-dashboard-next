// import {
//   Card,
//   Box,
//   CircularProgress,
//   Typography,
//   CardHeader,
//   Divider,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Grid,
//   Button
// } from '@mui/material'

// import { useRouter } from 'next/router'
// import React, { Fragment, useEffect, useState } from 'react'
// import {
//   getInternalProductById,
//   internalProductPurchaseDetails,
//   internalProductSellDetails
// } from 'src/@core/apiFunction/product'
// import AddInternalProduct from 'src/@core/components/forms/addInternalProductForm'
// import ProductTable from 'src/@core/components/internal-product/productTable'
// import PurchaseHistoryTable from 'src/@core/components/internal-product/purchaseHistoryTable'
// import SellHistoryTable from 'src/@core/components/internal-product/sellHistoryTable'
// import usePurchaseDetails from 'src/@core/hooks/usePurchaseDetails'
// import useSellDetails from 'src/@core/hooks/useSellDetails'
// import { getToken } from 'src/@core/utils/manageToken'

// // helper components

// const BoldSpan = ({ children }) => {
//   return <span style={{ fontWeight: '600' }}>{children}</span>
// }

// const StyledTableCell = ({ children }) => {
//   return <TableCell style={{ background: '#100720', color: '#fff' }}>{children}</TableCell>
// }

// const InternalProductDetails = () => {
//   const [productData, setProductData] = useState(null)

//   const [purchasePageCount, setpurchasePageCount] = useState(1)

//   const [sellDataPageCount, setSellDataPageCount] = useState(1)

//   const [loading, setLoading] = useState(false)

//   const [refetch, setRefetch] = useState(false)

//   const [isEditing, setIsEditing] = useState(false)

//   const {
//     query: { productId }
//   } = useRouter()
//   const { access_token } = getToken()

//   useEffect(() => {
//     setLoading(true)
//     getInternalProductById(productId, access_token).then(data => {
//       if (data?.id) {
//         setProductData(data)
//       }
//       setLoading(false)
//     })
//   }, [productId, refetch])

//   const { purchaseHistory, purchaseHistoryLoading, purchaseHistoryTotalPage } = usePurchaseDetails(
//     productId,
//     access_token,
//     purchasePageCount
//   )

//   const { sellHistory, sellHistoryLoading, sellHistoryTotalPage } = useSellDetails(
//     productId,
//     access_token,
//     sellDataPageCount
//   )

//   return (
//     <Card style={{ padding: '20px' }}>
//       <CardHeader title='Product details' />
//       <Divider />
//       <Box component='div' display='flex' justifyContent='space-between'>
//         <div></div>
//         <Button onClick={() => setIsEditing(prev => !prev)} variant='outlined' size='small'>
//           {!isEditing ? 'Edit' : 'Close'}
//         </Button>
//       </Box>

//       {loading && (
//         <Box component='div' display='flex' justifyContent='center' alignItems='center' height={400}>
//           <CircularProgress color='primary' />
//         </Box>
//       )}
//       {!loading && !productData && (
//         <Box component='div' display='flex' justifyContent='center' alignItems='center' height={400}>
//           <Typography variant='body1' fontSize={18}>
//             Something went wrong
//           </Typography>
//         </Box>
//       )}
//       {productData && (
//         <Box>
//           {isEditing ? (
//             <AddInternalProduct
//               previousData={productData}
//               setPreviousProduct={setProductData}
//               update
//               refetch={setRefetch}
//             />
//           ) : (
//             <Fragment>
//               <Typography variant='h6' fontWeight={400}>
//                 Product Name: <BoldSpan>{productData?.product_name}</BoldSpan>
//               </Typography>
//               <Typography variant='body1' fontSize={16} fontWeight={400}>
//                 Unit: <BoldSpan>{productData?.product_unit}</BoldSpan>
//               </Typography>
//               <Typography variant='body1' fontSize={16} fontWeight={400}>
//                 Unit Cost: <BoldSpan>¥{productData?.unit_cost}</BoldSpan>
//               </Typography>
//               <Typography variant='body1' fontSize={16} fontWeight={400}>
//                 Quantity: <BoldSpan>{productData?.total_quantity}</BoldSpan>
//               </Typography>
//               <Typography variant='body1' fontSize={16} fontWeight={400}>
//                 Amount: <BoldSpan>¥{productData?.total_amount}</BoldSpan>
//               </Typography>

//               <Divider style={{ margin: '30px 0' }} />

//               {/* product table */}

//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant='body2'>
//                     <BoldSpan>Online Product</BoldSpan>
//                   </Typography>

//                   <ProductTable online data={productData?.onlineProduct} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant='body2'>
//                     <BoldSpan>Offline Product</BoldSpan>
//                   </Typography>
//                   <ProductTable data={productData?.offlineProduct} />
//                 </Grid>
//               </Grid>
//             </Fragment>
//           )}

//           <Divider style={{ margin: '30px 0' }} />

//           {/* purchase data table */}
//           <Typography variant='body2'>
//             <BoldSpan>Purchase history</BoldSpan>
//           </Typography>

//           {purchaseHistoryLoading && <CircularProgress color='primary' />}

//           {!purchaseHistoryLoading && (
//             <PurchaseHistoryTable
//               data={purchaseHistory}
//               totalPages={purchaseHistoryTotalPage}
//               pageCount={setpurchasePageCount}
//             />
//           )}

//           {/* sell history table */}

//           <Divider style={{ margin: '30px 0' }} />

//           <Typography variant='body2'>
//             <BoldSpan>Sell History</BoldSpan>
//           </Typography>

//           {sellHistoryLoading && <CircularProgress color='primary' />}

//           {!sellHistoryLoading && (
//             <SellHistoryTable data={sellHistory} totalPages={sellHistoryTotalPage} pageCount={setSellDataPageCount} />
//           )}
//         </Box>
//       )}
//     </Card>
//   )
// }

// export default InternalProductDetails
import React from 'react'

const ProductDetails = () => {
  return <div>ProductDetails</div>
}

export default ProductDetails
