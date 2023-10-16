import React from 'react'
import {useParams} from './Hooks/RouterClone';
import Link from './Hooks/RouterClone';

const Product = () => {
    const { id } = useParams();
    return (
      <>
        <h4>Viewing product {id}</h4>
        <Link to="/">Back to all products</Link>
      </>
    );
}

export default Product