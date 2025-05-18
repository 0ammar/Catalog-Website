'use client';

import styles from './ImageCarousel.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useState, TouchEvent } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
  images: (string | StaticImageData)[];
  onImageClick: (url: string) => void;
}

export default function ImageCarousel({ images, onImageClick }: Props) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;

    if (delta > 50) goPrev();
    if (delta < -50) goNext();

    setTouchStartX(null);
  };

  return (
    <div
      className={styles.carousel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className={styles.navBtn} onClick={goPrev} title="السابق">
        <IoIosArrowBack />
      </button>

      <div className={styles.imageWrapper}>
        <Image
          src={images[index]}
          alt={`image-${index}`}
          width={200}
          height={200}
          onClick={() => onImageClick(images[index] as string)}
          className={styles.image}
        />
      </div>

      <button className={styles.navBtn} onClick={goNext} title="التالي">
        <IoIosArrowForward />
      </button>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
