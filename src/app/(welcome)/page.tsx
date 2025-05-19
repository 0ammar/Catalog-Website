'use client'

import { useEffect, useState } from "react"
import Loading from '@/Components/UI/Loading/LoadingClient'
import styles from './welcome.module.scss'

const Welcome = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout ( () => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading/>

  return (
    <div className={styles.container}>
      اهلا بك في كتالوج المتسوق
    </div>
  )
}

export default Welcome