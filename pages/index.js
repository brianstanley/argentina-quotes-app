import EndpointResultViewer from "../components/EndpointResultViewer";

export default function Home() {
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-indigo-900 mt-">Hi welcome to my Code Challenge for Pluggy.ai</h1>
                </div>
            </div>
            <div>
                <div className="flex mt-10 space-x-10">
                    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
                        <div className="flex justify-center md:justify-end -mt-16">
                            <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                                 src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80" />
                        </div>
                        <div>
                            <h2 className="text-gray-800 text-3xl font-semibold">Design Tools</h2>
                            <p className="mt-2 text-gray-600">
                                Hi everyone! I built this challenge Using NextJS + React. I deployed to Vercel with serverless in order to serve the API endpoints.
                                Hope you enjoy it!.
                            </p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-xl font-medium text-indigo-500">Brian</a>
                        </div>
                    </div>
                </div>
            </div>
            <section className="flex flex-row flex-wrap mx-auto">
                <EndpointResultViewer />
            </section>
        </div>
    )
}
