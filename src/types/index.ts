export type Position = 'GOALKEEPER' | 'DEFENDER' | 'FORWARD' | 'UTILITY';
export type Cohort = 'YEAR_2' | 'YEAR_3';
export type Availability = 'AVAILABLE' | 'UNAVAILABLE';
export type Selected = 'Yes' | 'No';

export interface Player {
  PlayerID: string;
  Student: string;
  Position: Position;
  Cohort: Cohort;
  Availability: Availability;
  Selected: Selected;
}

export interface ValidationCounts {
  size: number;
  goalkeeper: number;
  defender: number;
  forward: number;
  utility: number;
  YEAR_2: number;
  YEAR_3: number;
}

export interface ValidationResult {
  status: 'VALID' | 'INVALID';
  violations: string[];
  counts: ValidationCounts;
}
