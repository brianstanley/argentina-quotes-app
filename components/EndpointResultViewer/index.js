import SyntaxHighlighter from 'react-syntax-highlighter'
import { useGet } from '../../useRequest'
import Loading from '../shared/loading'

const EndpointResultViewer = ({ path }) => {
  const { data, error, isValidating, mutate } = useGet(path)
  if (error) return <h2>Oops something went wrong.</h2>

  return (
    <div className="transition-all duration-150 flex max-w-md min-w-full px-2 py-6 sm:w-full lg:w-1/3">
      <div className="flex min-w-full flex-col items-stretch  pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="font-bold uppercase">
            {path}{' '}
            <span
              className={
                'rounded-full text-white text-xs px-4 py-1 ' +
                (isValidating ? 'bg-yellow-200' : 'bg-green-500')
              }
            >
              {isValidating ? 'Fetching...' : 'Ok'}
            </span>
          </div>
          {data && (
            <div className="text-gray-500 text-sm mt-1">
              Last update at {data[1]}
            </div>
          )}
        </div>
        <div className="p-6 bg-white border-b border-gray-200 h-3/4 break-words">
          {!data && <Loading />}
          {data && data.length > 0 && (
            <SyntaxHighlighter
              className="min-h-full max-h-full"
              language="json"
            >
              {JSON.stringify(data[0], undefined, 2)}
            </SyntaxHighlighter>
          )}
        </div>
        <div className="p-6 bg-white border-gray-200 text-right">
          <button
            className="bg-blue-500 shadow-md text-sm text-white font-bold py-3 md:px-8 px-4 hover:bg-blue-400 rounded uppercase"
            onClick={() => {
              mutate()
            }}
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default EndpointResultViewer
