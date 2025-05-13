'use client'

import styles from './Footer.module.scss'
import Image from 'next/image'
import { AppIcon } from '@/assets/images'
export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.left}>
                <Image src={AppIcon} alt='app icon' width={25} height={25} />
                <span>Almutasaweq Catalog v1.0</span>
            </div>
            <div className={styles.right}>
                <span>© 2025 All rights reserved</span>
            </div>
        </footer>
    )
}
