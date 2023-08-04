import React from 'react';

import AddressButton from '../IconButtons/AddressButton';
import BackLink from '../IconLinks/BackLink';

import styles from './ButtonsHeader.module.css';

interface Props {
  backLink: string;
}

const ButtonsHeader: React.FC<Props> = ({ backLink }) => {
  return (
    <div className={styles.container}>
      <BackLink link={backLink} />
      <AddressButton />
    </div>
  );
};

export default ButtonsHeader;
