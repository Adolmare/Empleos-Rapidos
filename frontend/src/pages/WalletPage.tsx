import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';
import { Button } from '../components/atoms/Button';

const WalletPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Billetera</h1>
            </div>
            
            <div className="p-4 space-y-6 max-w-lg mx-auto">
                
                {/* Balance Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
                    <p className="text-gray-400 text-sm mb-1">Saldo Disponible</p>
                    <h2 className="text-4xl font-bold mb-6">$1,500.00</h2>
                    <div className="flex gap-4">
                        <button className="flex-1 bg-white/10 hover:bg-white/20 py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                            <ArrowUpRight size={16} />
                            Ingresar
                        </button>
                        <button className="flex-1 bg-green-500 hover:bg-green-600 py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors text-white">
                            <ArrowDownLeft size={16} />
                            Retirar
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <h3 className="font-bold text-gray-800">Métodos de Pago</h3>
                <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                             <CreditCard size={20} />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Visa •••• 4242</p>
                            <p className="text-xs text-gray-500">Débito</p>
                        </div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium">Editar</button>
                </div>
                <Button variant="secondary" className="w-full text-sm">+ Agregar Método de Pago</Button>

                {/* History */}
                <div className="pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-800">Movimientos Recientes</h3>
                        <button className="text-blue-600 text-sm font-medium">Ver todos</button>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-50">
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <ArrowDownLeft size={18} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Pago por "Jardinería"</p>
                                    <p className="text-xs text-gray-500">Hoy, 10:23 AM</p>
                                </div>
                            </div>
                            <span className="font-bold text-green-600">+$450.00</span>
                        </div>
                        <div className="p-4 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                    <ArrowUpRight size={18} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Retiro a Cuenta</p>
                                    <p className="text-xs text-gray-500">Ayer, 04:30 PM</p>
                                </div>
                            </div>
                            <span className="font-bold text-gray-900">-$200.00</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WalletPage;