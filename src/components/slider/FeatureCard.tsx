"use client";
import { FeatureCardType } from '@/types/FeatureCardType';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const FeatureCard = ({ title, description, image, link }: FeatureCardType) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="w-full  sm:w-11/12  group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-shadow duration-300">
      
      {/* Image */}
      <div className="relative h-56 sm:h-60 w-full overflow-hidden">
        {isImageLoading && (
          <div role="status" className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
            <svg className="w-8 h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
        )}
        <Image
          src={image}
          alt={title}
          fill
          className={`object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 ${
            isImageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsImageLoading(false)}
          priority
        />
      </div>

      {/* Content */}
      <div className="p-6 min-h-32">
        <Link href={link} className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
