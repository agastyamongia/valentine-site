import React from 'react';
import africaVideo from '../assets/africa.mp4';

interface VideoScreenProps {
    visible: boolean;
    onBack: () => void;
}

export const VideoScreen: React.FC<VideoScreenProps> = ({ visible, onBack }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center animate-fade-in">
            {/* Back Button */}
            <button
                onClick={onBack}
                className="absolute top-6 left-6 px-4 py-2 text-accent hover:text-text transition-colors duration-300 flex items-center gap-2 font-medium"
            >
                <span className="text-lg">←</span> Back
            </button>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl font-serif text-text mb-6 text-center px-4">
                😆😆😆
            </h2>

            {/* Video Player */}
            <div className="w-[90vw] max-w-3xl rounded-2xl overflow-hidden shadow-2xl border border-accent/20">
                <video
                    src={africaVideo}
                    controls
                    autoPlay
                    className="w-full h-auto"
                    style={{ maxHeight: '70vh' }}
                >
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};
