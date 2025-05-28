'use client';

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import styles from './Loading.module.scss';
import SplashScreen from '@/assets/animations/SplachScreen.json';

const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <Lottie animationData={SplashScreen} loop className={styles.loader} />
      <p className={styles.p}>...جاري التحميل</p>
    </div>
  );
};

export default Loading;
