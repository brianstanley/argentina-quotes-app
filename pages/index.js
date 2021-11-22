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
                    <div className="py-4 px-8 bg-white shadow-lg rounded-lg ">
                        <div className="flex justify-center md:justify-end -mt-16">
                            <img className="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
                                 src="https://ca.slack-edge.com/TP18SFFM5-U02N1B35VLK-05dc3f4cca7c-512" />
                        </div>
                        <div>
                            <h2 className="text-gray-800 text-3xl font-semibold">About</h2>
                            <p className="mt-2 text-gray-600">
                                Hi everyone! I built this challenge Using NextJS + React. I deployed to Vercel in order to serve the API endpoints as Serverless Functions.
                                Hope you enjoy it!.
                            </p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <a href="#" className="text-xl font-medium text-indigo-500">Brian</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
