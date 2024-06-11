import { PlatformCardProps } from '@/app/types';

export default function PlatformCard({Logo, link, linkText, description} : PlatformCardProps) {
    return (
        <a href={link}
           className="flex flex-col items-center scale-100 py-16 bg-white dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500">
            <div className="flex justify-center">
                <Logo />
            </div>
            <div className="text-center mt-5 text-gray-600" style={{maxWidth: '190px'}}>
                {description}
            </div>
            <div className="text-center mt-5 relative text-blue-500 text-2xl font-semibold w-full">
                {linkText}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     className="self-center shrink-0 stroke-blue-500 w-12 h-6 mx-6 absolute right-0 top-1">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"/>
                </svg>
            </div>
        </a>
    )
}