
export interface PlantReminder {
  id: string;
  plantId: string;
  plantName: string;
  type: ReminderType;
  frequency: number; // In days
  nextDue: string; // ISO date string
  notes?: string;
  enabled: boolean;
  lastCompleted?: string; // ISO date string
}

export type ReminderType = 'water' | 'fertilize' | 'prune' | 'repot' | 'check' | 'other';

export const reminderTypeLabels: Record<ReminderType, string> = {
  water: 'Water Plant',
  fertilize: 'Apply Fertilizer',
  prune: 'Prune Plant',
  repot: 'Repot Plant',
  check: 'Check Health',
  other: 'Custom Reminder'
};

export const defaultReminders: Record<string, Partial<PlantReminder>[]> = {
  'Herb': [
    { type: 'water', frequency: 2, notes: 'Keep soil slightly moist' },
    { type: 'fertilize', frequency: 30, notes: 'Use liquid herb fertilizer' }
  ],
  'Vegetable': [
    { type: 'water', frequency: 1, notes: 'Water thoroughly' },
    { type: 'fertilize', frequency: 14, notes: 'Use balanced vegetable fertilizer' }
  ],
  'Succulent': [
    { type: 'water', frequency: 14, notes: 'Water sparingly, allow soil to dry completely' },
    { type: 'fertilize', frequency: 90, notes: 'Use cactus fertilizer at half strength' }
  ],
  'Medicinal': [
    { type: 'water', frequency: 3, notes: 'Maintain consistent moisture' },
    { type: 'fertilize', frequency: 45, notes: 'Use natural organic fertilizer' }
  ],
  'Indoor Plant': [
    { type: 'water', frequency: 7, notes: 'Check soil moisture before watering' },
    { type: 'fertilize', frequency: 60, notes: 'Use indoor plant fertilizer' },
    { type: 'check', frequency: 14, notes: 'Check for pests and dust on leaves' }
  ]
};
