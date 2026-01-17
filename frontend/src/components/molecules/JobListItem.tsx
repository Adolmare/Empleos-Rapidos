import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, BadgeCheck, Briefcase } from 'lucide-react';
import type { Job } from './JobCard';

interface JobListItemProps {
    job: Job;
    onClick: () => void;
    isSelected?: boolean;
}

export const JobListItem: React.FC<JobListItemProps> = ({ job, onClick, isSelected }) => {
    return (
        <motion.div 
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`
                flex items-center gap-4 p-4 border-b border-gray-100 bg-white last:border-0 cursor-pointer
                ${isSelected ? 'bg-green-50' : 'hover:bg-gray-50'}
            `}
        >
            {/* Icon / Avatar */}
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 shrink-0">
                <Briefcase size={20} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 truncate pr-2">{job.title}</h3>
                    <span className="font-bold text-green-600 shrink-0">${job.price}</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-0.5">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        {job.employer.rating}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5">
                        <MapPin size={12} />
                        2.5 km
                    </span>
                    {job.employer.isVerified && (
                         <>
                            <span>•</span>
                            <span className="flex items-center gap-0.5 text-blue-600 bg-blue-50 px-1 py-0.5 rounded-full">
                                <BadgeCheck size={10} />
                                <span className="text-[10px] font-medium">Verificado</span>
                            </span>
                         </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};