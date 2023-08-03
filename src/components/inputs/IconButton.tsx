import React from 'react';

import 'material-icons/iconfont/filled.css';

interface Props {
  icon: string;
  onClick: () => void;
}

const IconButton: React.FC<Props> = ({ icon, onClick }) => {
  return (
    <button className='icon-button' onClick={onClick}>
      <span className='material-icons'>
        {icon}
      </span>;
    </button>
  );
};

export default IconButton;
