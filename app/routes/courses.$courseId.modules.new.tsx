import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { Button } from "~/components/ui/button";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request, ["instructor"]);
  return null;
}

export async function action({ request, params }: ActionFunctionArgs) {
  await requireUser(request, ["instructor"]);
  const formData = await request.formData();
  
  // In a real app, this would save to the database
  return redirect(`/courses/${params.courseId}/edit`);
}

export default function NewModule() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Add New Module</h1>
      
      <Form method="post" className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Module Title
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
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={6}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700"
          >
            Module Order
          </label>
          <input
            type="number"
            name="order"
            id="order"
            min="1"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Create Module</Button>
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