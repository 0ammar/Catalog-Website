'use client'

import styles from './Navbar.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Logo, StarImg, NewImg } from '@/assets/images'
import { HiOutlineUser, HiOutlineLogout } from 'react-icons/hi'

const Navbar = () => {

  const router = useRouter()
  const leftIcons = [
    { title: 'Logout', icon: <HiOutlineLogout className={styles.icon} />, onClick: () => console.log("Logout!") },
    { title: 'Profile', icon: <HiOutlineUser className={styles.icon} />, onClick: () => console.log("Profile!") }
  ]
  const rightIcons = [
    { title: 'Focused Items', src: StarImg, alt: 'Focused Items', href: '/focused-items', className: styles.StarImg },
    { title: 'New Items', src: NewImg, alt: 'New Items', href: '/new-items', className: styles.newImg }
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
        <button className={styles.logoButton} title="Home" onClick={() => router.push('/categories')}>
          <Image src={Logo} alt="Logo" className={styles.logo} priority/>
        </button>
      </div>


      <div className={styles.rightIcons}>
        {rightIcons.map((item, i) => (
          <button key={i} className={styles.iconBtn} title={item.title} onClick={() => router.push(item.href)}>
            <Image src={item.src} alt={item.alt} className={item.className} priority/>
          </button>
        ))}
      </div>

      <div className={styles.sideLineLeft} />
      <div className={styles.sideLineRight} />
    </header>
  )
}
export default Navbar