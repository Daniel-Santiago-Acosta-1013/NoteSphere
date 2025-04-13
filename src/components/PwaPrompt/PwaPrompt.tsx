import React, { useState, useEffect } from 'react';
import './PwaPrompt.css';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

const PwaPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevenir el prompt automático
      e.preventDefault();
      // Guardar el evento para usarlo después
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Mostrar nuestro propio prompt
      setShowPrompt(true);
    };

    const handleOnlineStatusChange = () => {
      setIsOffline(!navigator.onLine);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Mostrar el prompt
    deferredPrompt.prompt();

    // Esperar por la elección del usuario
    const choiceResult = await deferredPrompt.userChoice;

    // Ya no necesitamos el prompt
    setDeferredPrompt(null);
    setShowPrompt(false);

    // Registrar la respuesta
    if (choiceResult.outcome === 'accepted') {
      console.log('Usuario aceptó instalar la PWA');
    } else {
      console.log('Usuario rechazó instalar la PWA');
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
  };

  if (!showPrompt && !isOffline) return null;

  return (
    <div className="pwa-prompt">
      {isOffline && (
        <div className="offline-notification">
          <span className="offline-icon">⚠️</span>
          <p>Estás en modo offline. Algunas funciones pueden no estar disponibles.</p>
        </div>
      )}
      
      {showPrompt && (
        <div className="install-prompt">
          <div className="prompt-content">
            <div className="prompt-header">
              <h3>Instala NoteSphere</h3>
              <button className="close-button" onClick={dismissPrompt}>×</button>
            </div>
            <p>Instala nuestra aplicación para una mejor experiencia:</p>
            <ul>
              <li>Acceso más rápido</li>
              <li>Funciona sin conexión</li>
              <li>Ocupa menos espacio</li>
            </ul>
            <div className="prompt-actions">
              <button className="install-button" onClick={handleInstallClick}>
                Instalar
              </button>
              <button className="dismiss-button" onClick={dismissPrompt}>
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PwaPrompt; 