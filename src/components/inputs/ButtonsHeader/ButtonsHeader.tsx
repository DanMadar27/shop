import React from 'react';
import Link from 'next/link';

import styles from './ButtonsHeader.module.css';

interface Props {
  backLink: string;
}

const ButtonsHeader: React.FC<Props> = ({ backLink }) => {
  return (
    <div className={styles.container}>
      {/* Make this icon link component */}
      <Link href={backLink}>Back</Link>
      {/* Make this icon button component */}
      <button>
        Add Address
      </button>
    </div>
  );
};

export default ButtonsHeader;
