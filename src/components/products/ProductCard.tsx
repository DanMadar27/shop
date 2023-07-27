// import NextPage generic type
import { NextPage } from 'next';
import { useGlobalContext } from '../../app/Context/store';

import ProductModel from '../../models/Product';

import 'material-icons/iconfont/filled.css';

interface Props {
  product: ProductModel;
}

function favoriteIcon(isFavorite: boolean) {
  if (isFavorite) {
    return <span className='material-icons'>favorite</span>;
  }

  return <span className='material-icons'>favorite_border</span>;
}

const ProductCard: NextPage<Props> = (props) => {
  const { product } = props;
  const { setProduct } = useGlobalContext();

  const toggleFavorite = async () => {
    product.isFavorite = !product.isFavorite;
    setProduct(product);
  }

  return (      
    <li>
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
        <button className='icon-button' onClick={toggleFavorite}>
          {favoriteIcon(product.isFavorite)}
        </button>
      </div>

    </li>
  );
};

export default ProductCard;