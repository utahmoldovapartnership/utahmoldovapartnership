export const orgInfo = {
  name: 'Utah Moldova Business Partnership',
  shortName: 'UMBP',
  email: 'utahmoldovapartnership@gmail.com',
  website: 'utahmoldovabusiness.com',
  partnerSite: 'ivorycenter.md',
  founded: 2015,
  founders: ['Clark Ivory', 'Walter Plumb III'],
  tagline:
    'A non-profit collaboration committed to benefitting the economic state of the Republic of Moldova.',
}

export const stats = [
  { num: '9+', label: 'Years' },
  { num: '57+', label: 'Companies' },
  { num: '50', label: 'Interns' },
  { num: '50', label: 'Diplomas' },
  { num: '10', label: 'Seminars' },
]

export const internStats = [
  { num: 'Chișinău', label: 'Location', small: true },
  { num: '8', label: 'Interns per summer' },
  { num: '9+', label: 'Years operating' },
  { num: 'Summer', label: 'Timing', small: true },
]

export const services = [
  {
    tag: 'Strategy',
    tagColor: 'red',
    number: '01',
    title: 'Consulting &\nStrategy',
    text: 'Market entry research, competitive analysis, and strategic planning for small businesses ready to grow.',
  },
  {
    tag: 'Marketing',
    tagColor: 'blue',
    number: '02',
    title: 'Marketing &\nSocial Media',
    text: 'Content strategy, brand positioning, and digital campaigns for local and regional markets.',
  },
  {
    tag: 'Technology',
    tagColor: 'blue',
    number: '03',
    title: 'IT & Digital\nDevelopment',
    text: 'Website creation, e-commerce, and tech consulting in partnership with Code to Success.',
  },
  {
    tag: 'Education',
    tagColor: 'red',
    number: '04',
    title: 'Business\nEducation',
    text: 'Seminars on entrepreneurship, responsible leadership, and financial literacy.',
  },
]

export const pastClients = [
  'Covali Litigation & Arbitration',
  'Le Parole Moldova',
  'XY Consulting Partners',
  'Macco',
  'A leading Chișinău café chain',
  'A women’s dress retailer',
]

export const supporters = [
  'United Nations',
  'Tekwill',
  'Hinckley Institute',
  'Code to Success',
  'Bottega',
  'Ivory Center, Chișinău',
]

export const testimonial = {
  quote:
    'These meetings helped us understand where to be focused and what it will take to reach our potential.',
  emphasis: 'focused',
  company: 'Macco — Chișinău, Moldova',
  tag: 'Client Testimonial',
}

export const meetInterns = {
  intro: [
    'Each summer a small team of students spends the season in Chișinău finding companies,',
    'learning what they need, and delivering real consulting work.',
  ],
  members: [
    {
      id: 'braxton',
      name: 'Braxton',
      image: '/interns/braxton.jpg',
      focus: 'Strategy & operations',
      bio: 'Background in strategy and operations, with a knack for turning ideas into practical next steps.',
    },
    {
      id: 'libby',
      name: 'Libby',
      image: '/interns/libby.jpg',
      focus: 'Marketing & branding',
      bio: 'Strong with branding, messaging, and marketing that helps businesses connect with customers.',
    },
    {
      id: 'henry',
      name: 'Henry',
      image: '/interns/henry.jpg',
      focus: 'Finance & accounting',
      bio: 'Brings a sharp eye for finance, pricing, and building financial models owners can use.',
    },
    {
      id: 'katya',
      name: 'Katya',
      image: '/interns/katya.jpg',
      focus: 'Market research',
      bio: 'Known for market research and translating findings into clear, useful insights.',
    },
    {
      id: 'ethan',
      name: 'Ethan',
      image: '/interns/ethan.jpg',
      focus: 'Management consulting',
      bio: 'Comfortable leading management consulting work, planning, and cross-functional projects.',
    },
    {
      id: 'meg',
      name: 'Meg',
      image: '/interns/meg.jpg',
      focus: 'Marketing & communications',
      bio: 'Background in marketing strategy, writing, and communication tailored to each company.',
    },
    {
      id: 'halle',
      name: 'Halle',
      image: '/interns/halle.jpg',
      focus: 'Strategy & research',
      bio: 'Combines strategic thinking with hands-on research and recommendations owners can act on.',
    },
    {
      id: 'weston',
      name: 'Weston',
      image: '/interns/weston.jpg',
      focus: 'Web development',
      bio: 'Builds websites and digital tools that help businesses strengthen their online presence.',
    },
  ],
}

export const businessSteps = [
  {
    label: 'Step 01',
    title: 'Tell us about your business',
    text: 'Send a short email describing your company, what you do, and where you feel stuck. No formal proposal required.',
  },
  {
    label: 'Step 02',
    title: 'Meet with the program team',
    text: 'We meet to understand goals, constraints, and the kind of work that would actually move the needle for you.',
  },
  {
    label: 'Step 03',
    title: 'Work with the intern team',
    text: 'A small team in Chișinău reaches out, learns what you need, and scopes the work with you directly.',
  },
  {
    label: 'Step 04',
    title: 'Receive a real deliverable',
    text: 'Strategy deck, marketing plan, market research, financial model, or digital tool. Yours to keep.',
  },
]

export const internWhatYouDo = {
  intro:
    'You are not assigned to one company or one big project. A small team in Chișinău finds Moldovan businesses, figures out what they need, and delivers real consulting work across the summer.',
  items: [
    {
      tag: 'Find',
      tagColor: 'red',
      title: 'Seek out businesses',
      text: 'You proactively meet companies, learn what they are trying to accomplish, and scope projects together. New relationships keep forming all season.',
    },
    {
      tag: 'Deliver',
      tagColor: 'blue',
      title: 'Ship what they need',
      text: 'Strategy decks, marketing plans, websites, financial models, research, and more. You may lead solo, pair with another intern, or work with the full team.',
    },
    {
      tag: 'Lead',
      tagColor: 'red',
      title: 'Own your work',
      text: 'A program director helps the team stay on track, but interns find the companies and do the consulting. There is no fixed playbook waiting for you.',
    },
    {
      tag: 'Explore',
      tagColor: 'blue',
      title: 'Live abroad',
      text: 'Work in Chișinău during the week. Use weekends to travel. Many interns visit Romania, Ukraine, and other destinations in the region.',
    },
  ],
}

/** Interns page carousel — synced from ../Photos via `npm run photos` */
export { internCohortPhotos } from './cohortPhotos.generated.js'

export const internWhoFor = {
  paragraphs: [
    'This program is for students who want real responsibility abroad, not a structured corporate rotation. You find the work, build relationships with businesses, and figure things out as a team.',
    'We care most about initiative, curiosity, and follow-through. Backgrounds vary. What matters is that you show up ready to lead, collaborate, and keep moving when there is no one telling you what to do next.',
  ],
  bullets: [
    'Self-motivated and proactive by nature',
    'Undergraduate or graduate students',
    'Comfortable finding the work, not waiting for it',
    'Interested in living and working abroad for a summer',
  ],
}

export const internSkillsSection = {
  kicker: 'Skills & strengths',
  title: 'Bring what you know',
  intro:
    'You do not need to check every box. Most interns arrive strong in a few areas and grow in others over the summer. We match you to projects where you can contribute and learn from the rest of the team.',
  items: [
    'Strategy, management, or market research',
    'Marketing, branding, or social media',
    'Web development and digital tools',
    'Finance, accounting, or pricing',
    'Supply chain and operations',
    'Clear communication in writing and conversation',
    'Sharing your work with business owners',
  ],
}

export const internApplySteps = [
  'Prepare your resume and a short cover letter.',
  'Tell us why you want the program and what you would bring to the team.',
  'Send both as attachments by email. We review applications on a rolling basis.',
]

export const faqBusiness = [
  {
    q: 'Do you charge for consulting?',
    a: 'No. Every engagement is free for the Moldovan business. We are funded by our partners and donors.',
  },
  {
    q: 'Do I need to be a big company to qualify?',
    a: 'No. Most of the businesses we have worked with are small or growing — start-ups, retailers, and service companies.',
  },
  {
    q: 'Where does the work happen?',
    a: 'Intern teams are based in Chișinău and meet with businesses in person throughout the summer. There is no long-term embed with a single company.',
  },
  {
    q: 'What kind of deliverables do we receive?',
    a: 'Typical outputs include strategy decks, marketing plans, market research, financial models, or digital tools — yours to keep after the engagement.',
  },
  {
    q: 'How do we get started?',
    a: 'Send a short email describing your company, what you do, and where you feel stuck. Our team will reply with next steps for a brief intro call.',
  },
]

export const faqInterns = [
  {
    q: 'Who is the program for?',
    a: 'Proactive undergraduate and graduate students with skills in business, marketing, finance, web development, supply chain, accounting, strategy, research, and related fields. You need to be comfortable taking initiative abroad.',
  },
  {
    q: 'When should I apply?',
    a: 'Applications are welcome year-round. Send us an email anytime to get started. Interviews for the summer cohort are typically held between October and December.',
  },
  {
    q: 'What does the application require?',
    a: 'A resume and short cover letter. After an initial review, selected candidates complete a program interview. We look for self-starters who will find and drive the work themselves.',
  },
  {
    q: 'What will I work on?',
    a: 'You work with many different companies at once, not one big assignment. Projects vary: research, strategy, websites, marketing plans, financial models, and more. You may lead solo, pair with another intern, or work with the whole team.',
  },
  {
    q: 'Where is the program based?',
    a: 'Chișinău, Moldova, with orientation at the Ivory Center. A program director helps the team stay on track, but interns find the companies and do the consulting work.',
  },
  {
    q: 'What is life like outside of work?',
    a: 'You live and work abroad in Chișinău all summer. Weekends are yours. Many interns travel to neighboring countries such as Romania and Ukraine while they are in the region.',
  },
]

export const contactPaths = [
  {
    tag: 'For Moldovan Businesses',
    tagColor: 'red',
    title: 'Get free consulting',
    text: 'Tell us about your company, what you sell, and where you feel stuck. Our team will reply with next steps for a brief intro call.',
    cta: 'Email Us',
    subject: 'Free Consulting Inquiry',
  },
  {
    tag: 'For Prospective Interns',
    tagColor: 'yellow',
    title: 'Apply to the program',
    text: 'Send your resume and a short cover letter. We review applications on a rolling basis for the summer cohort. Strong fits are proactive students ready to work abroad in Chișinău and make the most of the summer.',
    cta: 'Send application',
    subject: 'Intern Application',
  },
  {
    tag: 'For Partners & Donors',
    tagColor: 'red',
    title: 'Partner with UMBP',
    text: 'Universities, foundations, and companies interested in supporting the partnership — let’s talk about how to work together.',
    cta: 'Reach the team',
    subject: 'Partnership Inquiry',
  },
  {
    tag: 'General Inquiries',
    tagColor: 'blue',
    title: 'Ask anything',
    text: 'Press, speaking requests, alumni updates, or general questions about the partnership. We read every message.',
    cta: 'Say hello',
    subject: 'General Inquiry',
  },
]
