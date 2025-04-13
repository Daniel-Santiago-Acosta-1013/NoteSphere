import React from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import NoteCard from '../NoteCard/NoteCard';
import './NotesList.css';

const NotesList: React.FC = () => {
  const {
    notes,
    searchQuery,
    activeCategory,
    activeTag,
    setActiveNote,
    togglePinNote
  } = useNotesStore();

  // Filtering notes based on search, category, and tag
  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !activeCategory || note.category === activeCategory;
    
    const matchesTag = !activeTag || note.tags?.includes(activeTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  // Sort notes - pinned notes first, then by updatedAt date
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  // Group pinned and unpinned notes
  const pinnedNotes = sortedNotes.filter(note => note.isPinned);
  const unpinnedNotes = sortedNotes.filter(note => !note.isPinned);

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h2>Mis Notas</h2>
        <span className="notes-count">{sortedNotes.length} notas</span>
      </div>

      {sortedNotes.length === 0 ? (
        <div className="no-notes-message">
          <p>No se encontraron notas que coincidan con los filtros actuales.</p>
          <p>Crea una nueva nota usando el botón "Nueva Nota".</p>
        </div>
      ) : (
        <>
          {pinnedNotes.length > 0 && (
            <div className="notes-section">
              <div className="notes-section-header">
                <h3 className="notes-section-title">Fijadas</h3>
              </div>
              <div className="notes-grid">
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onClick={() => setActiveNote(note)}
                    onPinToggle={togglePinNote}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="notes-section">
            {pinnedNotes.length > 0 && (
              <div className="notes-section-header">
                <h3 className="notes-section-title">Otras Notas</h3>
              </div>
            )}
            <div className="notes-grid">
              {unpinnedNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onClick={() => setActiveNote(note)}
                  onPinToggle={togglePinNote}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotesList;