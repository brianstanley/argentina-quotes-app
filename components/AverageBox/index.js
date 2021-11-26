const AverageBox = ({ price, title }) => {
  return (
    <div className="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded">
      <div className="p-5">
        <div>
          <p className="text-3xl font-semibold text-center text-gray-800">
            ${price}
          </p>
          <p className="text-lg text-center text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  )
}

export default AverageBox
