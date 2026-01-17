import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { MapView } from '../components/organisms/MapView';
import { JobDetailSheet } from '../components/molecules/JobDetailSheet';
import { JobListItem } from '../components/molecules/JobListItem';
import { BottomSheet } from '../components/molecules/BottomSheet';
import { CreateJobModal } from '../components/organisms/CreateJobModal';
import { SideMenu } from '../components/organisms/SideMenu'; // Added import
import { type Job } from '../components/molecules/JobCard'; 
import { Button } from '../components/atoms/Button';
import { AnimatePresence } from 'framer-motion';
import { Plus, ListFilter, Menu } from 'lucide-react'; // Added Menu icon

const Dashboard: React.FC = () => {
    const { token } = useAuth();
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    
    // UI State
    const [isListOpen, setIsListOpen] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Added Menu State

    const fetchJobs = async () => {
        try {
            const response = await axios.get('http://localhost:3000/jobs', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const adaptedJobs = response.data.map((j: any) => ({
                id: j.id,
                title: j.title,
                description: j.description,
                price: j.price,
                location: { lat: j.location.coordinates[1], lng: j.location.coordinates[0] },
                status: j.status,
                employer: { 
                    name: 'Usuario Verificado', 
                    isVerified: true, 
                    rating: 4.8 + (Math.random() * 0.2) // Mock random high rating
                }
            }));
            setJobs(adaptedJobs);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                console.error("Error getting location", error);
                setUserLocation({ lat: 19.4326, lng: -99.1332 }); 
            }
        );
        fetchJobs();
    }, [token]);

    const handleAcceptJob = async () => {
        if (!selectedJob) return;
        
        const confirm = window.confirm("¿Estás seguro de que quieres aceptar este trabajo? Debes cumplirlo en el tiempo acordado.");
        if (!confirm) return;

        try {
             await axios.post(`http://localhost:3000/jobs/${selectedJob.id}/accept`, {}, {
                 headers: { Authorization: `Bearer ${token}` }
             });
             
             // Update local state
             setJobs(prev => prev.map(j => j.id === selectedJob.id ? { ...j, status: 'IN_PROGRESS' } : j));
             setSelectedJob(prev => prev ? { ...prev, status: 'IN_PROGRESS' } : null);
             
             alert("¡Trabajo Aceptado! Dirígete a la ubicación.");
        } catch (err) {
            console.error(err);
            alert("Error al aceptar el empleo");
        }
    };

    const handleSelectJob = (job: Job) => {
        setSelectedJob(job);
        setIsListOpen(false); // Close list to show detail
    };

    const handleCloseDetail = () => {
        setSelectedJob(null);
        setIsListOpen(true); // Re-open list
    };

    return (
        <div className="h-screen w-screen relative overflow-hidden bg-white">
            
            {/* Side Menu */}
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            {/* Map Background */}
            <div className="absolute inset-0 z-0">
                <MapView 
                    userLocation={userLocation} 
                    jobs={jobs} 
                    onSelectJob={handleSelectJob} 
                />
            </div>

            {/* Header / Top Bar */}
            <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <div className="flex justify-between items-start pointer-events-auto">
                     {/* Menu Button */}
                     <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="p-3 bg-white rounded-full shadow-lg text-gray-700 hover:bg-gray-50 active:scale-95 transition-transform"
                     >
                        <Menu size={24} />
                     </button>

                    <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mt-1">
                        <span className="text-sm font-bold text-gray-800">📍 Tu Ubicación Actual</span>
                    </div>
                </div>
            </div>

            {/* FAB - Publicar Empleo */}
            <div className="absolute bottom-24 right-4 z-30 md:top-24 md:bottom-auto">
                 <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="shadow-xl rounded-full w-14 h-14 !p-0 flex items-center justify-center bg-black hover:bg-gray-800 border-[3px] border-white"
                 >
                     <Plus className="text-white" size={28} />
                 </Button>
            </div>

            {/* Create Job Modal */}
            <CreateJobModal 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                userLocation={userLocation}
                onJobCreated={fetchJobs}
            />

            {/* Bottom Sheet - Job List */}
            {/* Hidden if a job is selected to allow DetailSheet to take over */}
            {!selectedJob && (
                <BottomSheet isOpen={isListOpen}>
                    <div className="sticky top-0 bg-white z-10 pb-2 border-b border-gray-100 mb-2">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-800">{jobs.length} Empleos Cercanos</h2>
                            <button className="p-2 text-gray-400 hover:text-gray-600">
                                <ListFilter size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="space-y-0">
                        {jobs.length === 0 ? (
                            <div className="p-8 text-center text-gray-400">
                                <p>No hay empleos disponibles en esta zona.</p>
                            </div>
                        ) : (
                            jobs.map(job => (
                                <JobListItem 
                                    key={job.id} 
                                    job={job} 
                                    onClick={() => handleSelectJob(job)} 
                                />
                            ))
                        )}
                    </div>
                </BottomSheet>
            )}

            {/* Job Detail Sheet (Modal replacement) */}
            <AnimatePresence>
                {selectedJob && (
                    <JobDetailSheet 
                        job={selectedJob}
                        onClose={handleCloseDetail}
                        onAccept={handleAcceptJob}
                        onChat={() => alert("Chat próximamente")}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default Dashboard;
