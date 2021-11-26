import { useGet } from '../useRequest'
import QuoteBox from '../components/QuoteBox'
import QuoteBoxPlaceholder from '../components/QuoteBoxPlaceholder'
import { providerConfig } from '../configs'
import AverageBox from '../components/AverageBox'

export default function Quotes() {
  const average = useGet('/average')
  const { data, error } = useGet('/slippage')
  if (!data) {
    const boxes = Object.keys(providerConfig).map((key) => (
      <QuoteBoxPlaceholder key={key} />
    ))
    return (
      <section className=" pb-32 text-gray-700">
        <div className="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
          {boxes}
          <QuoteBoxPlaceholder key="buy_price" />
          <QuoteBoxPlaceholder key="sell_price" />
        </div>
      </section>
    )
  }
  const items = []

  if (data) {
    const filtered = data[0].filter((quote) => !quote.quote.error)
    for (const [index, value] of filtered.entries()) {
      items.push(<QuoteBox key={index} value={value} time={data[1]} />)
    }
  }

  return (
    <section className=" pb-32 text-gray-700">
      <div className="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
        {items}
        {!average.data && <QuoteBoxPlaceholder key="sell_price" />}
        {!average.data && <QuoteBoxPlaceholder key="buy_price" />}
        {average && average.data && (
          <AverageBox
            key="buy"
            price={average.data[0].average_buy_price}
            title="Average buy price"
          />
        )}
        {average && average.data && (
          <AverageBox
            key="sell"
            price={average.data[0].average_sell_price}
            title="Average sell price"
          />
        )}
      </div>
    </section>
  )
}
