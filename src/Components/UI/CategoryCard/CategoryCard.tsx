"use client";

import styles from "./CategoryCard.module.scss";
import Image from "next/image";
import { FiUploadCloud, FiRefreshCw } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";

export type CategoryCardProps = {
  id: string;
  name: string;
  imageUrl: string;
  onClick?: () => void;
  uploadImage?: (file: File) => void;
  deleteImage?: (imageUrl: string) => void;
};

const CategoryCard = ({
  name,
  imageUrl,
  onClick,
  uploadImage,
  deleteImage,
}: CategoryCardProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("isAdmin");
    setIsAdmin(role === "true");
  }, []);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteImage?.(imageUrl);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadImage?.(file);
  };

  return (
    <section
      className={styles.categoryCard}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.imgTitle}>
        <Image
          className={styles.categImg}
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          priority
        />
        <h2 className={styles.categTitle}>{name}</h2>
      </div>

      {isAdmin && (
        <div className={styles.buttonsWrapper} onClick={(e) => e.stopPropagation()}>
          <FiRefreshCw
            className={styles.icon}
            title="Reset"
            onClick={handleDelete}
          />
          <FiUploadCloud
            className={styles.icon}
            title="Upload"
            onClick={handleUploadClick}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            hidden
          />
        </div>
      )}
    </section>
  );
};

export default CategoryCard;