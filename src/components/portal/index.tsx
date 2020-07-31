import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const Portal: React.FC = ({children}) => {
    const [portalEl] = useState(document.createElement('div'));

    useEffect(() => {
        document.body.appendChild(portalEl);
        return () => {
            document.body.removeChild(portalEl);
        }
    }, [portalEl]);

    return createPortal(children, portalEl);
}

export default Portal;
