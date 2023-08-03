import React, { useState } from 'react';
import IconButton from './IconButton';

interface Props {
  initialValue?: number;
}

const CounterButton: React.FC<Props> = ({ initialValue = 0 }) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className='flex-row-center'>
      <IconButton
        icon='remove'
        onClick={handleDecrement}
        disabled={!count}
        transparent={true}
      />
      <span>{count}</span>
      <IconButton
        icon='add'
        onClick={handleIncrement}
        transparent={true}
      />
    </div>
  );
};

export default CounterButton;
