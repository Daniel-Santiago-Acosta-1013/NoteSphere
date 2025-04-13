import React, { useState } from 'react';
import { useNotesStore } from '../../store/useNotesStore';
import { 
  TagIcon, 
  PlusCircleIcon, 
  DocumentTextIcon,
  ExclamationCircleIcon 
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
  
  // Estados para validación
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: {
      title?: string;
      content?: string;
    } = {};
    
    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
    } else if (title.length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres';
    }
    
    if (!content.trim()) {
      newErrors.content = 'El contenido es obligatorio';
    } else if (content.length < 10) {
      newErrors.content = 'El contenido debe tener al menos 10 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    if (!validateForm()) {
      return;
    }
    
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
    setFormSubmitted(false);
    setErrors({});
    
    // Notificar éxito
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, value: string, field: keyof typeof errors) => {
    setter(value);
    if (formSubmitted) {
      validateForm();
    } else if (errors[field]) {
      setErrors({...errors, [field]: undefined});
    }
  };

  return (
    <form className="create-note-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header">
        <DocumentTextIcon className="form-icon" />
        <h3>Crea una nueva nota</h3>
      </div>
      
      <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
        <label htmlFor="title">Título <span className="required">*</span></label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => handleInputChange(setTitle, e.target.value, 'title')}
          placeholder="Título de la nota"
          className={`form-control ${errors.title ? 'input-error' : ''}`}
          required
        />
        {errors.title && (
          <div className="error-message">
            <ExclamationCircleIcon className="error-icon" />
            {errors.title}
          </div>
        )}
      </div>
      
      <div className={`form-group ${errors.content ? 'has-error' : ''}`}>
        <label htmlFor="content">Contenido <span className="required">*</span></label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => handleInputChange(setContent, e.target.value, 'content')}
          placeholder="Contenido de la nota..."
          className={`form-control ${errors.content ? 'input-error' : ''}`}
          rows={6}
          required
        ></textarea>
        {errors.content && (
          <div className="error-message">
            <ExclamationCircleIcon className="error-icon" />
            {errors.content}
          </div>
        )}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Categoría <span className="required">*</span></label>
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