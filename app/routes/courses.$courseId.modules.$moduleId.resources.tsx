import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { mockCourses } from "~/lib/mock-data";
import { Button } from "~/components/ui/button";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUser(request, ["instructor"]);
  const course = mockCourses.find((c) => c.id === params.courseId);
  const module = course?.modules.find((m) => m.id === params.moduleId);
  
  if (!module) {
    throw new Response("Module not found", { status: 404 });
  }

  return json({ module });
}

export default function ModuleResources() {
  const { module } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">
        Manage Resources: {module.title}
      </h1>

      <div className="space-y-6">
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <div>
            <label
              htmlFor="resourceType"
              className="block text-sm font-medium text-gray-700"
            >
              Resource Type
            </label>
            <select
              name="resourceType"
              id="resourceType"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="video">Video</option>
              <option value="document">Document (PDF)</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Resource Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload File
            </label>
            <input
              type="file"
              name="file"
              id="file"
              accept=".pdf,video/*"
              className="mt-1 block w-full"
            />
          </div>

          <Button type="submit">Add Resource</Button>
        </Form>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Current Resources</h2>
          <div className="space-y-4">
            {module.resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-medium">{resource.title}</h3>
                  <p className="text-sm text-gray-500">Type: {resource.type}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                  <Button variant="destructive" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}