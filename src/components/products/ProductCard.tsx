// import NextPage generic type
import { NextPage } from 'next';

import { useDispatch } from 'react-redux';
import { setProduct } from '../../app/GlobalRedux/features/products/productSlice';

import ProductModel from '../../models/Product';
import ProductContent from './ProductContent';

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

  const addToCart = async () => {
    const newProduct = { ...product };
    newProduct.amount += 1;
    
    // @ts-ignore
    dispatch(setProduct(newProduct));
  }

  const toggleFavorite = async () => {
    const newProduct = { ...product };
    newProduct.isFavorite = !newProduct.isFavorite;
    
    // @ts-ignore. This is a redux action
    dispatch(setProduct(newProduct));
  }

  return (      
    <li className='card'>
      <ProductContent product={product} />
      
      <div className='buttons'>
        <button onClick={addToCart}>
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