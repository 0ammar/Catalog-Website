'use client'

import styles from './Navbar.module.scss'
import Image from 'next/image'
import { Logo, StarImg, NewImg } from '@/assets/images/index'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'

export default function Navbar() {
  const leftIcons = [
    { title: 'Logout', icon: <HiOutlineLogout className={styles.icon} />, onClick: () => console.log("Logout!") },
    { title: 'Profile', icon: <HiOutlineUser className={styles.icon} />, onClick: () => console.log("Profile!") }
  ]

  const rightIcons = [
    { title: 'Focused Items', src: StarImg, alt: 'Focused Items', className: styles.StarImg },
    { title: 'New items', src: NewImg, alt: 'New Items', className: styles.newImg }
  ]

  return (
    <header className={styles.navbar}>
      <div className={styles.leftIcons}>
        {leftIcons.map((item, i) => (
          <button key={i} className={styles.iconBtn} title={item.title} onClick={item.onClick}>
            {item.icon}
          </button>
        ))}
      </div>

      <div className={styles.logoContainer}>
        <Image src={Logo} alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.rightIcons}>
        {rightIcons.map((item, i) => (
          <button key={i} className={styles.iconBtn} title={item.title} onClick={() => console.log(item.title)}>
            <Image src={item.src} alt={item.alt} className={item.className} />
          </button>
        ))}
      </div>

      <div className={styles.sideLineLeft} />
      <div className={styles.sideLineRight} />
    </header>
  )
}
