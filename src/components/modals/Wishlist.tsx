import Modal from './Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Wishlist = (props: Props) => {
  const { isOpen, onClose, children } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Wishlist</h2>
      {children}
    </Modal>
  );
};

export default Wishlist;