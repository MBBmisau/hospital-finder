import Searchbar from "@/components/Searchbar";
import bgImage from "@/images/bgImage.jpeg"

const Hero = () => {
  return (
    <div className="w-full mx-auto bg-transparent z-10 text-center m-0 p-0">
      <h1 className="text-orange-500 font-black text-xs sm:text-base">Find the Care You Need, Where You Need It</h1>
      <p className="mt-4 text-2xl md:text-3xl lg:text-4xl font-medium text-slate-300">Search for hospitals near you and get instant access to their details, locations, and more.</p>
    </div>
  )
}

function Home() {
  return (
    <div className='flex items-center justify-center h-screen bg-no-repeat bg-cover w-full'
      style={{backgroundImage: `url(${bgImage.src})`}}
    >
      <div className="absolute inset-0 z-0 bg-black/65 bg-bottom h-full" aria-hidden="true" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col gap-y-10 m-0 max-w-2xl h-full w-full px-4">
        <Hero />
        <Searchbar />
      </div>
    </div>
  )
}

export default Home

