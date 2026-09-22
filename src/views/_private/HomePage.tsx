import { Card } from "~/shared/components/ui/card";

export function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Web App Template</h1>
        <p className="text-gray-600">
          This is a modern React application built with TypeScript, Vite, and Tailwind CSS.
        </p>
      </Card>
    </div>
  );
}