'use client';

import styles from './CategoryGrid.module.scss';
import { CategoryCard } from '@/Components/UI';

export default function CategoryGrid() {
    const dummyData = Array.from({ length: 20 }, (_, i) => i);

    return (
        <div className={styles.categoryGrid}>
            {dummyData.map((_, index) => (
                <CategoryCard key={index} />
            ))}
        </div>
    );
}
