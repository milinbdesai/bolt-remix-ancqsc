import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { mockCourses } from "~/lib/mock-data";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUser(request, ["instructor"]);
  const course = mockCourses.find((c) => c.id === params.courseId);
  
  if (!course) {
    throw new Response("Course not found", { status: 404 });
  }

  return json({ course });
}

export default function CoursePreview() {
  const { course } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <span className="text-sm text-gray-500">Preview Mode</span>
        <h1 className="mt-2 text-3xl font-bold">{course.title}</h1>
        <p className="mt-4 text-gray-600">{course.description}</p>
        
        <div className="mt-4 flex gap-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {course.size} course
          </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
            {course.level}
          </span>
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800">
            {course.duration} hours
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {course.modules.map((module, index) => (
          <div key={module.id} className="rounded-lg border bg-white p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-medium">
                {index + 1}
              </span>
              <h2 className="text-xl font-semibold">{module.title}</h2>
            </div>

            <div className="mt-4 pl-12">
              <p className="text-gray-600">{module.content}</p>

              {module.resources.length > 0 && (
                <div className="mt-4">
                  <h3 className="mb-2 font-medium">Resources:</h3>
                  <ul className="space-y-2">
                    {module.resources.map((resource) => (
                      <li
                        key={resource.id}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <ResourceIcon type={resource.type} />
                        {resource.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResourceIcon({ type }: { type: string }) {
  switch (type) {
    case 'video':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
      );
    case 'document':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'quiz':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
}