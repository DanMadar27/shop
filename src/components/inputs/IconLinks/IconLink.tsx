import React from 'react';
import Link from 'next/link';

import 'material-icons/iconfont/filled.css';

interface Props {
  icon: string;
  link: string;
}

const IconLink: React.FC<Props> = ({ icon, link }) => {
  return (
    <Link href={link}>
      <span className='material-icons'>
        {icon}
      </span>
    </Link>
  );
};

export default IconLink;
