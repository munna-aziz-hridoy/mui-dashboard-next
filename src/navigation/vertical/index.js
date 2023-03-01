// ** Icon imports

import { HomeOutline, AccountCogOutline } from 'mdi-material-ui'

import { BiPurchaseTag, BiListCheck, BiMoney } from 'react-icons/bi'
import { AiOutlineDropbox, AiOutlineFundView } from 'react-icons/ai'
import { TiDropbox } from 'react-icons/ti'
import { GiBoxUnpacking } from 'react-icons/gi'
import { GrUserManager } from 'react-icons/gr'
import { RiStockLine } from 'react-icons/ri'

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

    {
      title: 'Purchase Overview',
      icon: AiOutlineFundView,
      path: '/purchase/purchase-overview'
    },

    {
      title: 'Payment List',
      icon: BiMoney,
      path: '/purchase/payment-list'
    },

    { sectionTitle: 'Sales' },
    {
      title: 'Offline Sales',
      icon: RiStockLine,
      path: '/sales/offline-sales'
    },
    {
      title: 'Online Sales',
      icon: RiStockLine,
      path: '/sales/online-sales'
    },

    { sectionTitle: 'Others' },
    {
      title: 'Supplier',
      icon: GrUserManager,
      path: '/others/supplier'
    }

    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
