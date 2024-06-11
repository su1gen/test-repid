import PlatformCard from '@/components/PlatformCard';
import ReshimLogo from '@/components/logos/ReshimLogo';
import HumanTalkLogo from '@/components/logos/HumanTalkLogo';
import SALogo from '@/components/logos/SALogo';
import CommunityLogo from '@/components/logos/CommunityLogo';
import Footer from '@/components/Footer';
import MainTitle from '@/components/MainTitle';
import { PlatformCardProps } from '@/app/types';

const platformCards: PlatformCardProps[] = [
  {
    Logo: ReshimLogo,
    link: 'https://reshim.org',
    linkText: 'reshim.org',
    description: 'Search for resources for humanitarian projects'
  },
  {
    Logo: HumanTalkLogo,
    link: 'https://human-talk.org',
    linkText: 'human-talk.org',
    description: 'The space of human communication'
  },
  {
    Logo: SALogo,
    link: 'https://sa.reshim.org',
    linkText: 'sa.reshim.org',
    description: 'Development of humanitarian strategies'
  },
  {
    Logo: CommunityLogo,
    link: 'https://community.reshim.org',
    linkText: 'community.reshim.org',
    description: 'Humanitarian Community Forum'
  },
]

export default function Home() {


  return <div className="max-w-7xl mx-auto p-6 lg:p-8 w-full">
    <MainTitle/>
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {platformCards.map((card, index) => {
          return <PlatformCard key={index}
                               Logo={card.Logo}
                               link={card.link}
                               linkText={card.linkText}
                               description={card.description}

          />
        })}
      </div>
    </div>
    <Footer/>
  </div>
}