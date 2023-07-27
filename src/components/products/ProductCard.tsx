// import NextPage generic type
import { NextPage } from "next";

import ProductModel from "../../models/Product";

import 'material-icons/iconfont/filled.css';

interface Props {
  product: ProductModel;
}

const ProductCard: NextPage<Props> = (props) => {
  const { product } = props;

  return (      
    <li key={product.id}>
      <img
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
      />

      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>{product.price}</p>
      
      <div className='buttons'>
        <button>
          Add to cart
        </button>
        <button className='icon-button'>
          <span className='material-icons'>favorite</span>
        </button>
      </div>

    </li>
  );
};

export default ProductCard;