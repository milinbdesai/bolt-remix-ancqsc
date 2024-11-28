import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { mockCourses } from "~/lib/mock-data";
import { Button } from "~/components/ui/button";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUser(request, ["instructor"]);
  const course = mockCourses.find((c) => c.id === params.courseId);
  const module = course?.modules.find((m) => m.id === params.moduleId);
  
  if (!module) {
    throw new Response("Module not found", { status: 404 });
  }

  return json({ module });
}

export default function ModuleQuiz() {
  const { module } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Create Quiz: {module.title}</h1>

      <Form method="post" className="space-y-8">
        <div className="rounded-lg border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Quiz Details</h2>
          
          <div className="space-y-4">
            <div>
              <label
                htmlFor="quizTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Quiz Title
              </label>
              <input
                type="text"
                name="quizTitle"
                id="quizTitle"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700"
              >
                Time Limit (minutes)
              </label>
              <input
                type="number"
                name="duration"
                id="duration"
                min="5"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="passingScore"
                className="block text-sm font-medium text-gray-700"
              >
                Passing Score (%)
              </label>
              <input
                type="number"
                name="passingScore"
                id="passingScore"
                min="0"
                max="100"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Questions</h2>
            <Button type="button" onClick={() => {/* Add question logic */}}>
              Add Question
            </Button>
          </div>

          <div className="space-y-6">
            {/* Question Template */}
            <div className="rounded border p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Question Text
                </label>
                <textarea
                  name="questions[0].text"
                  rows={2}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Options
                </label>
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="questions[0].correctAnswer"
                      value={index}
                      className="h-4 w-4 border-gray-300"
                    />
                    <input
                      type="text"
                      name={`questions[0].options[${index}]`}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder={`Option ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Save Quiz</Button>
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