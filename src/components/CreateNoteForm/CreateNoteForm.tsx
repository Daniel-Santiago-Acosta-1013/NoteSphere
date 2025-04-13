import React, { useState } from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import { 
  TagIcon, 
  PlusCircleIcon, 
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import './CreateNoteForm.css';

interface CreateNoteFormProps {
  onSuccess?: () => void;
}

const CreateNoteForm: React.FC<CreateNoteFormProps> = ({ onSuccess }) => {
  const { addNote, categories } = useNotesStore();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(categories[0] || 'Personal');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    addNote({
      title,
      content,
      category,
      tags: tagsArray,
    });
    
    // Reiniciar formulario
    setTitle('');
    setContent('');
    setCategory(categories[0] || 'Personal');
    setTags('');
    
    // Notificar éxito
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form className="create-note-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <DocumentTextIcon className="form-icon" />
        <h3>Crea una nueva nota</h3>
      </div>
      
      <div className="form-group">
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la nota"
          className="form-control"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Contenido</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Contenido de la nota..."
          className="form-control"
          rows={6}
          required
        ></textarea>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="tags">
            <TagIcon className="input-icon" /> Etiquetas
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separadas por comas"
            className="form-control"
          />
        </div>
      </div>
      
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          <PlusCircleIcon className="button-icon" />
          Crear Nota
        </button>
      </div>
    </form>
  );
};

export default CreateNoteForm;