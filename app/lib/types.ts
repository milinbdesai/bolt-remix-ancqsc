export type UserRole = 'student' | 'instructor' | 'admin' | 'superadmin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  instructorId: string;
  modules: Module[];
  duration: number; // in hours
  level: 'beginner' | 'intermediate' | 'advanced';
}

export interface Module {
  id: string;
  title: string;
  content: string;
  order: number;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz';
  url: string;
}