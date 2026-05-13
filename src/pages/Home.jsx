import { Link } from 'react-router-dom'
import { TbArrowRight, TbCheck } from 'react-icons/tb'
import Hero from '../components/Hero.jsx'
import StatsBar from '../components/StatsBar.jsx'
import SectionKicker from '../components/SectionKicker.jsx'
import LogoMarquee from '../components/LogoMarquee.jsx'
import {
  stats,
  services,
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
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
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
                  <div className="font-serif font-black text-[32px] text-red leading-none mb-3">
                    {s.number}
                  </div>
                  <h3 className="font-serif font-medium text-[20px] text-ink leading-[1.2] mb-2 whitespace-pre-line">
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

      <LogoMarquee />

      {/* How to work with us */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SectionKicker color="blue">For small businesses</SectionKicker>
            <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-4">
              How we work
              <br />
              with you
            </h2>
            <p className="text-[15px] text-muted leading-[1.7] font-sans mb-6">
              From a single email to a finished deliverable. We keep it simple so business owners can stay focused on running their company.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-blue text-white px-6 py-3 font-sans font-medium text-[12px] uppercase tracking-wider"
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
                <div className="w-[110px] flex-shrink-0 border-r border-border p-5 flex items-center justify-center text-center">
                  <div className="font-serif font-black text-[40px] text-blue leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>
                <div className="flex-1 p-5">
                  <div className="font-serif font-medium text-[18px] text-ink mb-1">
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

      {/* Testimonial */}
      <section className="bg-blue">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-16 md:py-20">
          <div className="font-serif font-medium italic text-white text-[34px] sm:text-[44px] md:text-[52px] leading-[1.05] tracking-[-1px] max-w-[820px]">
            “These meetings helped us understand where to be{' '}
            <em className="not-italic font-serif font-medium text-yellow italic">focused</em>
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

      {/* On the ground photos */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">On the ground</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-9">
            Inside the partnership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                src: 'https://static.wixstatic.com/media/a6cdd8_77d7beda2e964cc4b507a24a8a20554b~mv2.jpg/v1/crop/x_0,y_132,w_3000,h_1986/fill/w_694,h_460,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/MorningCodingStudents_edited.jpg',
                alt: 'Code to Success students in a morning class',
                caption: 'Code to Success students in a morning session.',
              },
              {
                src: 'https://static.wixstatic.com/media/a6cdd8_c75a64ffcb984558a358b27c0c5018af~mv2.jpg/v1/crop/x_0,y_97,w_962,h_637/fill/w_694,h_460,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/interns-2017_edited.jpg',
                alt: 'UMBP intern team in 2017',
                caption: 'UMBP intern team, 2017.',
              },
              {
                src: 'https://static.wixstatic.com/media/a6cdd8_ccaa73b418174397addda597243136db~mv2.jpg/v1/crop/x_52,y_37,w_1631,h_1077/fill/w_696,h_460,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/7A011441-216C-442C-8D25-3D18AD2FD40D_JPG.jpg',
                alt: 'UMBP team on the ground in Moldova',
                caption: 'On the ground with a host company.',
              },
            ].map((photo) => (
              <figure key={photo.src} className="border border-border bg-white">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="block w-full h-56 object-cover"
                />
                <figcaption className="border-t border-border px-4 py-3 text-[12px] text-muted font-sans">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* About / Story */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <SectionKicker color="blue">About</SectionKicker>
            <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-4">
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

      {/* Supporters */}
      <section className="border-b border-border bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10 py-14 md:py-16">
          <SectionKicker color="red">Our supporters</SectionKicker>
          <h2 className="font-serif font-medium text-[34px] md:text-[44px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
            Partners & institutions
          </h2>
          <p className="text-[15px] text-muted leading-[1.7] max-w-[520px] mb-9 font-sans">
            UMBP exists thanks to a coalition of universities, foundations, and partner organizations on both sides of the Atlantic.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 border border-border">
            {[
              {
                name: 'UNDP Moldova',
                href: 'https://www.md.undp.org',
                src: 'https://static.wixstatic.com/media/a6cdd8_5001911b9a8348c5bf5c7e6288809168~mv2.png/v1/fill/w_250,h_212,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/283px-UN_emblem_blue_edited.png',
              },
              {
                name: 'Tekwill',
                href: 'https://tekwill.md/',
                src: 'https://static.wixstatic.com/media/a6cdd8_7d38921b453e41f88ff8727573eb1c67~mv2.png/v1/fill/w_250,h_212,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo_Tekwill_edited.png',
              },
              {
                name: 'AmCham Moldova',
                href: 'https://www.amcham.md/',
                src: 'https://static.wixstatic.com/media/a6cdd8_c16248d59e8b44ffa8db42b06fc86b02~mv2.png/v1/crop/x_23,y_53,w_377,h_95/fill/w_524,h_132,al_c,lg_1,q_85,enc_avif,quality_auto/ec55e5d9-c8d0-4751-8c37-e5a46a97cb2a_edi.png',
              },
              {
                name: 'Hinckley Institute of Politics',
                href: 'https://www.hinckley.utah.edu/',
                src: 'https://static.wixstatic.com/media/a6cdd8_b82c6fc8be01441e91ff0bfd1da23b77~mv2.png/v1/fill/w_364,h_168,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hinckley%20Institute.png',
              },
              {
                name: 'David Eccles School of Business',
                href: 'https://eccles.utah.edu/',
                src: 'https://static.wixstatic.com/media/a6cdd8_67a503eb0b9b467caf8549f7d3a35fa1~mv2.png/v1/crop/x_756,y_0,w_414,h_250/fill/w_220,h_132,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/hs-emp-branding-image-data_edited.png',
              },
              {
                name: 'Code to Success',
                href: 'https://www.ctsutah.org/',
                src: 'https://static.wixstatic.com/media/a6cdd8_2410ceeb2f704659b41351d694bdad52~mv2.png/v1/fill/w_186,h_186,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/code-to-success-logo_edited.png',
              },
              {
                name: 'Startup Moldova',
                href: 'https://startupmoldova.digital/en/',
                src: 'https://static.wixstatic.com/media/a6cdd8_0d209de9e2ea4ee89c1840784482f51a~mv2.png/v1/crop/x_72,y_111,w_805,h_330/fill/w_448,h_184,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Untitled%20drawing%20(1).png',
              },
            ].map((logo, i, arr) => (
              <a
                key={logo.name}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={logo.name}
                className={[
                  'flex items-center justify-center p-5 h-24 md:h-28 border-border opacity-70 hover:opacity-100 transition-opacity',
                  i % 2 === 0 ? 'border-r sm:border-r' : '',
                  i !== arr.length - 1 ? 'lg:border-r' : '',
                  i < arr.length - 1 ? 'border-b lg:border-b-0' : '',
                ].join(' ')}
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className="max-h-12 md:max-h-14 w-auto object-contain"
                />
              </a>
            ))}
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
                <h3 className="font-serif font-medium text-[28px] md:text-[36px] leading-[1.0] tracking-[-0.5px] text-ink mb-3">
                  Get free consulting
                </h3>
                <p className="text-[15px] text-muted leading-[1.7] font-sans max-w-[420px]">
                  Send a short message describing your business and where you feel stuck. We will reply with next steps.
                </p>
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
                <a
                  href={`mailto:${orgInfo.email}?subject=Free%20Consulting%20Inquiry`}
                  className="inline-flex items-center justify-center gap-2 bg-red text-white px-6 py-4 font-sans font-medium text-[12px] uppercase tracking-wider"
                >
                  Email the program <TbArrowRight size={14} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-4 font-sans font-medium text-[12px] uppercase tracking-wider text-ink"
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
