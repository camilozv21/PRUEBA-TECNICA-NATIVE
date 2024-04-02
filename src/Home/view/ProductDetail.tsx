import React from 'react'
import ProductById from '../components/ProductById';

function ProductDetail({route}) {
  const {id} = route.params;

  return (
    <ProductById id={id} />
  )
}

export default ProductDetail;