'use client';

import { useState, useEffect, useRef, useMemo, TouchEvent } from 'react';
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
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const hasImages = images.length > 0;

  // Use fallback if no images provided
  const displayedImages = useMemo(() => (
    hasImages ? images : [fallbackImage as unknown as string]
  ), [hasImages, images]);

  const goNext = () => setIndex((prev) => (prev + 1) % displayedImages.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + displayedImages.length) % displayedImages.length);

  // Mobile touch handlers
  const handleTouchStart = (e: TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e: TouchEvent) => setTouchEndX(e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const delta = touchStartX - touchEndX;
    if (delta > 50) goNext();
    else if (delta < -50) goPrev();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Scroll to active image
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTo({
        left: index * wrapperRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  }, [index, displayedImages]);

  return (
    <div className={styles.carousel}>
      <button className={styles.navBtn} onClick={goPrev} aria-label="صورة سابقة">
        <IoIosArrowBack />
      </button>

      <div
        className={styles.imageWrapper}
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0.4, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={styles.motionImage}
          >
            <Image
              src={displayedImages[index]}
              alt={`image-${index}`}
              width={800}
              height={500}
              onClick={() => onImageClick(displayedImages[index])}
              className={styles.image}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button className={styles.navBtn} onClick={goNext} aria-label="صورة تالية">
        <IoIosArrowForward />
      </button>

      <div className={styles.dots}>
        {displayedImages.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`انتقال للصورة رقم ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;