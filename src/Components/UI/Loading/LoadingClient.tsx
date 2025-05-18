'use client';
import dynamic from 'next/dynamic';

const Loading = dynamic(() => import('./Loading'), { ssr: false });
export default Loading;
