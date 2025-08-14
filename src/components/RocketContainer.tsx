'use client';

import Image from 'next/image';
import rocketImage from '@/assets/rocket.png';
import { useEffect, useState } from 'react';

export default function RocketContainer() {
  const [isLaunching, setIsLaunching] = useState<boolean>(false);

  useEffect(() => {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsLaunching(true);
    }, 100);
  }, [isLaunching]);

  return (
    <div className="fixed inset-0 overflow-hidden z-20 pointer-events-none">
      <div
        className={`
        h-full w-full absolute z-20 right-[50%]
        transition-transform duration-[6s] ease-in-out
        ${
          isLaunching
            ? '-translate-x-full -translate-y-full'
            : 'translate-x-full translate-y-full'
        }
      `}
      >
        <Image
          src={rocketImage}
          height={200}
          width={200}
          alt="rocket illustration"
          className="ml-auto rotate-[-45deg]"
        />
      </div>
    </div>
  );
}
