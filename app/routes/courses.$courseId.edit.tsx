import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { mockCourses } from "~/lib/mock-data";
import { Button } from "~/components/ui/button";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUser(request, ["instructor"]);
  const course = mockCourses.find((c) => c.id === params.courseId);
  
  if (!course) {
    throw new Response("Course not found", { status: 404 });
  }

  return json({ course });
}

export async function action({ request }: ActionFunctionArgs) {
  await requireUser(request, ["instructor"]);
  const formData = await request.formData();
  
  // In a real app, this would update the database
  return redirect("/dashboard/instructor");
}

export default function EditCourse() {
  const { course } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Edit Course: {course.title}</h1>
      
      <div className="mb-8 space-y-6">
        <Form method="post" className="space-y-6">
          {/* Course Details Form */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Course Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={course.title}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              defaultValue={course.description}
              rows={4}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Save Changes</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </div>
        </Form>

        {/* Modules Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Course Modules</h2>
            <Button asChild>
              <Link to={`/courses/${course.id}/modules/new`}>
                Add Module
              </Link>
            </Button>
          </div>
          
          <div className="mt-4 space-y-4">
            {course.modules.map((module) => (
              <div
                key={module.id}
                className="rounded-lg border p-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{module.title}</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/courses/${course.id}/modules/${module.id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link to={`/courses/${course.id}/modules/${module.id}/resources`}>
                        Manage Resources
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}