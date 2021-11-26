const QuoteBox = ({ index, value, time }) => {
  return (
    <div
      key={index}
      className="flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded"
    >
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3 mb-md-5">
          <div className="title-wrapper mr-2">
            <h1 className="text-xl font-bold">
              <a href="" target="">
                {value.quote.source_name}
              </a>
            </h1>
            <h2 className="text-sm leading-tight mb-2">
              Blue quote <i className="fas fa-external-link-alt"></i>
            </h2>
          </div>
          <div className="flex w-full text-md">
            <div className="flex w-7/12">
              <div className="flex-1 pr-3 text-left font-semibold">
                <p
                  className={
                    'flex items-center  text-md ' +
                    (value.buy_price_slippage > 0
                      ? ' text-green-500 '
                      : ' text-red-500')
                  }
                >
                  <span className="font-bold text-3xl">
                    {value.buy_price_slippage}%
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="heroicon-ui"
                      d={getSvgIconPath(value.buy_price_slippage)}
                    />
                  </svg>
                </p>
              </div>
            </div>
            <div className="flex w-7/12">
              <div className="flex-1 pl-3 text-left font-semibold">
                <p
                  className={
                    'flex items-center  text-md ' +
                    (value.sell_price_slippage >= 0
                      ? ' text-green-500 '
                      : ' text-red-500')
                  }
                >
                  <span className="font-bold text-3xl">
                    {value.sell_price_slippage}%
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="heroicon-ui"
                      d={getSvgIconPath(value.sell_price_slippage)}
                    />
                  </svg>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full text-md">
          <div className="flex w-7/12">
            <div className="flex-1 pr-3 text-left font-semibold">Buy Price</div>
            <div className="flex-1 px-3 text-right font-bold  text-lg">
              {value.quote.buy_price}
            </div>
          </div>
          <div className="flex w-7/12">
            <div className="flex-1 px-3 text-left font-semibold">
              Sell Price
            </div>
            <div className="flex-1 pl-3 text-right font-bold  text-lg">
              {value.quote.sell_price}
            </div>
          </div>
        </div>
        <div className="flex w-full text-md">
          <div className="flex w-7/12">
            <p className="text-sm leading-tight mb-2">Last sync at {time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const getSvgIconPath = (slippage) => {
  if (slippage > 0) {
    return 'M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z'
  } else if (slippage < 0) {
    return 'M20 9a1 1 0 012 0v8a1 1 0 01-1 1h-8a1 1 0 010-2h5.59L13 10.41l-3.3 3.3a1 1 0 01-1.4 0l-6-6a1 1 0 011.4-1.42L9 11.6l3.3-3.3a1 1 0 011.4 0l6.3 6.3V9z'
  }
  return 'M17 11a1 1 0 010 2H7a1 1 0 010-2h10z'
}

export default QuoteBox
