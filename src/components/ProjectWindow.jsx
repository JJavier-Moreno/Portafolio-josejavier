// src/components/ProjectWindow.jsx
import React from 'react';

// Este es el reemplazo de React para tu 'ProjectWindow.astro'
export default function ProjectWindow({ image, title }) {
  // Si no hay imagen, muestra un placeholder
  if (!image) {
    return (
      <div className="flex items-center justify-center w-full h-full border-2 rounded-lg shadow-xl bg-black-800 border-black-700">
        <p className="text-gray-500">Imagen no disponible</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden border-2 rounded-lg shadow-xl bg-black-800 border-black-700">
      {/* Barra superior de la "ventana" */}
      <div className="flex items-center flex-shrink-0 h-8 px-3 bg-black-700/50">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 px-4 text-xs font-medium text-center text-gray-400 truncate">
          {title || 'project-window'}
        </div>
      </div>
      
      {/* Contenido (la imagen) */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <img 
          src={image} 
          alt={title || 'Proyecto'} 
          className="object-cover object-center w-full h-full" 
          loading="lazy" // Carga perezosa para mejorar rendimiento
        />
      </div>
    </div>
  );
}