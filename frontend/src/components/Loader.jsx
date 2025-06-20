import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={`${sizes[size]} animate-spin text-blue-500`} />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  );
};

// Loading skeleton for item cards
export const ItemCardSkeleton = () => {
  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden shadow-lg">
      <div className="shimmer h-48 w-full"></div>
      <div className="p-6 space-y-3">
        <div className="shimmer h-4 w-3/4 rounded"></div>
        <div className="shimmer h-3 w-1/2 rounded"></div>
      </div>
    </div>
  );
};

// Loading skeleton for item detail
export const ItemDetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div className="shimmer h-96 w-full rounded-xl"></div>
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="shimmer h-20 w-20 rounded-lg"></div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="shimmer h-8 w-3/4 rounded"></div>
          <div className="shimmer h-4 w-1/3 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="shimmer h-4 w-full rounded"></div>
          <div className="shimmer h-4 w-5/6 rounded"></div>
          <div className="shimmer h-4 w-4/5 rounded"></div>
        </div>
        <div className="shimmer h-12 w-32 rounded-lg"></div>
      </div>
    </div>
  );
};

export default Loader;