import { useState } from 'react'
import { useNotesStore } from './store/useNotesStore'
import './App.css'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import NotesList from './components/NotesList/NotesList'
import CreateNoteForm from './components/CreateNoteForm/CreateNoteForm'
import NoteDetail from './components/NoteDetail/NoteDetail'
import Modal from './components/Modal/Modal'
import PwaPrompt from './components/PwaPrompt/PwaPrompt'
import OfflineReady from './components/OfflineReady/OfflineReady'

function App() {
  const {
    activeNote,
    setActiveNote,
    deleteNote,
    togglePinNote
  } = useNotesStore()

  // Estado para controlar la apertura del modal de creación de notas
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  
  // Estado para controlar la visibilidad del sidebar
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible)

  // Función para manejar el éxito de creación de nota
  const handleNoteCreated = () => {
    closeCreateModal()
  }
  
  // Determinar clase para el main
  const mainClasses = isSidebarVisible ? '' : 'sidebar-hidden'

  return (
    <div className="note-app">
      <Header 
        onCreateNote={openCreateModal} 
        onToggleSidebar={toggleSidebar}
        showSidebarToggle={true}
      />
      
      <main className={mainClasses}>
        <Sidebar />
        
        <div className="content-area">
          <NotesList />
        </div>

        {/* Modal para crear notas */}
        <Modal 
          isOpen={isCreateModalOpen} 
          onClose={closeCreateModal}
          title="Crear Nueva Nota"
          footer={
            <>
              <button 
                className="btn btn-secondary"
                onClick={closeCreateModal}
              >
                Cancelar
              </button>
            </>
          }
        >
          <CreateNoteForm onSuccess={handleNoteCreated} />
        </Modal>

        {/* Componente de detalle de nota */}
        {activeNote && (
          <div className="note-detail-wrapper">
            <NoteDetail 
              note={activeNote}
              onClose={() => setActiveNote(null)}
              onDelete={deleteNote}
              onTogglePin={togglePinNote}
            />
          </div>
        )}
      </main>

      {/* Componentes PWA */}
      <PwaPrompt />
      <OfflineReady />
    </div>
  )
}

export default App
