import { SSRHeader } from '@/components/layout/ssr-header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Users } from 'lucide-react';
import { Metadata } from 'next';
import { ModernHeroSection } from '@/components/home/modern-hero-section';

export const metadata: Metadata = {
  title: 'About Shubharambh Events - Our Story & Mission | Premium Event Management',
  description: 'Learn about Shubharambh Events & Management journey in creating memorable celebrations. Discover our mission to provide exceptional event planning services in Maharashtra.',
  keywords: 'About Shubharambh Events, event management company, wedding planners Maharashtra, event planning team, celebration experts, party organizers Sangli',
  openGraph: {
    title: 'About Shubharambh Events - Our Story & Mission',
    description: 'Learn about Shubharambh Events & Management journey in creating memorable celebrations and our mission to make every event special.',
    url: 'https://shubharambhevents.com/about',
  },
  alternates: {
    canonical: 'https://shubharambhevents.com/about',
  },
};

export default function About() {
  return (
    <div className="min-h-screen">
      <main>
        <div className="pt-32 pb-16 bg-gradient-to-br from-purple-50 via-white to-pink-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-black mb-6">
                <span className="text-gray-900">About</span>
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                  Shubharambh Events
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                We are passionate event planners dedicated to bringing your celebrations to life through 
                exceptional planning and flawless execution.
              </p>
            </div>
          </div>
        </div>


        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-gray-600">
                    To create unforgettable experiences through exceptional event planning that brings joy and lasting memories to our clients.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                  <p className="text-gray-600">
                    To become Maharashtra's most trusted event management company, known for creativity, reliability, and exceptional service.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                  <p className="text-gray-600">
                    A dedicated team of event planning professionals with years of experience in creating magical celebrations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  Shubharambh Events & Management was founded with a simple belief: every celebration deserves to be extraordinary. 
                  We started as a small team of passionate event planners who wanted to bring joy and create lasting memories 
                  for families and businesses across Maharashtra.
                </p>
                <p className="text-gray-600 mb-6">
                  Today, we serve hundreds of families and businesses with our comprehensive event management services. 
                  Our events are planned with meticulous attention to detail and cultural sensitivity, ensuring they 
                  resonate with our clients' vision and create unforgettable experiences.
                </p>
                <p className="text-gray-600">
                  We're constantly evolving, adding new services, and improving our offerings to better serve 
                  our community. Whether you're planning a wedding, birthday party, or corporate event, 
                  we're here to help you bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}