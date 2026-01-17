import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const TermsPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm p-4 sticky top-0 z-10 flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-xl font-bold">Términos y Condiciones</h1>
            </div>
            
            <div className="p-6 max-w-lg mx-auto bg-white min-h-[calc(100vh-80px)] mt-4 rounded-xl shadow-sm prose prose-sm prose-gray">
                <h3>1. Introducción</h3>
                <p>Bienvenido a nuestra plataforma de empleos temporales. Al usar nuestros servicios, aceptas estos términos.</p>
                
                <h3>2. Uso de la Plataforma</h3>
                <p>Te comprometes a usar la aplicación de manera legal y ética. No está permitido el contenido ofensivo o fraudulento.</p>
                
                <h3>3. Pagos y Tarifas</h3>
                <p>Los pagos se procesan a través de proveedores seguros. Cobramos una comisión del 10% sobre cada trabajo completado.</p>
                
                <h3>4. Privacidad</h3>
                <p>Respetamos tu privacidad. Tus datos de ubicación solo se comparten con el empleador cuando aceptas un trabajo activo.</p>
                
                <h3>5. Responsabilidad</h3>
                <p>No nos hacemos responsables por disputas directas entre usuarios, aunque ofrecemos un servicio de mediación.</p>
                
                <div className="h-8"></div>
                <p className="text-xs text-gray-400 text-center">Última actualización: Enero 2026</p>
            </div>
        </div>
    );
};

export default TermsPage;