import EndpointResultViewer from "../components/EndpointResultViewer";
import {useGet} from "../useRequest";

const Page = () => {
    const { quotes, error } = useGet("/quotes")
    if (error) return <h1>Something went wrong!</h1>
    if (!quotes) return <h1>Loading...</h1>
    return (
        <section className="flex flex-row flex-wrap mx-auto">
            <EndpointResultViewer quote={quotes[0]} />
            <EndpointResultViewer quote={quotes[1]} />
            <EndpointResultViewer quote={quotes[2]} />
        </section>
    );
}

export default Page;