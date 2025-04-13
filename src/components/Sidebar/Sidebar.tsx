import React, { useState, useEffect } from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import {
  ArchiveBoxIcon,
  UserIcon,
  BriefcaseIcon,
  LightBulbIcon,
  ClipboardDocumentCheckIcon,
  TagIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import './Sidebar.css';

// La propiedad isVisible ya no es necesaria ya que la visibilidad se maneja desde CSS
interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { 
    categories, 
    tags, 
    activeCategory, 
    setActiveCategory, 
    activeTag, 
    setActiveTag,
    notes
  } = useNotesStore();
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Para contar las notas por categoría y etiqueta
  const categoryCount = categories.reduce((acc, category) => {
    acc[category] = notes.filter(note => note.category === category).length;
    return acc;
  }, {} as Record<string, number>);
  
  const tagCount = tags.reduce((acc, tag) => {
    acc[tag] = notes.filter(note => note.tags?.includes(tag)).length;
    return acc;
  }, {} as Record<string, number>);
  
  const allNotesCount = notes.length;

  // Detectar cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Solo usamos la clase collapsed para el caso móvil
  let sidebarClasses = 'sidebar';
  if (isCollapsed && isMobile) sidebarClasses += ' collapsed';

  // Función para obtener el icono según la categoría
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Personal':
        return <UserIcon className="category-icon" />;
      case 'Work':
        return <BriefcaseIcon className="category-icon" />;
      case 'Ideas':
        return <LightBulbIcon className="category-icon" />;
      case 'Tasks':
        return <ClipboardDocumentCheckIcon className="category-icon" />;
      default:
        return <ArchiveBoxIcon className="category-icon" />;
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={sidebarClasses}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Filtros</h2>
        {isMobile && (
          <button onClick={toggleCollapse} className="collapse-button">
            {isCollapsed ? <ChevronDownIcon width={16} height={16} /> : <ChevronUpIcon width={16} height={16} />}
          </button>
        )}
      </div>
      
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <h3 className="sidebar-section-title">CATEGORÍAS</h3>
        </div>
        <ul className="categories-list">
          <li 
            className={activeCategory === null ? 'active' : ''}
            onClick={() => setActiveCategory(null)}
          >
            <ArchiveBoxIcon className="category-icon" />
            <span className="category-name">Todas</span>
            <span className="category-count">{allNotesCount}</span>
          </li>
          {categories.map(category => (
            <li 
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {getCategoryIcon(category)}
              <span className="category-name">{category}</span>
              <span className="category-count">{categoryCount[category] || 0}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <h3 className="sidebar-section-title">
            <TagIcon className="section-icon" />
            ETIQUETAS
          </h3>
        </div>
        <div className="tags-list">
          <span 
            className={`tag ${activeTag === null ? 'active' : ''}`}
            onClick={() => setActiveTag(null)}
          >
            Todas
          </span>
          {tags.map(tag => (
            <span 
              key={tag} 
              className={`tag ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
              <span className="tag-count">{tagCount[tag] || 0}</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;