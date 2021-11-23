import Link from 'next/link'

const Sidebar = () => {
  return (
    <ul className="space-y-10">
      <li>
        <Link href="/">
          <a className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </a>
        </Link>
      </li>
      <li>
        <Link href="/endpoints">
          <a className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Endpoints
          </a>
        </Link>
      </li>
    </ul>
  )
}

export default Sidebar
