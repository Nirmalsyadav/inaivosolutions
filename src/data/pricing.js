export const pricing = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Starting from $XXX',
    description: 'Ideal for early-stage teams launching quickly with focused scope.',
    features: [
      'Discovery workshop and roadmap',
      'Responsive website or lightweight app',
      'Core integrations and QA',
      'Launch support',
    ],
    cta: 'Get Starter Plan',
    popular: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 'Starting from $XXX',
    description: 'Built for scaling businesses that need product depth and velocity.',
    features: [
      'Everything in Starter',
      'Advanced UI system and conversion UX',
      'Automation and analytics stack',
      'Priority support and iteration cycles',
    ],
    cta: 'Get Growth Plan',
    popular: true,
  },
  {
    id: 'scale',
    name: 'Scale',
    price: 'Starting from $XXX',
    description: 'For mature products requiring complex architecture and ongoing partnership.',
    features: [
      'Everything in Growth',
      'Multi-team workflow and governance',
      'High-availability and observability setup',
      'Continuous optimization and growth support',
    ],
    cta: 'Talk to Sales',
    popular: false,
  },
]

export const pricingComparison = [
  {
    feature: 'Delivery model',
    starter: 'Fixed scope',
    growth: 'Iterative sprints',
    scale: 'Dedicated product squad',
  },
  {
    feature: 'Design system',
    starter: 'Basic UI kit',
    growth: 'Advanced component library',
    scale: 'Enterprise design governance',
  },
  {
    feature: 'Integrations',
    starter: 'Up to 2 integrations',
    growth: 'Up to 6 integrations',
    scale: 'Unlimited integrations',
  },
  {
    feature: 'Post-launch support',
    starter: '2 weeks',
    growth: '2 months',
    scale: 'Ongoing partnership',
  },
  {
    feature: 'Growth optimization',
    starter: 'Optional add-on',
    growth: 'Included monthly reviews',
    scale: 'Continuous experimentation',
  },
]
