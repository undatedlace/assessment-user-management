export type JobRole = 'tech' | 'id' | 'gd' | 'qa';

export interface User {
  id: string;
  username: string;
  email: string;
  'job-role': JobRole;
}