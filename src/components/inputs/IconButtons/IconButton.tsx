import React from 'react';

import 'material-icons/iconfont/filled.css';

interface Props {
  icon: string;
  onClick: () => void;
  disabled?: boolean;
  transparent?: boolean;
}

const IconButton: React.FC<Props> = ({ icon, onClick, disabled, transparent }) => {
  const className = transparent ? 'filled-icon-button' : 'icon-button';

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      <span className='material-icons'>
        {icon}
      </span>
    </button>
  );
};

export default IconButton;
