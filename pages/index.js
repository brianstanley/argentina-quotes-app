export default function Home() {
  return (
    <section className=" pb-32 text-gray-700">
      <div className="title text-center text-gray-400 p-8 text-3xl md:text-5xl ">
        Pluggy.ai Challenge <br />
      </div>
      <div className="flex justify-center flex-wrap">
        <div className="flex flex-col items-center p-8 bg-white shadow-lg rounded mx-8 mb-8 flex-1 mb-8 md:mb-0  md:w-1/3 sm:flex-initial">
          <img
            src="https://ca.slack-edge.com/TP18SFFM5-U02N1B35VLK-05dc3f4cca7c-512"
            className="rounded-full h-32 w-32 "
            alt=""
          />
          <h1 className="text-indigo-500 text-4xl my-4  ">Brian Stanley</h1>
          <p className=" text-center px-8 mb-8  ">
            Hi everyone! I am a SSR software developer skilled at frontend and
            backend solutions. I have experience designing, developing, and
            implementing applications and solutions. If you want to know more
            visit my{' '}
            <a
              href="https://github.com/pluggyai/full-stack-engineer-assignment"
              className="font-bold underline"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>{' '}
            or{' '}
            <a
              href="https://www.linkedin.com/in/briancarlosstanley/"
              className=" font-bold underline"
              target="_blank"
              rel="noreferrer"
            >
              Linkedin
            </a>
          </p>
        </div>
        <div className="flex flex-col justify-between mx-8 md:mx-0 md:w-1/4 ">
          <div className="flex flex-col bg-white rounded p-4 items-center shadow-lg border-r-8 border-green-200 mb-4 md:mb-auto">
            <h2 className="font-bold   ">Requirements</h2>
            <p className="p-4 break-words  text-gray-600">
              <a
                href="https://github.com/pluggyai/full-stack-engineer-assignment"
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                https://github.com/pluggyai/full-stack-engineer-assignment
              </a>
            </p>
          </div>
          <div className="flex flex-col bg-white rounded p-4 items-center shadow-lg border-r-8 border-green-200">
            <h2 className="font-bold">About</h2>
            <p className="p-4 text-gray-600">
              I built this challenge using NextJS + React. I deployed to Vercel
              in order to serve the API endpoints as Serverless Functions. Hope
              you enjoy it!
            </p>
            <div className="sm:block md:flex mt-1 justify-between ">
              <div className="pill font-bold bg-gray-400 rounded-full text-xs px-4 py-1 mr-2">
                #React
              </div>
              <div className="pill font-bold bg-gray-400 rounded-full text-xs px-4 py-1 mr-2">
                #TailwindCSS
              </div>
              <div className="pill font-bold bg-gray-400 rounded-full text-xs px-4 py-1 mr-2">
                #SWR
              </div>
            </div>
            <div className="sm:block mt-1 md:flex justify-between ">
              <div className="pill font-bold bg-gray-400 rounded-full text-xs px-4 py-1 mr-2">
                #NextJS
              </div>
              <div className="pill font-bold bg-gray-400 rounded-full text-xs px-4 py-1 mr-2">
                #Vercel
              </div>
              <div className="pill font-bold bg-gray-400 rounded-full text-xs px-4 py-1 mr-2">
                #Mongo
              </div>
            </div>
            <div className="sm:block mt-1 md:flex justify-between ">
              <div className="pill font-bold bg-gray-400 rounded-full text-xs px-4 py-1 mr-2">
                #Puppeteer
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
