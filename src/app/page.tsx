'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';

import styles from '@/styles/pages/welcome.module.scss';
import { Logo } from '@/assets/images';

export default function WelcomePage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    // TODO: Connect with login API
    console.log('Login with:', credentials);
  };

  return (
    <div className={styles.wrapper}>
      <Image src={Logo} alt="logo" width={160} height={160} className={styles.logo} />

      <h1 className={styles.title}>مرحباً بك في كتالوج المتسوّق</h1>
      <div className={styles.underline} />

      {!showLogin ? (
        <div className={styles.actions}>
          <button className={styles.primaryBtn} onClick={() => setShowLogin(true)}>
            تسجيل دخول
          </button>
          <button
            className={styles.secondaryBtn}
            onClick={() => router.push('/categories/1')}
          >
            الدخول كزائر
          </button>
        </div>
      ) : (
        <div className={styles.form}>
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

          <button className={styles.primaryBtn} onClick={handleLogin}>
            تسجيل الدخول
          </button>
          <button className={styles.secondaryBtn} onClick={() => setShowLogin(false)}>
            عودة للخلف
          </button>
        </div>
      )}
    </div>
  );
}
