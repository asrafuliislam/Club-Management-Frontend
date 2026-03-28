import Hero from '../../components/Home/Hero'
import FeaturedClubs from '../../components/Home/FeaturedClubs'
import UpcomingEvents from '../../components/Home/UpcomingEvents'
import HowItWorks from '../../components/Home/HowItWorks'
import CallToAction from '../../components/Home/CallToAction'

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero — big headline + stats */}
      <Hero />

      {/* 2. How It Works — 3-step explainer */}
      <HowItWorks />

      {/* 3. Featured Clubs — from API */}
      <FeaturedClubs />

      {/* 4. Upcoming Events — from API */}
      <UpcomingEvents />

      {/* 5. CTA Banner */}
      <CallToAction />
    </div>
  )
}

export default Home
