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

import { BiPurchaseTag, BiListCheck, BiMoney } from 'react-icons/bi'
import { AiOutlineDropbox } from 'react-icons/ai'
import { TiDropbox } from 'react-icons/ti'
import { GiBoxUnpacking } from 'react-icons/gi'
import { GrUserManager } from 'react-icons/gr'
import { RiScales2Fill, RiStockLine } from 'react-icons/ri'

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
      title: 'Internal Product',
      icon: GiBoxUnpacking,
      path: '/products/internal-product'
    },
    {
      title: 'Online Product',
      icon: AiOutlineDropbox,
      path: '/products/online-product'
    },
    {
      title: 'Offline Product',
      icon: TiDropbox,
      path: '/products/offline-product'
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
      icon: GrUserManager,
      path: '/others/supplier'
    },
    {
      title: 'Sales',
      icon: RiStockLine,
      path: '/others/sales'
    },
    {
      title: 'Payment List',
      icon: BiMoney,
      path: '/others/payment-list'
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
