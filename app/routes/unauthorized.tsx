export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900">Unauthorized Access</h1>
      <p className="mt-4 text-lg text-gray-600">
        You don't have permission to access this page.
      </p>
    </div>
  );
}