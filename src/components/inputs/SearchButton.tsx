import React from 'react';
import IconButton from './IconButton';

import 'material-icons/iconfont/filled.css';

interface Props {
  onClick: () => void;
}

const SearchButton: React.FC<Props> = ({ onClick }) => {
  return (
    <IconButton icon='search' onClick={onClick} />
  );
};

export default SearchButton;
