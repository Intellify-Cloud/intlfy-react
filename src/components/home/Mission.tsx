interface MissionProps {
  title: string
  paragraphs: string[]
}

export const Mission = ({ title, paragraphs }: MissionProps) => {
  return (
    <div id="mission" className="py-24 px-6 w-full bg-white dark:bg-black border-y border-gray-100 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* We present this not as a boring list, but as a bold statement */}
        <div className="w-full text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-orange-600 dark:text-orange-500 uppercase">
            {title}
          </h2>
          <div className="w-16 h-1 mt-6 bg-orange-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="w-full md:w-3/4 lg:w-2/3 space-y-10">
          {paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={`text-xl md:text-2xl lg:text-[26px] text-center leading-relaxed ${
                index === 0 
                  ? "text-gray-900 dark:text-white font-semibold" 
                  : "text-gray-600 dark:text-gray-400 font-light"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        
      </div>
    </div>
  )
}
