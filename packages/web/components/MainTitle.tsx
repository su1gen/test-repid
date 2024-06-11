import MainTitleUserButton from '@/components/MainTitleUserButton';

export default function MainTitle() {
    return <div className="relative text-center">
        <span className="text-3xl text-gray-600">RepID is a single sign-on to platforms</span>
        <div className="relative sm:absolute right-1 z-10 top-3 sm:mt-0">
            <MainTitleUserButton />
        </div>
    </div>
}