import React from 'react';
import IconButton from './IconButton';

interface Props {
  onClick: () => void;
}

const RemoveButton: React.FC<Props> = ({ onClick }) => {
  return (
    <IconButton icon='delete' onClick={onClick} />
  );
};

export default RemoveButton;
