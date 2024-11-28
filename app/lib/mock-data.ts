import type { Course, User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.instructor@promact.com',
    name: 'John Smith',
    role: 'instructor',
  },
  {
    id: '2',
    email: 'sarah.admin@promact.com',
    name: 'Sarah Johnson',
    role: 'admin',
  },
  {
    id: '3',
    email: 'mike.student@promact.com',
    name: 'Mike Brown',
    role: 'student',
  },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Strategic Leadership in Digital Transformation',
    description: 'Learn how to lead digital transformation initiatives and drive organizational change.',
    size: 'large',
    instructorId: '1',
    duration: 40,
    level: 'advanced',
    modules: [
      {
        id: 'm1',
        title: 'Understanding Digital Transformation',
        content: 'Overview of digital transformation and its impact on organizations',
        order: 1,
        resources: [
          {
            id: 'r1',
            title: 'Digital Transformation Framework',
            type: 'document',
            url: '/resources/dt-framework.pdf',
          },
          {
            id: 'r2',
            title: 'Case Study: Successful Digital Transformation',
            type: 'video',
            url: '/resources/case-study-video.mp4',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Emotional Intelligence for Leaders',
    description: 'Develop emotional intelligence skills essential for effective leadership',
    size: 'medium',
    instructorId: '1',
    duration: 20,
    level: 'intermediate',
    modules: [
      {
        id: 'm1',
        title: 'Understanding Emotional Intelligence',
        content: 'Introduction to emotional intelligence and its components',
        order: 1,
        resources: [
          {
            id: 'r1',
            title: 'EI Assessment Tool',
            type: 'quiz',
            url: '/resources/ei-assessment',
          },
        ],
      },
    ],
  },
];