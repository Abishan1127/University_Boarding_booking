// AdPopup.tsx
import { useEffect, useState } from "react";
import "./AdPopup.css";
import add from "../../assets/add3.png";
const AdPopup = () => {
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAd(true);
        }, 3000);
            setShowAd(false);
            
        
        return () => clearTimeout(timer);
    }, []);

    return (
        showAd && (
            <div className="ad-container">
                <span className="close-btn" onClick={() => setShowAd(false)}>&times;</span>
                <img src= {add} alt="Advertisement" />
            </div>
        )
    );
};

export default AdPopup;
