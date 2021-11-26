const QuoteBoxPlaceholder = () => {
  return (
    <div className="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded">
      <div className="p-5">
        <p className="h-3 mb-2 w-32 bg-gray-200 overflow-hidden relative"></p>
        <p className="h-2 mb-1 w-full bg-gray-200 overflow-hidden relative"></p>
        <p className="h-2 mb-1 w-full bg-gray-200 overflow-hidden relative"></p>
        <p className="h-2 mb-1 w-40 bg-gray-200 overflow-hidden relative"></p>
        <span className="h-6 mt-4 w-20 rounded-md bg-gray-200 overflow-hidden relative block"></span>
      </div>
    </div>
  )
}

export default QuoteBoxPlaceholder
