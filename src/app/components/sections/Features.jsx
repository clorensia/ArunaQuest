'use client'

import { Briefcase, TrendingUp, Award } from 'lucide-react'
import RevealOnScroll from '@/components/animations/RevealOnScroll'

export default function Features() {
  const features = [
    {
      icon: Briefcase,
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-300',
      title: 'Gain Real-World Insight',
      description: 'You will be able to experience day-to-day challenges and tasks co-created with industry professionals, giving you a genuine feel for the job.',
      delay: 200,
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-teal-500/20',
      iconColor: 'text-teal-300',
      title: 'Discover Your Professional Strengths',
      description: 'You will be able to see how your decisions impact outcomes and get personalized feedback, helping you identify your natural talents in a professional setting.',
      delay: 350,
    },
    {
      icon: Award,
      iconBg: 'bg-rose-500/20',
      iconColor: 'text-rose-300',
      title: 'Build a Stand-Out Profile',
      description: 'You will be able to earn digital badges for each completed quest. Add them to your resume or LinkedIn to showcase your proactive career exploration to recruiters.',
      delay: 500,
    },
  ]

  return (
    <section id="features" className="py-20 md:py-28 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              A Risk-Free Way to Explore Your Professional Life
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={150}>
            <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
              Instead of just reading job descriptions, experience the reality. ArunaQuest 
              empowers you to make informed decisions about your future.
            </p>
          </RevealOnScroll>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <RevealOnScroll key={index} delay={feature.delay}>
              <div className="glass-card p-8 rounded-2xl">
                <div className={`${feature.iconBg} ${feature.iconColor} rounded-lg w-12 h-12 flex items-center justify-center mb-5`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}