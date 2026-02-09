import { states } from '@/lib/data';

export async function generateStaticParams() {
  return states.map((state) => ({
    state: state.abbr.toLowerCase(),
  }));
}

export default function StatePage({ params }: { params: { state: string } }) {
  const stateInfo = states.find(
    (s) => s.abbr.toLowerCase() === params.state
  );

  const stateName = stateInfo ? stateInfo.name : 'this state';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white font-sans">
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold">
          M<span className="text-purple-500">o</span>hnSt
          <span className="text-purple-500">e</span>rs in {stateName}
        </h1>
        <p className="mt-3 text-xl md:text-2xl font-light text-gray-300">
          The Premier Digital Collecting Platform.
        </p>

        <div className="mt-12 max-w-2xl">
          <p className="text-lg text-gray-400">
            Join thousands of collectors in {stateName} who are turning their
            physical cards into digital assets. Scan, battle, and trade your
            way to the top with the MohnSters ecosystem.
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center">
          <p className="font-semibold text-lg text-purple-400">
            Get Early Access in {stateName}.
          </p>
          <form className="mt-4 flex flex-col sm:flex-row w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow w-full sm:w-auto px-4 py-3 mb-3 sm:mb-0 sm:mr-3 text-white bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 font-bold text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </main>

    </div>
  );
}
