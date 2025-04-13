import React from 'react';
import { Note } from '../../types/note';
import { formatDate } from '../../utils/dateUtils';
import { TagIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import './NoteCard.css';

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  onPinToggle: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, onPinToggle }) => {
  const handlePinClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evitar que se propague al click de la tarjeta
    onPinToggle(note.id);
  };

  return (
    <div 
      className={`note-card ${note.isPinned ? 'pinned' : ''}`}
      onClick={onClick}
    >
      <div className="note-header">
        <h3>{note.title}</h3>
        <button 
          className={`pin-button ${note.isPinned ? 'pinned' : ''}`}
          onClick={handlePinClick}
          aria-label={note.isPinned ? 'Desfijar nota' : 'Fijar nota'}
        >
          {note.isPinned ? <StarIconSolid className="pin-icon" /> : <StarIcon className="pin-icon" />}
        </button>
      </div>
      
      <div className="note-content">
        {note.content}
      </div>
      
      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              <TagIcon className="tag-icon" />
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && <span className="tag">+{note.tags.length - 3}</span>}
        </div>
      )}
      
      <div className="note-footer">
        <span className="note-category">{note.category}</span>
        <span className="note-date">{formatDate(note.updatedAt)}</span>
      </div>
    </div>
  );
};

export default NoteCard;