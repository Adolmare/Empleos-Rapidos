import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '../components/atoms/Button';

const AccountPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Mi Cuenta</h1>
            </div>
            
            <div className="p-4 space-y-6 max-w-lg mx-auto">
                <div className="flex flex-col items-center py-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative mb-4">
                         <User size={40} className="text-gray-400" />
                         <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white shadow-lg">
                            <Camera size={16} />
                         </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Usuario Demo</h2>
                    <p className="text-gray-500">usuario@ejemplo.com</p>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                        <User className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Nombre Completo</p>
                            <p className="font-medium text-gray-900">Usuario Demo</p>
                        </div>
                    </div>
                    <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                        <Mail className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Correo Electrónico</p>
                            <p className="font-medium text-gray-900">usuario@ejemplo.com</p>
                        </div>
                    </div>
                    <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                        <Phone className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Teléfono</p>
                            <p className="font-medium text-gray-900">+52 55 1234 5678</p>
                        </div>
                    </div>
                    <div className="p-4 flex items-center gap-3">
                        <MapPin className="text-gray-400" size={20} />
                        <div>
                            <p className="text-xs text-gray-500">Ciudad</p>
                            <p className="font-medium text-gray-900">Ciudad de México, MX</p>
                        </div>
                    </div>
                </div>

                <Button className="w-full" variant="secondary">Editar Perfil</Button>
            </div>
        </div>
    );
};

export default AccountPage;