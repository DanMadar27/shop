import React, { useState } from 'react';
import IconButton from './IconButton';
import styles from './CounterButton.module.css';

interface Props {
  value?: number;
  increase: () => void;
  decrease: () => void;
}

const CounterButton: React.FC<Props> = ({ value = 0, increase, decrease }) => {
  return (
    <div className='flex-row-center'>
      <IconButton
        icon='remove'
        onClick={decrease}
        disabled={!value}
        transparent={true}
      />
      <span className={styles['counter']}>{value}</span>
      <IconButton
        icon='add'
        onClick={increase}
        transparent={true}
      />
    </div>
  );
};

export default CounterButton;
