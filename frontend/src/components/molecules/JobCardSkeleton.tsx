import React from 'react';

interface JobCardSkeletonProps {}

export const JobCardSkeleton: React.FC<JobCardSkeletonProps> = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 max-w-sm w-full animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-16 bg-gray-200 rounded w-full mb-6"></div>
            <div className="flex gap-4 mb-4">
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
    )
}
