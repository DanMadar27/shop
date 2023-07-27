import { NextPage } from "next";

import styles from './ImageSlider.module.css';

interface Props {
  images: string[]; // Array of image URLs
}

const ImageSlider: NextPage<Props> = (props) => {
  const { images } = props;

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
