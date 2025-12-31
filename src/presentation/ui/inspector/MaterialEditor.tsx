/* --- src/presentation/ui/inspector/MaterialEditor.tsx --- */
import { Slider } from '@/presentation/components/Slider';
import { useViewerStore } from '@/core-engine/store/use-viewer';

export const MaterialEditor = () => {
  const { intensity, updateSettings } = useViewerStore();

  return (
    <div className="space-y-4">
      <Slider 
        label="Environment Intensity"
        value={intensity}
        min={0}
        max={5}
        onChange={(val) => updateSettings({ intensity: val })}
      />
    </div>
  );
};