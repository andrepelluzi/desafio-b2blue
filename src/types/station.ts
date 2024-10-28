export interface Station {
  id: number;
  name: string;
  fillPercentage: number;
  lastCollected: Date;
  status: 'normal' | 'warning' | 'collection-needed' | 'collecting';
}