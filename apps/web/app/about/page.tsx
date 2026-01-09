export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">About Product Explorer</h1>
      
      <div className="bg-white rounded-lg shadow p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Product Explorer is a modern web application that helps users discover and explore books 
          from World of Books. We provide an intuitive interface to browse categories, view detailed 
          product information, and make informed purchasing decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-3">🚀 Technology Stack</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Frontend:</strong> Next.js 14, React, TypeScript</li>
            <li><strong>Styling:</strong> Tailwind CSS</li>
            <li><strong>Backend:</strong> NestJS, Node.js</li>
            <li><strong>Database:</strong> SQLite with Prisma ORM</li>
            <li><strong>Data Fetching:</strong> Native fetch API</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-3">✨ Features</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Browse book categories</li>
            <li>• View detailed product information</li>
            <li>• Read customer reviews</li>
            <li>• Responsive design</li>
            <li>• Fast loading with skeleton states</li>
            <li>• Direct links to World of Books</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Development</h4>
            <p className="text-gray-700">Built as a full-stack assignment</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Repository</h4>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              GitHub Repository
            </a>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">API Status</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              🟢 Operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}