export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          About <span className="text-blue-600">Product Explorer</span>
        </h1>
        <p className="text-xl text-gray-600">
          A full-stack web scraping and product exploration platform
        </p>
      </div>

      {/* Mission */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🎯 Our Mission</h2>
        <p className="leading-relaxed text-blue-100">
          Product Explorer is a modern web application that helps users discover and explore books 
          from World of Books. We provide an intuitive interface to browse categories, view detailed 
          product information, and make informed purchasing decisions. All data is scraped in real-time
          using cutting-edge web scraping technology.
        </p>
      </div>

      {/* Tech Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            🚀 Frontend Stack
          </h3>
          <ul className="space-y-3">
            {[
              { name: 'Next.js 14', desc: 'React Framework with App Router' },
              { name: 'TypeScript', desc: 'Type-safe development' },
              { name: 'Tailwind CSS', desc: 'Utility-first styling' },
              { name: 'SWR/Fetch', desc: 'Data fetching & caching' },
            ].map((tech) => (
              <li key={tech.name} className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <span className="font-semibold text-gray-900">{tech.name}</span>
                  <p className="text-sm text-gray-500">{tech.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            ⚙️ Backend Stack
          </h3>
          <ul className="space-y-3">
            {[
              { name: 'NestJS', desc: 'Node.js framework' },
              { name: 'Prisma ORM', desc: 'Database toolkit' },
              { name: 'SQLite', desc: 'Lightweight database' },
              { name: 'Crawlee + Playwright', desc: 'Web scraping engine' },
            ].map((tech) => (
              <li key={tech.name} className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <div>
                  <span className="font-semibold text-gray-900">{tech.name}</span>
                  <p className="text-sm text-gray-500">{tech.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6">✨ Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            '📚 Browse book categories',
            '🔍 View detailed product information',
            '⭐ Read customer reviews & ratings',
            '📱 Fully responsive design',
            '⚡ Fast loading with skeleton states',
            '🔗 Direct links to World of Books',
            '🎨 Modern, clean UI/UX',
            '♿ Accessibility compliant',
          ].map((feature) => (
            <div key={feature} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* API Status */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">🔌 System Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-3xl mb-2">🟢</div>
            <h4 className="font-semibold text-gray-900">Frontend</h4>
            <p className="text-green-600 text-sm">Operational</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-3xl mb-2">🟢</div>
            <h4 className="font-semibold text-gray-900">Backend API</h4>
            <p className="text-green-600 text-sm">Operational</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="text-3xl mb-2">🟢</div>
            <h4 className="font-semibold text-gray-900">Database</h4>
            <p className="text-green-600 text-sm">Connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}