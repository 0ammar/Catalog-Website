'use client';

import styles from './ImageCarousel.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useState, useEffect, useRef, TouchEvent } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface Props {
  images: (string | StaticImageData)[];
  onImageClick: (url: string) => void;
}

export default function ImageCarousel({ images, onImageClick }: Props) {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;

    if (delta > 50) goPrev();
    else if (delta < -50) goNext();

    setTouchStartX(null);
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({
        left: index * wrapperRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  }, [index]);

  return (
    <div className={styles.carousel}>
      {!isMobile && (
        <button className={styles.navBtn} onClick={goPrev} title="السابق">
          <IoIosArrowBack />
        </button>
      )}

      <div
        className={styles.imageWrapper}
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`image-${i}`}
            width={800}
            height={500}
            onClick={() => onImageClick(img as string)}
            className={styles.image}
          />
        ))}
      </div>

      {!isMobile && (
        <button className={styles.navBtn} onClick={goNext} title="التالي">
          <IoIosArrowForward />
        </button>
      )}

      <div className={styles.dots}>
        {images.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
