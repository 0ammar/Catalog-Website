'use client';

import styles from "./CategoryCard.module.scss";
import Image from "next/image";

import { Logo } from "@/assets/images"; 
import { FiUploadCloud, FiRefreshCw } from "react-icons/fi";

const CategoryCard = () => {

  return (
    <section className={styles.categoryCard}>
      <div className={styles.imgTitle}>
        <Image className={styles.categImg} src={Logo} alt="Category" width={100} height={100} />
        <h2 className={styles.categTitle}>Category Title</h2>
      </div>
      <div className={styles.buttonsWrapper}>
        <FiRefreshCw className={styles.icon} title="Reset" />
        <FiUploadCloud className={styles.icon} title="Upload" />
      </div>
    </section>
  );
}
export default CategoryCard