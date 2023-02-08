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

const PrintedInvoice = () => {
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
            Date: <strong>2023-02-07</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Payment Status: <strong>Paid</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Invoice Type: <strong>Purchse</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Purchase Status: <strong>Received All</strong>
          </p>
        </div>
        <div>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Supplier name: <strong>Demo User</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Email: <strong>demo@gmail.com</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Phone: <strong>12345678901</strong>
          </p>
          <p
            style={{
              margin: '3px 0'
            }}
          >
            Address: House no 31, Road 06, Block B
          </p>
        </div>
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
            <tr style={styleTr}>
              <td style={styleTd}>Ashirbad Ata</td>
              <td style={styleTd}>300</td>
              <td style={styleTd}>115</td>
              <td style={styleTd}>45000</td>
            </tr>
            <tr style={styleTr}>
              <td style={styleTd}>Ashirbad Ata</td>
              <td style={styleTd}>300</td>
              <td style={styleTd}>115</td>
              <td style={styleTd}>45000</td>
            </tr>
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
            Item Amount: <strong>2400</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Shipping charge: <strong>2400</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Tax: <strong>2400</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Tax Percentage: <strong>8%</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Discount: <strong>100</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0'
            }}
          >
            Paid Amount: <strong>1400</strong>
          </p>
          <p
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '20px'
            }}
          >
            Invoice Total: <strong>2400</strong>
          </p>
          <hr />
        </div>
        <p style={{ fontSize: '12px' }}>
          <strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita aperiam, eos eveniet
          quod assumenda reprehenderit delectus quisquam exercitationem corrupti provident, architecto, vitae inventore
          explicabo quibusdam.
        </p>
      </div>
    </div>
  )
}

export default PrintedInvoice
