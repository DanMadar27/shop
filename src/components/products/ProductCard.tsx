// import NextPage generic type
import { NextPage } from 'next';

import { useDispatch } from 'react-redux';
import { setProduct } from '../../app/GlobalRedux/features/products/productSlice';

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
  const dispatch = useDispatch();

  const toggleFavorite = async () => {
    const newProduct = { ...product };
    newProduct.isFavorite = !newProduct.isFavorite;
    
    // @ts-ignore. This is a redux action
    dispatch(setProduct(newProduct));
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