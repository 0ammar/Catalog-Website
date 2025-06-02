'use client';

import { useState, useRef, useMemo, TouchEvent } from 'react';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ImageCarousel.module.scss';
import fallbackImage from '@/assets/images/header.png';

type Props = {
  images?: string[];
  onImageClick: (url: string) => void;
};

const ImageCarousel = ({ images = [], onImageClick }: Props) => {
  const [index, setIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const displayedImages = useMemo(
    () => (images.length > 0 ? images : [fallbackImage as unknown as string]),
    [images]
  );

  const goNext = () =>
    setIndex((prev) => (prev + 1) % displayedImages.length);

  const goPrev = () =>
    setIndex((prev) => (prev - 1 + displayedImages.length) % displayedImages.length);

  const handleTouchStart = (e: TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX === null) return;
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (delta > 50) goNext();
    else if (delta < -50) goPrev();
    setTouchStartX(null);
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.navBtn} onClick={goPrev} aria-label="صورة سابقة">
        <IoIosArrowBack />
      </button>

      <div
        className={styles.imageWrapper}
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={styles.motionImage}
            initial={{ opacity: 0.4, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={displayedImages[index]}
              alt={`image-${index}`}
              fill
              className={styles.image}
              onClick={() => onImageClick(displayedImages[index])}
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button className={styles.navBtn} onClick={goNext} aria-label="صورة تالية">
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default ImageCarousel;
