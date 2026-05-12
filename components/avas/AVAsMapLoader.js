'use client';

import dynamic from 'next/dynamic';

const AVAsMap = dynamic(() => import('@/components/avas/AVAsMap'), { ssr: false });

export default function AVAsMapLoader() {
  return <AVAsMap />;
}
