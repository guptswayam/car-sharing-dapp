import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function MySpinner() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Spinner animation="border" style={{ display: 'flex' }} />
    </div>
  )
}
