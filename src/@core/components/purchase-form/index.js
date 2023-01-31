// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import FormLayoutsBasic from 'src/views/form-layouts/FormLayoutsBasic'
import FormLayoutsIcons from 'src/views/form-layouts/FormLayoutsIcons'
import FormLayoutsSeparator from 'src/views/form-layouts/FormLayoutsSeparator'
import FormLayoutsAlignment from 'src/views/form-layouts/FormLayoutsAlignment'
import AddPurchaseForm from 'src/@core/components/purchase-form/form'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const PurchaseForm = () => {
  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* <FormLayoutsSeparator /> */}
          <AddPurchaseForm />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default PurchaseForm
