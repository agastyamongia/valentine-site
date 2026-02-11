import React from 'react';
import DomeGallery from '../components/DomeGallery';

// Import your photos
import img0382 from '../assets/IMG_0382.jpeg';
import img0441 from '../assets/IMG_0441.jpeg';
import img0487 from '../assets/IMG_0487.jpeg';
import img1002 from '../assets/IMG_1002.jpeg';
import img1343 from '../assets/IMG_1343.PNG';
import img5396 from '../assets/IMG_5396.jpeg';
import img5453 from '../assets/IMG_5453.jpeg';
import img5472 from '../assets/IMG_5472.jpeg';
import img5476 from '../assets/IMG_5476.jpeg';
import img5489 from '../assets/IMG_5489.jpeg';
import img6763 from '../assets/IMG_6763.jpeg';
import img6776 from '../assets/IMG_6776.jpeg';
import img6785 from '../assets/IMG_6785.jpeg';
import img6805 from '../assets/IMG_6805.jpeg';
import img6829 from '../assets/IMG_6829.jpeg';
import img6850 from '../assets/IMG_6850.jpeg';
import img6880 from '../assets/IMG_6880.jpeg';
import img6917 from '../assets/IMG_6917.jpeg';
import img8039 from '../assets/IMG_8039.jpeg';
import img8127 from '../assets/IMG_8127.jpeg';
import img8202 from '../assets/IMG_8202.JPG';

const GALLERY_IMAGES = [
    img0382, img0441, img0487, img1002, img1343,
    img5396, img5453, img5472, img5476, img5489,
    img6763, img6776, img6785, img6805, img6829,
    img6850, img6880, img6917, img8039, img8127, img8202,
];

interface GalleryScreenProps {
    visible: boolean;
    onBack?: () => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({ visible, onBack }) => {
    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-[#060010] z-50">
            {/* Back button */}
            <button
                onClick={onBack}
                className="absolute top-4 left-4 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-300 flex items-center gap-2 text-sm"
            >
                <span>←</span>
                <span>Back</span>
            </button>

            {/* Title */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-center">
                <h1 className="text-white/80 text-lg font-serif">Our Memories</h1>
                <p className="text-white/40 text-xs mt-1">Drag to explore</p>
            </div>

            {/* Dome Gallery */}
            <DomeGallery
                fit={1}
                segments={20}
                images={GALLERY_IMAGES}
                overlayBlurColor="#060010"
                grayscale={false}
                dragSensitivity={200}
            />
        </div>
    );
};
