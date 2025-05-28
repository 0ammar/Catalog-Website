'use client';

import styles from './Navbar.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { Logo, NewImg, focusedImg, favouriteImg } from '@/assets/images';
import { Modal } from '@/Components/UI';

const Navbar = () => {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    router.push('/');
  };

  return (
    <>
      <header className={styles.navbar}>
        <div className={styles.leftIcons}>
          <button
            className={styles.iconBtn}
            title="Logout"
            onClick={() => setShowLogoutModal(true)}
          >
            <HiOutlineLogout className={styles.icon} />
          </button>

          <button
            className={styles.iconBtn}
            title="Favourite"
            onClick={() => router.push('/favourite-items')}
          >
            <Image
              src={favouriteImg}
              alt="Favourite"
              className={styles.iconImage}
              priority
            />
          </button>
        </div>

        <div className={styles.logoContainer}>
          <button
            className={styles.logoButton}
            title="Home"
            onClick={() => router.push('/categories')}
          >
            <Image src={Logo} alt="Logo" className={styles.logo} priority />
          </button>
        </div>

        <div className={styles.rightIcons}>
          <button
            className={styles.iconBtn}
            title="Focused Items"
            onClick={() => router.push('/focused-items')}
          >
            <Image
              src={focusedImg}
              alt="Focused Items"
              className={styles.StarImg}
              priority
            />
          </button>

          <button
            className={styles.iconBtn}
            title="New Items"
            onClick={() => router.push('/new-items')}
          >
            <Image
              src={NewImg}
              alt="New Items"
              className={styles.newImg}
              priority
            />
          </button>
        </div>

        <div className={styles.sideLineLeft} />
        <div className={styles.sideLineRight} />
      </header>

      {showLogoutModal && (
        <Modal
          isOpen={showLogoutModal}
          title="تأكيد تسجيل الخروج"
          message="هل أنت متأكد أنك تريد تسجيل الخروج من الحساب؟"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
