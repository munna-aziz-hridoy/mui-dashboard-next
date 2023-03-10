import React, { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false, error: null, errorInfo: null }

  children = this.props.children

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>{this.state.errorInfo.componentStack}</p>
        </div>
      )
    }

    return this.children
  }
}

export default ErrorBoundary
