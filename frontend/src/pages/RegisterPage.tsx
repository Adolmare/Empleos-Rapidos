import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [location, setLocation] = useState<{lat: number | null, lng: number | null}>({lat: null, lng: null});
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = () => {
    setLocationStatus('loading');
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada por este navegador.');
      setLocationStatus('error');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationStatus('success');
      },
      (err) => {
        console.error(err);
        setError('No se pudo obtener la ubicación. Activa el GPS.');
        setLocationStatus('error');
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('password', formData.password);
      
      if (documentFile) {
        data.append('document', documentFile);
      }
      if (location.lat && location.lng) {
        data.append('latitude', location.lat.toString());
        data.append('longitude', location.lng.toString());
      }

      const response = await axios.post('http://localhost:3000/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.access_token) {
          login(response.data.access_token, response.data.user);
          navigate('/dashboard'); 
      } else {
          navigate('/login', { state: { message: 'Cuenta creada. Inicia sesión.' } });
      }

    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al registrarse. Verifica tus datos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Crear Cuenta</h2>
        <p className="text-center text-gray-500 mb-8">Únete a la plataforma de trabajo más rápida</p>

        {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Nombre Completo" 
            placeholder="Juan Pérez"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          
          <Input 
            label="Teléfono (Móvil)" 
            type="tel"
            placeholder="55 1234 5678"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <Input 
            label="Correo Electrónico" 
            type="email" 
            placeholder="ejemplo@correo.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="Mínimo 6 caracteres"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
          />
          
          <div className="pt-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Documento de Identidad (Opcional)</label>
            <input 
              type="file" 
              accept="image/*,.pdf"
              onChange={(e) => setDocumentFile(e.target.files ? e.target.files[0] : null)}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="pt-2">
             <label className="text-sm font-medium text-gray-700 mb-1 block">Ubicación (Para empleos cercanos)</label>
             <button
                type="button"
                onClick={handleGetLocation}
                className={`w-full py-2 px-4 rounded-lg text-sm border flex items-center justify-center gap-2 transition-colors ${
                    locationStatus === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
             >
                {locationStatus === 'loading' && 'Obteniendo ubicación...'}
                {locationStatus === 'success' && '✓ Ubicación Guardada'}
                {locationStatus === 'error' && 'Reintentar Ubicación'}
                {locationStatus === 'idle' && '📍 Usar mi ubicación actual'}
             </button>
          </div>

          <Button type="submit" className="w-full mt-4" isLoading={isLoading}>
            Registrarse y Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Inicia Sesión</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
