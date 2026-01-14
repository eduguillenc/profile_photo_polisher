
export interface ImageState {
  original: string | null;
  enhanced: string | null;
  loading: boolean;
  error: string | null;
}

export interface PresetEnhancement {
  id: string;
  label: string;
  prompt: string;
  icon: string;
}
