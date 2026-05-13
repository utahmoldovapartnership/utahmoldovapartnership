import { Link } from 'react-router-dom'
import { TbArrowRight, TbCheck } from 'react-icons/tb'
import Hero from '../components/Hero.jsx'
import StatsBar from '../components/StatsBar.jsx'
import SectionKicker from '../components/SectionKicker.jsx'
import Pills from '../components/Pills.jsx'
import PhotoPlaceholder from '../components/PhotoPlaceholder.jsx'
import {
  stats,
  services,
  pastClients,
  supporters,
  testimonial,
  businessSteps,
  orgInfo,
} from '../data/siteContent.js'

export default function Home() {
  return (
    <>
      <Hero
        kicker="A non-profit strengthening Moldova's economy"
        kickerColor="white"
        title={
          <>
            Real consulting that
            <br />
            helps your business grow.
          </>
        }
        subtext="Free consulting for Moldovan businesses. American interns come to Moldova and work directly with local companies on marketing, strategy, market research, and operations."
        primary={{ label: 'Get Free Consulting', href: '/contact', variant: 'red' }}
        secondary={{ label: 'Learn More', href: '#services' }}
        backgroundImage="https://images.pexels.com/photos/17994722/pexels-photo-17994722.jpeg?auto=compress&cs=tinysrgb&w=2400"
      />

      <StatsBar items={stats} />

      {/* Services */}
      <section id="services" className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">What we do</SectionKicker>
          <h2 className="font-serif font-black text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Free services for
            <br />
            Moldovan businesses
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-[520px] mb-9 font-sans">
            Our teams have worked with start-ups, SMEs, law firms, retailers, and café chains. Every engagement is free and tailored to what the business actually needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
            {services.map((s, i) => (
              <div
                key={s.number}
                className={[
                  'border-border',
                  i % 2 === 0 ? 'md:border-r' : '',
                  i < 2 ? 'border-b' : 'border-b md:border-b-0',
                  i === services.length - 1 ? 'border-b-0' : '',
                ].join(' ')}
              >
                <div className="p-7">
                  <div className="font-serif font-black text-[32px] text-[#9ca3af] leading-none mb-3">
                    {s.number}
                  </div>
                  <h3 className="font-serif font-bold text-[20px] text-ink leading-[1.2] mb-2 whitespace-pre-line">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-muted leading-[1.65] font-sans">
                    {s.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to work with us */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SectionKicker color="blue">For small businesses</SectionKicker>
            <h2 className="font-serif font-black text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-4">
              How we work
              <br />
              with you
            </h2>
            <p className="text-[15px] text-muted leading-[1.7] font-sans mb-6">
              From a single email to a finished deliverable. We keep it simple so business owners can stay focused on running their company.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-red text-white px-6 py-3 font-sans font-medium text-[14px] uppercase tracking-wider"
            >
              Start a conversation
              <TbArrowRight size={14} />
            </Link>
          </div>
          <div className="border border-border">
            {businessSteps.map((step, i) => (
              <div
                key={step.label}
                className={[
                  'flex',
                  i !== businessSteps.length - 1 ? 'border-b border-border' : '',
                ].join(' ')}
              >
                <div className="w-[110px] flex-shrink-0 border-r border-border p-5">
                  <div className="font-serif font-black text-[24px] text-[#9ca3af] leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="mt-1 text-[12px] uppercase tracking-[0.1em] text-red font-sans font-medium">
                    {step.label}
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <div className="font-serif font-bold text-[18px] text-ink mb-1">
                    {step.title}
                  </div>
                  <div className="text-[14px] text-muted leading-[1.65] font-sans">
                    {step.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On the ground photos */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">On the ground</SectionKicker>
          <h2 className="font-serif font-black text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-9">
            Inside the
            <br />
            partnership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PhotoPlaceholder label="Team in Chișinău" caption="Replace with photo of program team meeting a host company." />
            <PhotoPlaceholder label="Working session" caption="Replace with photo of interns presenting to leadership." />
            <PhotoPlaceholder label="Seminar" caption="Replace with photo from a business education seminar." />
          </div>
        </div>
      </section>

      {/* Past clients */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="blue">Past clients</SectionKicker>
          <h2 className="font-serif font-black text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Companies
            <br />
            we've worked with
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-[520px] mb-9 font-sans">
            Start-ups, SMEs, law firms, retailers, and café chains across Moldova — each engagement scoped around what the business actually needed.
          </p>
          <Pills items={pastClients} />
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-blue">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-16 md:py-20">
          <div className="font-serif font-black italic text-white text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05] tracking-[-1px] max-w-[820px]">
            “These meetings helped us understand where to be{' '}
            <em className="not-italic font-serif font-black text-yellow italic">focused</em>
            {' '}and what it will take to reach our potential.”
          </div>
          <div className="mt-8 pt-6 border-t border-white/20 flex items-center gap-4">
            <span className="text-[12px] uppercase tracking-[0.12em] text-yellow font-sans font-medium">
              {testimonial.tag}
            </span>
            <span className="w-px h-4 bg-white/30" />
            <span className="text-[14px] text-white/80 font-sans">{testimonial.company}</span>
          </div>
        </div>
      </section>

      {/* Supporters */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">Our supporters</SectionKicker>
          <h2 className="font-serif font-black text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Partners &
            <br />
            institutions
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-[520px] mb-9 font-sans">
            UMBP exists thanks to a coalition of universities, foundations, and partner organizations on both sides of the Atlantic.
          </p>
          <Pills items={supporters} />
        </div>
      </section>

      {/* About / Story */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SectionKicker color="blue">About</SectionKicker>
            <h2 className="font-serif font-black text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-4">
              Built around
              <br />
              real impact
            </h2>
          </div>
          <div className="text-[16px] text-muted leading-[1.8] font-sans space-y-4 max-w-[520px]">
            <p>
              The Utah Moldova Business Partnership was founded in {orgInfo.founded} by {orgInfo.founders.join(' and ')}. They saw enormous potential in the Republic of Moldova for economic development — if entrepreneurs were given the right resources, ideas, and connections.
            </p>
            <p>
              Each year we sponsor teams of interns to find Moldovan businesses ready for the next step. In 2018 the partnership expanded to include Code to Success programming courses, and the program has grown in size and impact every year since.
            </p>
            <ul className="pt-2 space-y-2">
              {[
                'Free consulting — no fees, no equity',
                'Real deliverables you keep after the engagement',
                'Local team supported by U.S. partners',
                'Focused on small and growing businesses',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-4 h-4 bg-red flex items-center justify-center flex-shrink-0">
                    <TbCheck size={10} color="#fff" />
                  </span>
                  <span className="text-[15px] text-ink font-sans">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <div className="border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-border">
                <SectionKicker color="red">Ready to talk?</SectionKicker>
                <h3 className="font-serif font-black text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
                  Get free
                  <br />
                  consulting
                </h3>
                <p className="text-[15px] text-muted leading-[1.7] font-sans max-w-[420px]">
                  Send a short message describing your business and where you feel stuck. We will reply with next steps.
                </p>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
                <a
                  href={`mailto:${orgInfo.email}?subject=Free%20Consulting%20Inquiry`}
                  className="inline-flex items-center justify-center gap-2 bg-red text-white px-6 py-4 font-sans font-medium text-[14px] uppercase tracking-wider"
                >
                  Email the program <TbArrowRight size={14} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-4 font-sans font-medium text-[14px] uppercase tracking-wider text-ink"
                >
                  Go to contact page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
