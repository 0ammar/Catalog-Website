'use client';

import styles from './CategoryPage.module.scss';
import { CategoryGrid } from '@/Components/UI';

type Props = {
    path: string[];
};

export default function CategoryPage({ path }: Props) {
    const currentLevel =
        path.length === 1 ? 'group'
            : path.length === 2 ? 'subOne'
                : path.length === 3 ? 'subTwo'
                    : path.length === 4 ? 'subThree'
                        : null;

    if (!currentLevel) return <div>Invalid path</div>;

    return (
        <main className={styles.categoryPage}>
            <h1 className={styles.pageTitle}>{`Level: ${currentLevel}`}</h1>
            <CategoryGrid />
        </main>
    );
}
