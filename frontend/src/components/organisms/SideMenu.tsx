import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Wallet, Settings, HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface SideMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
    const { logout } = useAuth(); 
    const navigate = useNavigate();
    // Mock user data for now - In a real app, this comes from useAuth().user
    const user = {
        name: 'Usuario Demo',
        email: 'usuario@ejemplo.com',
        avatar: null
    };
    const balance = 1500.00;

    const handleNavigation = (path: string) => {
        onClose(); // Close menu first
        // Small delay to allow menu closing animation to start nicely? 
        // Or immediate navigation.
        navigate(path);
    };

    const menuItems = [
        { icon: User, label: 'Mi Cuenta', action: () => handleNavigation('/account') },
        { icon: Wallet, label: 'Billetera / Saldo', action: () => handleNavigation('/wallet'), badge: `$${balance.toFixed(2)}` },
        { icon: Settings, label: 'Configuración', action: () => handleNavigation('/settings') },
        { icon: HelpCircle, label: 'Soporte y Ayuda', action: () => handleNavigation('/support') },
        { icon: FileText, label: 'Términos y Condiciones', action: () => handleNavigation('/terms') },
    ];
    
    // Header Profile Click -> Account page too
    const handleProfileClick = () => {
        handleNavigation('/account');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-[2px]"
                    />
                    
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }}
                        className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-gray-50 z-[51] shadow-2xl flex flex-col font-sans"
                    >
                        {/* Header Profile */}
                        <div className="bg-white p-6 pt-12 text-gray-800 shadow-sm relative z-10 cursor-pointer" onClick={handleProfileClick}>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onClose(); }} 
                                className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col gap-3">
                                <div className="w-20 h-20 bg-gradient-to-tr from-green-400 to-green-600 text-white rounded-full flex items-center justify-center font-bold text-3xl shadow-lg ring-4 ring-green-50">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl leading-tight">{user.name}</h2>
                                    <div className="flex items-center gap-1 opacity-60">
                                        <span className="text-sm">⭐️ 4.9</span>
                                        <span className="text-xs">•</span>
                                        <span className="text-sm">Usuario Verificado</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">{user.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Balance Card Section - "Rappi Prime" style */}
                         <div className="px-4 py-6 pb-2">
                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Finanzas</h3>
                             <div 
                                onClick={() => handleNavigation('/wallet')}
                                className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl shadow-lg p-5 text-white flex justify-between items-center group cursor-pointer hover:shadow-xl transition-all"
                             >
                                <div>
                                    <p className="text-xs text-gray-400 font-medium mb-1">Saldo Disponible</p>
                                    <p className="text-2xl font-bold tracking-tight">${balance.toFixed(2)}</p>
                                </div>
                                <div className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="flex-1 overflow-y-auto px-4 space-y-1 pb-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-4 px-2">General</h3>
                            {menuItems.map((item, idx) => (
                                <button 
                                    key={idx}
                                    onClick={item.action}
                                    className="w-full flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100/50 hover:border-green-200 hover:shadow-md transition-all active:scale-[0.98] group"
                                >
                                    <div className="text-gray-400 group-hover:text-green-600 bg-gray-50 group-hover:bg-green-50 p-2 rounded-lg transition-colors">
                                        <item.icon size={20} />
                                    </div>
                                    <span className="flex-1 text-left text-gray-700 font-semibold text-sm">{item.label}</span>
                                    {item.badge && !item.label.includes('Saldo') && (
                                        <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-full shadow-sm shadow-red-200">{item.badge}</span>
                                    )}
                                     <ChevronRight size={16} className="text-gray-300 group-hover:text-green-400 transition-colors" />
                                </button>
                            ))}
                        </div>

                        {/* Footer / Logout */}
                        <div className="p-6 bg-white border-t border-gray-100 mt-auto">
                            <button 
                                onClick={logout} 
                                className="w-full flex items-center justify-center gap-2 p-3 text-red-500 bg-red-50 hover:bg-red-100 rounded-xl font-bold text-sm transition-colors"
                            >
                                <LogOut size={18} />
                                Cerrar Sesión
                            </button>
                            <p className="text-center text-[10px] text-gray-300 mt-4">v1.2.0 (Build 5032)</p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
