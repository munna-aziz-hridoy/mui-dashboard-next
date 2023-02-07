// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

import { BiPurchaseTag, BiListCheck } from 'react-icons/bi'

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'Account Settings',
      icon: AccountCogOutline,
      path: '/account-settings'
    },
    {
      sectionTitle: 'Products'
    },
    {
      title: 'Online Product',
      icon: Login,
      path: '/products/online-product'
    },
    {
      title: 'Offline Product',
      icon: AccountPlusOutline,
      path: '/products/offline-product'
    },
    {
      title: 'Internal Product',
      icon: AlertCircleOutline,
      path: '/products/internal-product'
    },
    {
      sectionTitle: 'Purchase'
    },
    {
      title: 'Add Purchase',
      icon: BiPurchaseTag,
      path: '/purchase/add-purchase'
      // openInNewTab: true
    },
    {
      title: 'Purchase List',
      icon: BiListCheck,
      path: '/purchase/purchase-list'
    },

    { sectionTitle: 'Others' },
    {
      title: 'Supplier',
      icon: BiListCheck,
      path: '/others/supplier'
    },
    {
      title: 'Sales',
      icon: BiListCheck
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'Typography',
      icon: FormatLetterCase,
      path: '/typography'
    },
    {
      title: 'Icons',
      path: '/icons',
      icon: GoogleCirclesExtended
    },
    {
      title: 'Cards',
      icon: CreditCardOutline,
      path: '/cards'
    },
    {
      title: 'Tables',
      icon: Table,
      path: '/tables'
    },
    {
      icon: CubeOutline,
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
