import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Lock, Moon, Globe, ChevronRight } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const navigate = useNavigate();

    const SettingItem = ({ icon: Icon, label, value, hasToggle }: any) => (
        <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <Icon size={20} />
                </div>
                <span className="font-medium text-gray-700">{label}</span>
            </div>
            {hasToggle ? (
                <div className="w-11 h-6 bg-gray-200 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full shadow absolute top-0.5 left-0.5"></div>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-sm">{value}</span>
                    <ChevronRight size={18} />
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Configuración</h1>
            </div>
            
            <div className="p-4 space-y-6 max-w-lg mx-auto">
                
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">Preferencias</h3>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <SettingItem icon={Bell} label="Notificaciones Push" hasToggle />
                        <SettingItem icon={Moon} label="Modo Oscuro" hasToggle />
                        <SettingItem icon={Globe} label="Idioma" value="Español" />
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 ml-2">Seguridad</h3>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <SettingItem icon={Lock} label="Cambiar Contraseña" />
                        <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 cursor-pointer transition-colors text-red-600">
                            <span className="font-medium">Eliminar Cuenta</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SettingsPage;