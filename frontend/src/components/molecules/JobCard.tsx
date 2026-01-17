import React from 'react';
import { VerifiedBadge } from '../atoms/VerifiedBadge';
import { Button } from '../atoms/Button';
import { Star, MapPin, DollarSign, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Job {
  id: string;
  title: string;
  description: string;
  price: number;
  location: { lat: number; lng: number };
  employer: {
    name: string;
    isVerified: boolean;
    rating: number;
  };
  status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface JobCardProps {
  job: Job;
  onAccept: (id: string) => void;
  isAccepting?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onAccept, isAccepting }) => {
  const { title, description, price, employer } = job;

  const handleOpenMaps = (type: 'waze' | 'google') => {
      const { lat, lng } = job.location;
      if (type === 'waze') {
          window.open(`waze://?ll=${lat},${lng}&navigate=yes`);
      } else {
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
      }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 max-w-sm w-full"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-600">{employer.name}</span>
            {employer.isVerified && <VerifiedBadge />}
          </div>
        </div>
        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded text-yellow-700">
          <Star size={14} className="fill-yellow-500 text-yellow-500 mr-1" />
          <span className="text-sm font-bold">{employer.rating}</span>
        </div>
      </div>

      {/* Body */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <DollarSign size={16} />
          <span className="font-semibold text-green-600 text-lg">${price}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={16} />
          <span>A 2.5 km</span>
        </div>
      </div>

      {/* Actions */}
      {job.status === 'IN_PROGRESS' ? (
          <div className="space-y-2">
               <div className="text-sm text-green-600 font-semibold mb-2 flex items-center gap-2">
                   <Navigation size={16} />
                   Ruta activa
               </div>
               <div className="grid grid-cols-2 gap-2">
                   <Button variant="secondary" onClick={() => handleOpenMaps('google')} className="text-sm">
                       Google Maps
                   </Button>
                   <Button variant="secondary" onClick={() => handleOpenMaps('waze')} className="text-sm">
                       Waze
                   </Button>
               </div>
          </div>
      ) : (
        <Button 
            className="w-full" 
            onClick={() => onAccept(job.id)}
            isLoading={isAccepting}
        >
            Aceptar Empleo
        </Button>
      )}
    </motion.div>
  );
};
