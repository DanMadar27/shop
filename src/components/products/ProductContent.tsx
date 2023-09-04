import Product from '@/models/Product';

interface Props {
  product: Product
}

const ProductContent = (props: Props) => {
  const { product } = props;

  return (
    <div>
      <img
        src={product.image}
        alt={product.name}
      />
    
      <h3>{product.name}</h3>
      <p className='ellipsis'>{product.description}</p>
      <p><b>Price</b>: ${product.price}</p>
      <p><b>Quantity</b>: {product.quantity}</p>
    </div>
  );
};

export default ProductContent;
