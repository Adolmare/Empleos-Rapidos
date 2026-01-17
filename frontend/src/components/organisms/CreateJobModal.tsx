import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../atoms/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: { lat: number, lng: number } | null;
  onJobCreated?: () => void;
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, userLocation, onJobCreated }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({ title: '', description: '', price: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    if (!userLocation) {
        setError('Necesitamos tu ubicación para publicar un empleo.');
        return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        location: {
            type: 'Point',
            coordinates: [userLocation.lng, userLocation.lat] // GeoJSON is [lon, lat]
        }
      };

      await axios.post('http://localhost:3000/jobs', payload, {
          headers: { Authorization: `Bearer ${token}` }
      });

      // Reset and close
      setFormData({ title: '', description: '', price: '' });
      if (onJobCreated) onJobCreated();
      onClose();
      alert('Empleo publicado con éxito');
    } catch (err: any) {
      console.error(err);
      setError('Error al crear el empleo. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden"
          >
            <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-bold text-gray-800">Publicar Nuevo Empleo</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                    <X size={20} />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {error && <div className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</div>}
                
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Título</label>
                    <input 
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="Ej. Podar jardín frontal"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Descripción</label>
                    <textarea 
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px]"
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        placeholder="Detalles del trabajo..."
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Pago Ofrecido ($)</label>
                    <input 
                        type="number"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.price}
                        onChange={e => setFormData({...formData, price: e.target.value})}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="pt-2">
                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        Publicar Ahora
                    </Button>
                </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
