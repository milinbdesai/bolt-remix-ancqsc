import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mockCourses } from "~/lib/mock-data";
import type { Course } from "~/lib/types";

export async function loader() {
  return json({ courses: mockCourses });
}

export default function Courses() {
  const { courses } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Available Courses</h1>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800">
      <div className="mb-4">
        <span className={`rounded-full px-3 py-1 text-sm ${getSizeClass(course.size)}`}>
          {course.size.charAt(0).toUpperCase() + course.size.slice(1)}
        </span>
      </div>
      <h2 className="mb-2 text-xl font-semibold">{course.title}</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{course.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{course.duration} hours</span>
        <span className={`rounded-full px-3 py-1 text-sm ${getLevelClass(course.level)}`}>
          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
        </span>
      </div>
    </div>
  );
}

function getSizeClass(size: Course['size']) {
  switch (size) {
    case 'small':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-blue-100 text-blue-800';
    case 'large':
      return 'bg-purple-100 text-purple-800';
  }
}

function getLevelClass(level: Course['level']) {
  switch (level) {
    case 'beginner':
      return 'bg-gray-100 text-gray-800';
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'advanced':
      return 'bg-red-100 text-red-800';
  }
}