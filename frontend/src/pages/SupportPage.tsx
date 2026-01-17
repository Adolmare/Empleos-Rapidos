import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageCircle, HelpCircle, FileQuestion, Mail } from 'lucide-react';
import { Button } from '../components/atoms/Button';

const SupportPage: React.FC = () => {
    const navigate = useNavigate();

    const FaqItem = ({ question }: { question: string }) => (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-medium text-gray-800 mb-1">{question}</h4>
            <p className="text-sm text-gray-500">Toque para leer la respuesta...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Ayuda y Soporte</h1>
            </div>
            
            <div className="p-4 space-y-6 max-w-lg mx-auto">
                
                <div className="bg-blue-600 rounded-2xl p-6 text-white text-center">
                    <HelpCircle size={48} className="mx-auto mb-4 opacity-80" />
                    <h2 className="text-xl font-bold mb-2">¿Cómo podemos ayudarte?</h2>
                    <p className="text-blue-100 text-sm mb-6">Nuestro equipo de soporte está disponible 24/7 para resolver tus dudas.</p>
                    <div className="grid grid-cols-2 gap-3">
                         <button className="bg-white text-blue-600 py-3 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-1 hover:bg-blue-50 transition-colors">
                            <MessageCircle size={20} />
                            Chat en Vivo
                         </button>
                         <button className="bg-blue-700 text-white py-3 rounded-xl font-bold text-sm flex flex-col items-center justify-center gap-1 hover:bg-blue-800 transition-colors">
                            <Mail size={20} />
                            Enviar Correo
                         </button>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-4">Preguntas Frecuentes</h3>
                    <div className="space-y-3">
                        <FaqItem question="¿Cómo acepto un trabajo?" />
                        <FaqItem question="¿Cuándo recibiré mi pago?" />
                        <FaqItem question="¿Es seguro compartir mi ubicación?" />
                        <FaqItem question="¿Cómo verifico mi cuenta?" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SupportPage;