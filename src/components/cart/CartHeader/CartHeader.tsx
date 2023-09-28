'use client';

import React from 'react';

import AddressButton from '../../inputs/IconButtons/AddressButton';
import BackLink from '../../inputs/IconLinks/BackLink';

import styles from './CartHeader.module.css';

interface Props {
  backLink: string;
}

const CartHeader: React.FC<Props> = ({ backLink }) => {
  return (
    <div className={styles.container}>
      <BackLink link={backLink} />
      {/* <AddressButton /> */}
    </div>
  );
};

export default CartHeader;
