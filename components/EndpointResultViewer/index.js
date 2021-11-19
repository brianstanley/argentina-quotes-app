import SyntaxHighlighter from 'react-syntax-highlighter';
import {useGet} from "../../useRequest";

const EndpointResultViewer = ({path}) => {
    const {data, error } = useGet(path)
    if (error) return <h2>Oops something went wrong.</h2>;
    if (!data) return <h2>Loading</h2>
    return (
        <div
            className="transition-all duration-150 flex max-w-md px-2 py-6 md:w-1/2 lg:w-1/3"
        >
            <div
                className="flex min-w-full  flex-col items-stretch  pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl"
            >
                <div className="border-b border-gray-200 bg-white px-6 py-4">
                    <div className="font-bold uppercase">
                        {path}
                    </div>
                    <div className="text-gray-500 text-sm mt-1">Last update at {data[1]}</div>
                </div>

                <div
                    className="p-6 bg-white border-b border-gray-200 h-3/4 break-words"
                >
                    <SyntaxHighlighter className="min-h-full max-h-full" language="json" >
                        {JSON.stringify(data[0], undefined, 2)}
                    </SyntaxHighlighter>
                </div>
                <div className="p-6 bg-white border-gray-200 text-right">
                    <a className="bg-blue-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-blue-400 rounded uppercase"
                       href="#">Refresh</a>
                </div>
            </div>
        </div>
    );
}

export default EndpointResultViewer;