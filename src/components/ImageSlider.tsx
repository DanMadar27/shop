import { NextPage } from "next";
import React, { useState, useEffect } from 'react';

interface Props {
  images: string[]; // Array of image URLs
}

const intervalDelay = 1000 * 5; // 5 seconds

const ImageSlider: NextPage<Props> = (props) => {
  const { images } = props;
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <img src={images[currentImage]} alt={`Image ${currentImage}`} />
    </div>
  );
};

export default ImageSlider;
