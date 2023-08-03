import React, { useState } from 'react';

import 'material-icons/iconfont/filled.css';

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
      <button onClick={handleDecrement} disabled={!count}>
        <span className='material-icons'>remove</span>
      </button>

      <span>{count}</span>

      <button onClick={handleIncrement}>
        <span className='material-icons'>add</span>
      </button>
    </div>
  );
};

export default CounterButton;
