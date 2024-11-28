import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { mockCourses } from "~/lib/mock-data";
import { Button } from "~/components/ui/button";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request, ["instructor"]);
  const instructorCourses = mockCourses.filter(
    (course) => course.instructorId === user.id
  );
  return json({ user, courses: instructorCourses });
}

export default function InstructorDashboard() {
  const { user, courses } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Instructor Dashboard</h1>
          <Button asChild>
            <Link to="/courses/new">Create New Course</Link>
          </Button>
        </div>

        <div className="grid gap-6">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">Your Courses</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <h3 className="mb-2 font-semibold">{course.title}</h3>
                  <p className="mb-4 text-sm text-gray-600">
                    {course.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/courses/${course.id}/edit`}>
                        Edit Course
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/courses/${course.id}/preview`}>
                        Preview
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}