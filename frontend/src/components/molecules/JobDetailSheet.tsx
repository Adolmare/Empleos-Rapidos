import React from 'react';
import { VerifiedBadge } from '../atoms/VerifiedBadge';
import { Button } from '../atoms/Button';
import { Star, MapPin, DollarSign, MessageCircle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Job } from './JobCard';

interface JobDetailSheetProps {
    job: Job;
    onClose: () => void;
    onAccept: () => void;
    onChat?: () => void;
    className?: string; // Add className prop
}

export const JobDetailSheet: React.FC<JobDetailSheetProps> = ({ job, onClose, onAccept, onChat, className }) => {
    return (
        <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto flex flex-col gap-6 ${className || ''}`}
        >
            {/* Header / Close */}
            <div className="flex justify-between items-start">
                <div>
                     <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-wide">
                        Disponible
                     </span>
                     <h2 className="text-2xl font-bold text-gray-900 mt-2">{job.title}</h2>
                </div>
                <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <X size={20} className="text-gray-600" />
                </button>
            </div>

            {/* Price & Location Row */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 rounded-lg text-green-700">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Monto</p>
                        <p className="text-xl font-bold text-gray-900">${job.price}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-gray-500 text-sm mb-1">
                        <MapPin size={14} />
                        <span>2.5 km de ti</span>
                    </div>
                    <p className="text-xs text-gray-400">Zona Centro</p>
                </div>
            </div>

            {/* Description */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-2">Detalles del Trabajo</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    {job.description}
                </p>
            </div>

            {/* Employer Profile */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                        {job.employer.name.charAt(0)}
                    </div>
                    <div>
                        <div className="flex items-center gap-1">
                            <p className="font-bold text-gray-900 text-sm">{job.employer.name}</p>
                            {job.employer.isVerified && <VerifiedBadge />}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star size={10} className="fill-yellow-400 text-yellow-400" />
                            <span>{job.employer.rating} (12 trabajos)</span>
                        </div>
                    </div>
                </div>
                {onChat && (
                    <button onClick={onChat} className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                        <MessageCircle size={24} />
                    </button>
                )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 gap-3 pt-2">
                <Button 
                    className="w-full py-4 text-base shadow-lg shadow-green-200"
                    onClick={onAccept}
                >
                    Aceptar Empleo
                </Button>
            </div>
        </motion.div>
    );
};
