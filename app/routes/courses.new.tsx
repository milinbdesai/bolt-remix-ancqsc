import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { Button } from "~/components/ui/button";
import type { ActionFunctionArgs } from "@remix-run/node";

export async function loader({ request }: ActionFunctionArgs) {
  await requireUser(request, ["instructor"]);
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  await requireUser(request, ["instructor"]);
  const formData = await request.formData();
  
  // In a real app, this would save to a database
  // For now, we'll just redirect back to the dashboard
  return redirect("/dashboard/instructor");
}

export default function NewCourse() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Create New Course</h1>
      
      <Form method="post" className="space-y-6">
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
            rows={4}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="size"
            className="block text-sm font-medium text-gray-700"
          >
            Course Size
          </label>
          <select
            name="size"
            id="size"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="small">Small (1-5 hours)</option>
            <option value="medium">Medium (5-20 hours)</option>
            <option value="large">Large (20+ hours)</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Difficulty Level
          </label>
          <select
            name="level"
            id="level"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Create Course</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}