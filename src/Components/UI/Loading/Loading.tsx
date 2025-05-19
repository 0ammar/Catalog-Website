'use client';

import styles from './Loading.module.scss';
import Lottie from 'lottie-react';
import SplashScreen from '@/assets/animations/SplachScreen.json';

const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <Lottie animationData={SplashScreen} loop={true} className={styles.loader} />
    </div>
  );
}

export default Loading