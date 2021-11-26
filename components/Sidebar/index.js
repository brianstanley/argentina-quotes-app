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
        <Link href="/quotes">
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
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Quotes
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
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
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
