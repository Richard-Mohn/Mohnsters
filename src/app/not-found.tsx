import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white font-sans text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-purple-500">404</h1>
      <p className="mt-3 text-2xl md:text-3xl font-light text-gray-300">
        Page Not Found
      </p>
      <div className="mt-8 max-w-xl">
        <p className="text-lg text-gray-400">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
      </div>
      <Link href="/" className="mt-8 px-6 py-3 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900">
        Go Back Home
      </Link>
    </div>
  );
}
