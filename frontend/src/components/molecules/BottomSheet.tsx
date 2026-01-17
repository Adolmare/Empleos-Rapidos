import React from 'react';
import { motion } from 'framer-motion';

interface BottomSheetProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
    snapPoints?: number[]; // Percentage of screen height, e.g. [0.4, 0.9]
    initialSnap?: number; // Index of initial snap point
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ 
    isOpen, 
    children, 
}) => {
    // Simple implementation: 
    // If not open, hidden.
    // If open, slides up to a fixed height or max-height.
    // We'll mimic a "drawer" that is always partially visible if "isOpen" logic was different, 
    // but here we might treat it as "List List Mode" vs "Detail Mode".
    
    // Actually, for the "Rappi" style list, usually there is a collapsed view (just the handle or small list) and expanded.
    // For this prompt, I'll make a persistent sheet for the Job List that can be toggled to full height.
    
    return (
        <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none flex flex-col justify-end h-full"> 
             {/* This container covers the screen but lets clicks through to map unless on the sheet */}
             
             <motion.div
                initial={{ y: "100%" }}
                animate={{ y: isOpen ? 0 : "85%" }} // 85% down means showing just the top tip? Or logic should be handled by parent?
                // Let's rely on parent passing "isOpen" as "Is Fully Visible".
                // Actually, for a list that is always accessible, we want it "peeking" by default.
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] w-full w-full max-h-[80vh] flex flex-col pointer-events-auto"
             >
                {/* Handle for dragging visual cue */}
                <div className="w-full h-6 flex items-center justify-center flex-shrink-0 cursor-grab active:cursor-grabbing border-b border-gray-50">
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </div>

                <div className="flex-1 overflow-y-auto p-4 pt-0">
                    {children}
                </div>
             </motion.div>
        </div>
    );
};
