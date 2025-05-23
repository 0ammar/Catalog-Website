'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

import styles from '@/styles/pages/welcome.module.scss';
import { Logo } from '@/assets/images';
import { useAuth } from '@/Hooks';

export default function WelcomePage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { handleLogin, loading, error } = useAuth();



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = () => {
    handleLogin(credentials.username, credentials.password);
  };

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image src={Logo} alt="logo" width={160} height={160} className={styles.logo} priority />
      <h1 className={styles.title}>مرحباً بك في كتالوج المتسوّق</h1>
      <div className={styles.underline} />

      {!showLogin ? (
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={() => setShowLogin(true)}>
            تسجيل دخول
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.setItem('isAdmin', 'false');
              router.push('/categories');
            }}
          >
            الدخول كزائر
          </button>

        </div>
      ) : (
        <motion.div
          className={styles.form}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.inputWrapper}>
            <FiUser className={styles.icon} />
            <input
              type="text"
              name="username"
              placeholder="اسم المستخدم"
              value={credentials.username}
              onChange={handleInputChange}
              dir="rtl"
            />
          </div>

          <div className={styles.inputWrapper}>
            <FiLock className={styles.icon} />
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              value={credentials.password}
              onChange={handleInputChange}
              dir="rtl"
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.primaryBtn} onClick={submitLogin} disabled={loading}>
            {loading ? (
              <div className={styles.spinner}></div>
            ) : (
              'تسجيل الدخول'
            )}
          </button>

          <button className={styles.secondaryBtn} onClick={() => setShowLogin(false)}>
            عودة للخلف
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
