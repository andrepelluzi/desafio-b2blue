export interface Station {
  id: number;
  name: string;
  fillPercentage: number;
  lastCollected: Date | null;
  lastCollectionRequest: Date | null;
}