import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "BLI - Breakthrough Leadership Initiative" },
    { name: "description", content: "Specialized Learning Management System for Promact Leaders" },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Breakthrough Leadership Initiative
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Empowering Promact's Leaders Through Specialized Learning
          </p>
          
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/courses">Browse Courses</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            title="Leadership Courses"
            description="Access curated courses designed specifically for leadership development"
          />
          <FeatureCard
            title="Expert Instructors"
            description="Learn from experienced leaders and industry experts"
          />
          <FeatureCard
            title="Flexible Learning"
            description="Choose from small, medium, and large courses to fit your schedule"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
      <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}