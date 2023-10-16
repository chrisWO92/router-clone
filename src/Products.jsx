import React from 'react'
import Link from './Hooks/RouterClone'

const Products = () => {
  return (
    <>
      <h4>Example Products</h4>
      <ul>
        <li>
          <Link to="/products/1">Product One</Link>
        </li>
        <li>
          <Link to="/products/2">Product Two</Link>
        </li>
      </ul>
    </>
  )
}

export default Products