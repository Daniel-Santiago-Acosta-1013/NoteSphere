import React from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  PlusIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import './Header.css';

interface HeaderProps {
  onCreateNote: () => void;
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  onCreateNote, 
  onToggleSidebar, 
  showSidebarToggle = false 
}) => {
  const { searchQuery, setSearchQuery } = useNotesStore();

  return (
    <header className="app-header">
      <div className="app-header-content">
        {showSidebarToggle && (
          <button 
            className="sidebar-toggle btn btn-icon"
            onClick={onToggleSidebar}
            aria-label="Alternar barra lateral"
          >
            <Bars3Icon className="icon" />
          </button>
        )}
        
        <div className="app-logo">
          <DocumentTextIcon className="logo-icon" />
          <span>NoteSphere</span>
        </div>
        
        <div className="search-bar">
          <MagnifyingGlassIcon className="search-icon" />
          <input
            type="text"
            placeholder="Buscar notas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="header-actions">
        <button 
          className="btn btn-primary" 
          onClick={onCreateNote}
          aria-label="Nueva nota"
        >
          <span>Nueva Nota</span>
          <PlusIcon className="icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;