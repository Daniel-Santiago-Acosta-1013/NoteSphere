import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note } from '../types/note';
import { v4 as uuidv4 } from 'uuid';

interface NotesState {
  notes: Note[];
  categories: string[];
  tags: string[];
  activeNote: Note | null;
  searchQuery: string;
  activeCategory: string | null;
  activeTag: string | null;
  
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setActiveNote: (note: Note | null) => void;
  togglePinNote: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: string | null) => void;
  setActiveTag: (tag: string | null) => void;
  addCategory: (category: string) => void;
  addTag: (tag: string) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      categories: ['Personal', 'Work', 'Ideas', 'Tasks'],
      tags: ['important', 'pending', 'completed'],
      activeNote: null,
      searchQuery: '',
      activeCategory: null,
      activeTag: null,
      
      addNote: (note) => 
        set((state) => {
          const now = new Date();
          const newNote: Note = {
            ...note,
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
            isPinned: note.isPinned || false,
          };
          return { 
            notes: [...state.notes, newNote],
            activeNote: newNote
          };
        }),
      
      updateNote: (id, updatedNote) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, ...updatedNote, updatedAt: new Date() }
              : note
          ),
        })),
      
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          activeNote: state.activeNote?.id === id ? null : state.activeNote,
        })),
      
      setActiveNote: (note) => set({ activeNote: note }),
      
      togglePinNote: (id) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, isPinned: !note.isPinned } : note
          ),
        })),
        
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setActiveCategory: (category) => set({ activeCategory: category }),
      
      setActiveTag: (tag) => set({ activeTag: tag }),
      
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, category],
        })),
        
      addTag: (tag) =>
        set((state) => ({
          tags: [...state.tags, tag],
        })),
    }),
    {
      name: 'notes-storage',
    }
  )
);