import React, { useState, useEffect } from 'react';
import './OfflineReady.css';

interface OfflineReadyProps {
  onClose?: () => void;
}

const OfflineReady: React.FC<OfflineReadyProps> = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Verificar si esta es la primera vez que se carga la aplicación
    const isFirstVisit = !localStorage.getItem('notesphere_visited');
    const isAppInstalled = window.matchMedia('(display-mode: standalone)').matches;
    
    // Solo mostrar el mensaje si la aplicación está en modo standalone (instalada)
    // o si es la primera visita
    if (isAppInstalled || isFirstVisit) {
      setVisible(true);
      localStorage.setItem('notesphere_visited', 'true');
    }

    // Ocultar después de 5 segundos
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div className="offline-ready-banner">
      <div className="offline-ready-content">
        <span className="offline-ready-icon">✓</span>
        <p>NoteSphere está lista para usar sin conexión</p>
      </div>
      <button className="offline-ready-close" onClick={handleClose}>
        ×
      </button>
    </div>
  );
};

export default OfflineReady; 