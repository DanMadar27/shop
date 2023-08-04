import React from 'react';

import IconButton from './IconButton';

interface Props {
  address?: object;
}

const AddressButton: React.FC<Props> = ({ address }) => {
  const addressModal = () => {
    // open modal
  }

  return (
    <IconButton icon='location_on' onClick={addressModal} />
  );
};

export default AddressButton;
