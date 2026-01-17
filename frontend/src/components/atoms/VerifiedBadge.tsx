import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: number;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ size = 20, className }) => {
  return (
    <div className={`flex items-center gap-1 text-blue-500 ${className}`} title="Identidad Verificada">
      <BadgeCheck size={size} />
      <span className="text-xs font-semibold">Verificado</span>
    </div>
  );
};
