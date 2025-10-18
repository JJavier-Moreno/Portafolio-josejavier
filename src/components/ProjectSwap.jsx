// src/components/ProjectSwap.jsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectWindow from './ProjectWindow.jsx'; // <--- 1. Importa el nuevo componente

export default function ProjectSwap({ projects }) {
  if (!projects || projects.length === 0) {
    return <div className="text-white">No hay proyectos para mostrar.</div>;
  }

  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find(p => p.id === activeId);
  const activeIndex = projects.findIndex(p => p.id === activeId);

  return (
    <div className="grid items-start grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
      
      {/* === COLUMNA IZQUIERDA (Descripción + Stack) === */}
      <div className="space-y-10 md:col-span-2">
        
        {/* --- 1. Área de Descripción --- */}
        <div className="relative min-h-[150px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <h3 className="mb-3 text-3xl font-bold text-green-400">{activeProject.title}</h3>
              <p className="text-lg leading-relaxed text-gray-200">{activeProject.description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- 2. Stack de Tarjetas (Animación) --- */}
        <div 
          className="relative flex items-center justify-center h-64 md:h-96"
          style={{ perspective: '1000px' }}
        >
          {projects.map((project, index) => {
            const offset = index - activeIndex;

            return (
              <motion.div
                key={project.id}
                className="absolute w-full h-full max-w-lg" // <--- 2. Quita clases de 'overflow-hidden', 'border', etc.
                style={{
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  scale: index === activeIndex ? 1 : 0.85,
                  rotateY: offset * -10,
                  translateZ: index === activeIndex ? 0 : -Math.abs(offset) * 60,
                  zIndex: projects.length - Math.abs(offset),
                  opacity: index === activeIndex ? 1 : 0.4
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              >
                {/* --- 3. USA EL COMPONENTE ProjectWindow.jsx AQUÍ --- */}
                <ProjectWindow 
                  image={project.image}
                  title={project.title}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === COLUMNA DERECHA (Navegación) === */}
      <nav className="md:col-span-1 flex flex-col space-y-4 md:mt-[150px]">
        {projects.map(project => (
          <button
            key={project.id}
            onMouseEnter={() => setActiveId(project.id)}
            className={`
              p-4 text-left rounded-lg border-2 transition-all duration-300 ease-in-out
              ${activeId === project.id 
                ? 'bg-black-700 border-green-500 scale-105 shadow-lg'
                : 'text-gray-400 border-transparent hover:text-white hover:bg-black-800'
              }
            `}
          >
            <span className="text-xl font-semibold text-white">{project.navTitle || project.title}</span>
            <p className={`text-sm mt-1 ${activeId === project.id ? 'text-gray-300' : 'text-gray-500'}`}>
              Ver detalles
            </p>
          </button>
        ))}
      </nav>
    </div>
  );
}