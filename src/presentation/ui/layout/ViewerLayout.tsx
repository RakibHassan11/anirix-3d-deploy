/* --- src/presentation/ui/layout/ViewerLayout.tsx --- */
import React from 'react';
import * as THREE from 'three'; // Import Three for proper typing
import { Viewport } from '@/core-engine/components/canvas/Viewport';
import { Sidebar } from '@/presentation/ui/inspector/Sidebar';

interface ViewerLayoutProps {
  children: React.ReactNode;
  /** * The 3D scene graph to be inspected. 
   * Typed as Object3D to support Groups, Scenes, or individual Meshes.
   */
  scene?: THREE.Object3D | null; 
  showInspector?: boolean;
}

export const ViewerLayout = ({ 
  children, 
  showInspector = false 
}: ViewerLayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-black overflow-hidden">
      {/* Primary 3D Viewport Area */}
      <div className="flex-1 relative">
        <Viewport>
          {children}
        </Viewport>
      </div>
      
      {/* Conditional Sidebar: Only rendered if showInspector is true */}
      {showInspector && (
        <Sidebar  />
      )}
    </div>
  );
};