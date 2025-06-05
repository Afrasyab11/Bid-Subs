// components/Image.tsx
import React, { useState } from 'react';
import { checkNullOrEmpty } from '@/utils/Utils';

interface ImageProps {
  src?: string;
  alt?: string;
  className?: string;
  title?: string;
  onClick?: () => void;
  placeholder?: boolean;
  placeholderImg?: string;
  style?:any
}

const Image: React.FC<ImageProps> = ({
  src = '',
  alt = 'logo',
  className = 'w-full h-full',
  title = '',
  onClick,
  placeholder = true,
  placeholderImg = '',
  style,
}) => {
  const [imageUrl, setImageUrl] = useState(
    checkNullOrEmpty(src) && placeholder ? placeholderImg : src
  );

  const handleError = () => {
    setImageUrl(placeholderImg);
  };

  return (
    <img
      src={imageUrl}
      alt={alt}
      title={title}
      className={'cursor-pointer ' + className}
      onError={handleError}
      onClick={onClick}
      style={style}
    />
  );
};

export default Image;
