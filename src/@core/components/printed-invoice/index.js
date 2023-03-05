import React from 'react'

const stylePara = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '3px 0'
}

const styleTd = {
  textAlign: 'center',
  border: '1px solid gray',
  padding: '10px'
}

const styleTr = {
  border: '1px solid gray'
}

const PrintedInvoice = ({ invoice }) => {
  const {
    amount_paid,

    discount,

    invoice_date,
    invoice_items,
    invoice_total,
    invoice_type,
    item_amount,
    note,
    payment_status,
    shipping_charge,
    stock_status,
    supplier,
    tax,
    tax_percentage
  } = invoice

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, Helvetica, sans-serif',
        background: '#fff',
        minHeight: '90%',
        padding: '20px'
      }}
      id='printed-invoice'
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '600',
          textAlign: 'center',
          margin: '0px'
        }}
      >
        Pims
      </h2>
      <p
        style={{
          textAlign: 'center',
          margin: '0px'
        }}
      >
        Purchse Details
      </p>
      <hr />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Date: <strong>{invoice_date?.split(' ')[0]}</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Payment Status: <strong>{payment_status}</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Invoice Type: <strong>{invoice_type}</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Purchase Status: <strong>{stock_status}</strong>
          </p>
        </div>
        {supplier && (
          <div>
            <p
              style={{
                margin: '3px 0'
              }}
            >
              Supplier name: <strong>{supplier?.name}</strong>
            </p>
            <p
              style={{
                margin: '3px 0'
              }}
            >
              Email: <strong>{supplier?.email}</strong>
            </p>
            <p
              style={{
                margin: '3px 0'
              }}
            >
              Phone: <strong>{supplier?.phone}</strong>
            </p>
            <p
              style={{
                margin: '3px 0'
              }}
            >
              Address: {supplier?.address}
            </p>
          </div>
        )}
      </div>

      <div
        style={{
          margin: '50px auto'
        }}
      >
        <h3
          style={{
            textAlign: 'center'
          }}
        >
          Order History
        </h3>

        <table
          style={{
            width: '100%',
            border: '1px solid gray',
            borderCollapse: 'collapse'
          }}
        >
          <thead
            style={{
              border: '1px solid gray',
              fontSize: '20px'
            }}
          >
            <tr style={styleTr}>
              <th style={{ ...styleTr, padding: '15px' }}>Product</th>
              <th style={{ ...styleTr, padding: '15px' }}>Quantity</th>
              <th style={{ ...styleTr, padding: '15px' }}>Unit cost</th>
              <th style={{ ...styleTr, padding: '15px' }}>Sub total</th>
            </tr>
          </thead>
          <tbody style={styleTr}>
            {invoice_items?.map((item, i) => (
              <tr key={i} style={styleTr}>
                <td style={styleTd}>{item?.product?.product_name}</td>
                <td style={styleTd}>{item?.quantity}</td>
                <td style={styleTd}>{item?.unit_cost}</td>
                <td style={styleTd}>{item?.quantity * item?.unit_cost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        <div
          style={{
            margin: '20px auto',
            fontSize: '14px'
          }}
        >
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Item Amount: <strong>{item_amount}</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Shipping charge: <strong>{shipping_charge}</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Tax: <strong>{tax}</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Tax Percentage: <strong>{tax_percentage}%</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Discount: <strong>{discount}</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Paid Amount: <strong>{amount_paid}</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '20px'
            }}
          >
            Invoice Total: <strong>{invoice_total}</strong>
          </p>
          <hr />
        </div>
        <p style={{ fontSize: '12px' }}>
          <strong>Note:</strong> {note}
        </p>
      </div>
    </div>
  )
}

export default PrintedInvoice
