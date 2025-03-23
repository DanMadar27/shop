import React from 'react';
import Link from 'next/link';

import 'material-icons/iconfont/filled.css';

interface Props {
  link: string;
}

const BackLink: React.FC<Props> = ({ link }) => {
  return (
    <Link href={link}>
      <span className='material-icons icon-large'>
        arrow_back
      </span>
    </Link>
  );
};

export default BackLink;
