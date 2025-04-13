import React from 'react';
import { Note } from '../../types/note';
import { formatDate, getRelativeTime } from '../../utils/dateUtils';
import {
  XMarkIcon,
  StarIcon,
  TrashIcon,
  CalendarIcon,
  ClockIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import './NoteDetail.css';

interface NoteDetailProps {
  note: Note;
  onClose: () => void;
  onDelete: (id: string) => void;
  onTogglePin: (id: string) => void;
}

const NoteDetail: React.FC<NoteDetailProps> = ({ note, onClose, onDelete, onTogglePin }) => {
  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
      onDelete(note.id);
      onClose();
    }
  };

  return (
    <div className="note-detail">
      <div className="note-detail-header">
        <h2>{note.title}</h2>
        <div className="note-actions">
          <button
            onClick={() => onTogglePin(note.id)}
            title={note.isPinned ? 'Desmarcar como favorita' : 'Marcar como favorita'}
            className={`action-button ${note.isPinned ? 'active' : ''}`}
            aria-label={note.isPinned ? 'Desmarcar como favorita' : 'Marcar como favorita'}
          >
            {note.isPinned ? <StarIconSolid className="icon" /> : <StarIcon className="icon" />}
          </button>
          <button
            onClick={handleDelete}
            title="Eliminar nota"
            className="action-button delete"
            aria-label="Eliminar nota"
          >
            <TrashIcon className="icon" />
          </button>
          <button
            onClick={onClose}
            title="Cerrar"
            className="action-button close"
            aria-label="Cerrar"
          >
            <XMarkIcon className="icon" />
          </button>
        </div>
      </div>

      <div className="note-meta">
        <div className="note-meta-item">
          <span className="meta-label">
            <CalendarIcon className="meta-icon" /> Creada
          </span>
          <span className="meta-value">{formatDate(note.createdAt)}</span>
        </div>
        <div className="note-meta-item">
          <span className="meta-label">
            <ClockIcon className="meta-icon" /> Actualizada
          </span>
          <span className="meta-value">{getRelativeTime(note.updatedAt)}</span>
        </div>
        <div className="note-meta-item">
          <span className="meta-label">Categoría</span>
          <span className="note-category">{note.category}</span>
        </div>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="note-tags-container">
          <h3 className="note-tags-title">
            <TagIcon className="tags-icon" /> Etiquetas
          </h3>
          <div className="note-tags">
            {note.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="note-content-full">
        {note.content}
      </div>
    </div>
  );
};

export default NoteDetail;