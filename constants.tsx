
import React from 'react';
import { PresetEnhancement } from './types';

export const PRESET_ENHANCEMENTS: PresetEnhancement[] = [
  {
    id: 'linkedin-standard',
    label: 'Full LinkedIn Professional',
    prompt: 'Enhance this photo for a professional LinkedIn profile. Keep it natural and approachable: adjust lighting for clarity, ensure the subject is well-framed and in focus, refine skin tones subtly. Change background to a soft-focus clean professional office environment. Maintain a friendly, confident expression with a gentle, warm smile and relaxed eyes. Dress the subject in smart-casual attire.',
    icon: '👔'
  },
  {
    id: 'lighting-only',
    label: 'Pro Studio Lighting',
    prompt: 'Improve the lighting to look like a professional studio portrait. Brighten the face, remove harsh shadows, and add a soft backlight for depth. Keep everything else natural.',
    icon: '💡'
  },
  {
    id: 'background-blur',
    label: 'Clean Office BG',
    prompt: 'Replace the background with a blurred, clean, modern office interior or a minimalist neutral gray wall. Keep the person perfectly sharp and in focus.',
    icon: '🏢'
  },
  {
    id: 'smart-casual',
    label: 'Dress Up (Smart Casual)',
    prompt: 'Subtly update the subject\'s attire to a professional smart-casual look, like a button-down shirt or a blazer. Ensure the fit looks natural and consistent with the original body shape.',
    icon: '👕'
  },
  {
    id: 'friendly-smile',
    label: 'Friendly Warm Smile',
    prompt: 'Subtly adjust the facial expression to convey approachability and confidence with a gentle, warm, and professional smile. Keep the change natural and realistic.',
    icon: '😊'
  }
];
