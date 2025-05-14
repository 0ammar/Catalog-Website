'use client';

import styles from './CategoryPage.module.scss';
import { CategoryGrid } from '@/Components/UI';

type Props = {
    path: string[];
};

export default function CategoryPage({ path }: Props) {
    const currentLevel =
        path.length === 1 ? 'المجموعة 1'
            : path.length === 2 ? 'المجموعة 2'
                : path.length === 3 ? 'المجموعة 3'
                    : path.length === 4 ? 'المجموعة 4'
                        : null;

    if (!currentLevel) return <div>Invalid path</div>;

    return (
        <main className={styles.categoryPage}>
            <h1 className={styles.pageTitle}>{`${currentLevel}`}</h1>
            <CategoryGrid />
        </main>
    );
}
