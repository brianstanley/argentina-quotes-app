import Link from "next/link";

const Sidebar = () => {
    return (
        <ul className="space-y-10">
            <li>
                <Link href="/">
                    <a
                        className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="none"
                             className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                        </svg>
                        Home</a>
                </Link>
            </li>
            <li>
                <Link href="/endpoints">
                    <a
                        className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg"  className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                        </svg>
                        Endpoints</a>
                </Link>
            </li>
            <li>
                <a href="#"
                   className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                    /quotes</a>
            </li>
            <li>
                <a href="#"
                   className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    /averages</a>
            </li>
            <li>
                <a href="#"
                   className="flex items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                    </svg>
                    /slippage</a>
            </li>
        </ul>
    );
};

export default Sidebar;