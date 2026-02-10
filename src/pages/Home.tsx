import Button from '../components/Button';
import { useEffect, useMemo, useState } from 'react';
import { SEOManager, pageSEOConfigs } from '../utils/seoUtils';
import { useLocation } from 'react-router-dom';
import { fetchBlogPosts } from '../utils';
import Container from '../components/ui/Container';
import ResponsiveImage from '../components/ResponsiveImage';
import { testimonials } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    SEOManager.setupPageSEO(
      {
        ...pageSEOConfigs.home,
        // Stronger home targeting
        title: 'Business Utility Broker UK | Revo Utilities',
        description:
          'Compare business utilities with Revo Utilities. Expert brokers for UK businesses to cut costs on gas, electricity and water with tailored contracts and renewable options.',
        keywords:
          'business utilities comparison, compare business energy, business gas prices, business electricity rates, water costs UK, utility broker UK',
        structuredDataType: 'organization',
        robots: 'index, follow',
      },
      location.pathname
    );
  }, [location.pathname]);
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    select: (posts) => posts.slice(0, 3),
  });

  const [logosPaused, setLogosPaused] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (mediaQuery.matches) {
      setLogosPaused(true);
    }

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setLogosPaused(event.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (typeof mediaQuery.removeListener === 'function') {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const PARTNERSHIP_LOGOS = [
    'Airtricity.webp',
    'British Gas Lite.webp',
    'Castle Water.webp',
    'Conrad Energy.webp',
    'Crown Gas Power.webp',
    'Dawn Insurance.webp',
    'Drax.webp',
    'Dyce.webp',
    'Ecotricity.webp',
    'Engie.webp',
    'Eon Next.webp',
    'Everflow.webp',
    'EVOPay.webp',
    'Global Payments.webp',
    'Intelligent Business Water.webp',
    'Jellyfish.webp',
    'National Gas.webp',
    'o2-Daisy.webp',
    'Pozitive.webp',
    'Smartest Energy.webp',
    'Take Payments.webp',
    'Total Energies.webp',
    'UGP.webp',
    'Valda.webp',
    'WorldPay.webp',
    'YU Energy.webp',
  ];

  // Keep the same number of logos as before (8), randomly selected per render
  const SELECTED_LOGOS = useMemo(() => {
    const count = 8;
    const shuffled = [...PARTNERSHIP_LOGOS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map((file) => ({
      src: `/logos/partnership-logos/${file}`,
      alt: file
        .replace(/\.(webp|png|jpg|jpeg|svg)$/i, '')
        .replace(/[-_]/g, ' '),
    }));
  }, []);

  return (
    <div className="bg-[var(--background)] min-h-screen font-sans">
      {/* Hero Section (2025 redesign) */}
      <div className="hero-section relative overflow-hidden -mt-8">
        {/* Subtle background wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[var(--background)]"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pt-10 md:pt-14 pb-12 md:pb-16">
          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
            {/* Left: copy */}
            <div className="lg:col-span-6 text-center lg:text-left max-w-3xl">
              {/* Logo */}
              <div className="mb-6 flex justify-center lg:justify-start">
                <img
                  src="/logos/Revo/Revo-logo-hero.png"
                  alt="Revo Utilities Logo"
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--secondary-color)] leading-tight mb-6">
                Business Utility Broker for Gas, Electricity &amp; Water
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button to="/comparison" variant="primary" size="lg" className="text-lg px-8 py-4 shadow-lg hover:shadow-xl">
                  Get Your Free Energy Audit
                </Button>
                <Button to="/our-services" variant="secondary" size="lg" className="text-lg px-8 py-4 bg-white hover:bg-white">
                  Explore Solutions
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 md:gap-4 mt-8 text-sm text-neutral-700">
                <span className="inline-flex items-center gap-2 bg-white shadow-sm ring-1 ring-black/5 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span className="font-medium">20+ Years Experience</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white shadow-sm ring-1 ring-black/5 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary-color)]"></span>
                  <span className="font-medium">UK Energy Specialists</span>
                </span>
                <span className="inline-flex items-center gap-2 bg-white shadow-sm ring-1 ring-black/5 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="font-medium">Zero Upfront Costs</span>
                </span>
              </div>
              <div className="mt-6 text-center lg:text-left">
                <p className="text-sm text-neutral-600 mb-2">Trusted by 500+ UK businesses</p>
                <a
                  href="https://uk.trustpilot.com/review/revo-utilities.com?utm_medium=trustbox&utm_source=TrustBoxReviewCollector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center lg:justify-start items-center gap-1 group hover:opacity-80 transition-opacity"
                >
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                  <span className="ml-2 text-sm text-neutral-600 font-medium group-hover:underline">4.9/5 on Trustpilot</span>
                </a>
              </div>
              <p className="text-sm text-neutral-600 mt-4">
                Start your <Link to="/comparison" className="text-[var(--primary-color)] underline">business utilities comparison</Link> or explore our
                {' '}<Link to="/our-services" className="text-[var(--primary-color)] underline">utility services for businesses</Link>. <br />For tips and updates, visit our
                {' '}<Link to="/insights" className="text-[var(--primary-color)] underline">energy and utilities blog</Link>.
              </p>
            </div>

            {/* Right: visual card */}
            <div className="lg:col-span-6 w-full">
              <div className="relative aspect-[4/3] rounded-3xl shadow-2xl ring-1 ring-black/10 overflow-hidden bg-white">
                <ResponsiveImage
                  src="/images/optimized/hero-800w.webp"
                  alt="Green energy landscape with wide skies"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover"
                  width={1200}
                  height={900}
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-[var(--primary-color)]">£2.3M+</div>
                      <div className="text-xs text-neutral-600">Client savings in 2024</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[var(--secondary-color)]">85%</div>
                      <div className="text-xs text-neutral-600">Choose renewable energy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Banner - Infinite Scroll */}
      <div className="logo-marquee w-full overflow-hidden py-4 border-a border-neutral-100 min-h-[64px] bg-transparent [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-2">
            <span id="logo-marquee-description" className="sr-only">
              Scrolling logos of our energy partners
            </span>
            <button
              type="button"
              onClick={() => setLogosPaused((prev) => !prev)}
              className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:right-0 focus-visible:-top-2 focus-visible:z-10 rounded-full border border-neutral-300 bg-white px-3 py-1 text-sm font-medium text-neutral-700 shadow-sm hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-color)]"
              aria-pressed={logosPaused}
              aria-controls="partner-logo-track"
              aria-describedby="logo-marquee-description"
            >
              {logosPaused ? 'Resume logos motion' : 'Pause logos motion'}
            </button>
          </div>
          <div
            id="partner-logo-track"
            className={`logo-track flex items-center h-full ${logosPaused ? 'is-paused' : ''}`}
            aria-labelledby="logo-marquee-description"
          >
          {/* First set of logos */}
          {SELECTED_LOGOS.map((logo, i) => (
            <img
              key={`first-${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 max-h-full w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0 mr-12"
              style={{ minWidth: 100, maxWidth: 140 }}
              loading="lazy"
            />
          ))}
          {/* Second set of logos for seamless loop */}
          {SELECTED_LOGOS.map((logo, i) => (
            <img
              key={`second-${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 max-h-full w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0 mr-12"
              style={{ minWidth: 100, maxWidth: 140 }}
              loading="lazy"
            />
          ))}
          {/* Third set of logos to ensure no gaps */}
          {SELECTED_LOGOS.map((logo, i) => (
            <img
              key={`third-${logo.alt}-${i}`}
              src={logo.src}
              alt={logo.alt}
              className="h-8 md:h-10 max-h-full w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0 mr-12"
              style={{ minWidth: 100, maxWidth: 140 }}
              loading="lazy"
            />
          ))}
          </div>
        </div>
      </div>

      {/* Mission and Vision - Bento Grid */}
      <Container className="py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Vision Card - Large */}
          <div className="md:col-span-8 bg-[var(--primary-color)] rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Our Vision
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                &quot;We aim to lead the transition to renewable energy by offering tailored solutions that prioritise sustainability and innovation.&quot;
              </h2>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
          </div>

          {/* Image Card */}
          <div className="md:col-span-4 relative rounded-3xl overflow-hidden min-h-[300px] shadow-lg">
            <ResponsiveImage
              src="/images/optimized/revo-energy.webp"
              alt="Solar panels at sunset"
              className="w-full h-full"
              imgClassName="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              width={600}
              height={400}
            />
          </div>

          {/* Small Stat/Feature Card */}
          <div className="md:col-span-5 bg-[var(--secondary-color)] rounded-3xl p-8 md:p-10 flex flex-col justify-between text-white relative overflow-hidden group">
             <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-3xl font-bold mb-2">Zero</h3>
                <p className="text-white/80 text-lg font-medium">Upfront costs for our comparison service.</p>
             </div>
             <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500"></div>
          </div>

          {/* Mission Text Card */}
          <div className="md:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-[var(--secondary-color)] flex items-center gap-3">
               <span className="w-8 h-1 bg-[var(--primary-color)] rounded-full"></span>
               Our Mission
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
              To empower businesses to thrive in a greener future—delivering <span className="text-[var(--secondary-color)] font-semibold">cost savings</span>, <span className="text-[var(--secondary-color)] font-semibold">expert advice</span>, and a seamless switch to better utility suppliers.
            </p>
          </div>
        </div>
      </Container>

      {/* How It Works in Three Easy Steps */}
      <Container className="py-8 md:py-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[var(--secondary-color)]">How It Works in three easy steps</h2>
        <p className="text-center text-neutral-600 mb-10">We&apos;ve made saving on your utilities simple</p>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 -z-10"></div>

          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center relative z-10">
            <div className="mb-4 w-12 h-12 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-lime-200">
              1
            </div>
            <h3 className="font-semibold text-lg mb-2">Fill in our quote form</h3>
            <p className="text-gray-600 text-sm">Tell us about your business and its utility requirements.</p>
          </div>
          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center relative z-10">
            <div className="mb-4 w-12 h-12 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-lime-200">
              2
            </div>
            <h3 className="font-semibold text-lg mb-2">Get a personalised comparison quote</h3>
            <p className="text-gray-600 text-sm">We&apos;ll find the most competitive rates from our trusted suppliers.</p>
          </div>
          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center relative z-10">
            <div className="mb-4 w-12 h-12 rounded-full bg-[var(--primary-color)] flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-lime-200">
              3
            </div>
            <h3 className="font-semibold text-lg mb-2">Swap supplier or stay with your supplier</h3>
            <p className="text-gray-600 text-sm">We&apos;ll handle the process seamlessly, even negotiating a better deal with your current supplier.</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Button to="/comparison" variant="primary" size="lg">
            Get Your Free Quote
          </Button>
        </div>
      </Container>

      {/* Experience & Support Section -> Transformed to Impact Stats */}
      <div className="bg-[var(--secondary-color)] py-12 md:py-16 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--primary-color)_1px,_transparent_1px)] [background-size:24px_24px]"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
             <div className="px-4 pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[var(--primary-color)]">£2.3M+</div>
                <div className="text-white/80 font-medium">Client Savings Identified</div>
             </div>
             <div className="px-4 pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[var(--primary-color)]">500+</div>
                <div className="text-white/80 font-medium">UK Businesses Trusted</div>
             </div>
             <div className="px-4 pt-4 md:pt-0">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-[var(--primary-color)]">100%</div>
                <div className="text-white/80 font-medium">Renewable Options Available</div>
             </div>
          </div>
        </Container>
      </div>

      {/* Latest News / Insights */}
      <Container className="py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-8">Latest insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-3 flex justify-center items-center h-40 text-[var(--primary-color)] text-xl">Loading...</div>
          ) : blogPosts.length === 0 ? (
            <div className="col-span-3 text-center text-neutral-500">No news available.</div>
          ) : (
            blogPosts.map(post => (
              <Link
                key={post.id}
                to={`/insights/${post.slug}`}
                className="group block rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-200"
              >
                <div className="h-56 w-full overflow-hidden">
                  <ResponsiveImage
                    src={post.imageUrl || '/images/optimized/hero-400w.webp'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    imgClassName="w-full h-full object-cover"
                    width={600}
                    height={224}
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-neutral-500 mb-2 flex items-center gap-2">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.excerpt.split(' ').length > 30 ? '5 min read' : '3 min read'}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--accent-color)] mb-2 group-hover:text-[var(--primary-color)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-neutral-700 line-clamp-3">{post.excerpt}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </Container>

      {/* Testimonial Section */}
      <Container className="py-16 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[var(--primary-color)]">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Real feedback from businesses who trust Revo Utilities to save them money and simplify their utilities.
          </p>
          <a
            href="https://uk.trustpilot.com/review/revo-utilities.com?utm_medium=trustbox&utm_source=TrustBoxReviewCollector"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:underline font-medium"
          >
            <span>Read more reviews on</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.566 8.566a2 2 0 00-2.828 0l-3.883 3.883a2 2 0 000 2.828l3.883 3.883a2 2 0 002.828-2.828l-2.47-2.469 2.47-2.469a2 2 0 000-2.828zm-11.132 0a2 2 0 012.828 0l3.883 3.883a2 2 0 010 2.828l-3.883 3.883a2 2 0 01-2.828-2.828l2.47-2.469-2.47-2.469a2 2 0 010-2.828z"/>
            </svg>
            <span>Trustpilot</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={i} quote={t.quote} author={t.author} position={t.position || ''} />
          ))}
        </div>
      </Container>

      {/* CEO Quote / Call to Action */}
      <div className="relative bg-[var(--secondary-color)] py-16 md:py-24">
        <Container className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-8 md:gap-20">
          <div className="flex-1 max-w-2xl text-white flex flex-col items-center md:items-start mt-8 md:mt-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">&quot;We are proud partners of some of the UK&apos;s leading energy suppliers meaning that you can rest assured that you&apos;ll receive a personalised, cost-effective deal that suits your needs specifically.&quot;</h2>
            <p className="text-lg mb-4 text-center md:text-left">Let us help your business thrive in the new era of sustainable energy.</p>
            <Button to="/comparison" variant="primary" size="lg" className="mb-0">
              Get Started
            </Button>
          </div>
          <div className="flex-1 max-w-md w-full">
            <ResponsiveImage
              src="/images/optimized/revo-deal.webp"
              alt="Wind turbines at sunset"
              className="rounded-2xl shadow-lg"
              imgClassName="rounded-2xl object-cover"
              width={600}
              height={400}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Home;
