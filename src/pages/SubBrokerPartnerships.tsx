import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, CheckCircle2, LifeBuoy, Rocket, ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';
import Button from '../components/Button';
import { SEOManager, pageSEOConfigs } from '../utils/seoUtils';
import Input from '../components/ui/Input';

const YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=UO3TzP0IrDs';
const YOUTUBE_EMBED_SRC = 'https://www.youtube.com/embed/UO3TzP0IrDs?si=KLbVJVVADKvsn7Cl&controls=0';

const SubBrokerPartnerships = () => {
  const location = useLocation();

  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    message: '',
    companyWebsite: '',
    marketingOptIn: false,
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const formStartedAtRef = useRef(Date.now());

  useEffect(() => {
    window.scrollTo(0, 0);
    SEOManager.setupPageSEO(
      {
        ...pageSEOConfigs.partnerships,
        title: 'Sub-broker Partnerships | Grow with Revo Utilities',
        description:
          'Partner with Revo Utilities as a sub-broker. Expand your offering with our supplier network, dedicated support, and a partnership-first approach.',
        keywords:
          'sub broker, broker partnership, referral partners, introducer, utility broker network, business utilities partnership',
        structuredDataType: 'organization',
        robots: 'index, follow',
        breadcrumbs: SEOManager.generateBreadcrumbs(location.pathname),
      },
      location.pathname
    );
  }, [location.pathname]);

  const benefits = [
    {
      Icon: Zap,
      iconClassName: 'text-amber-600',
      iconBgClassName: 'bg-amber-500/10',
      title: 'Supplier access',
      description: 'Tap into our wider supplier and service partner ecosystem across key categories.',
    },
    {
      Icon: LifeBuoy,
      iconClassName: 'text-blue-600',
      iconBgClassName: 'bg-blue-500/10',
      title: 'Operational support',
      description: 'We reduce admin friction with a partnership model designed to keep delivery smooth.',
    },
    {
      Icon: Users,
      iconClassName: 'text-emerald-600',
      iconBgClassName: 'bg-emerald-500/10',
      title: 'Client-first approach',
      description: 'Transparent, service-led delivery that supports long-term retention.',
    },
    {
      Icon: Rocket,
      iconClassName: 'text-purple-600',
      iconBgClassName: 'bg-purple-500/10',
      title: 'Simple onboarding',
      description: 'A clear process with quick setup and a defined handover between teams.',
    },
  ];

  const validateForm = () => {
    if (!form.name.trim() || !form.businessName.trim() || !form.email.trim() || !form.phone.trim()) {
      setFormError('Please fill in all required fields.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setForm({ ...form, [name]: e.target.checked });
      return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          enquiryType: 'Sub-broker partnership',
          formStartedAt: formStartedAtRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        formStartedAtRef.current = Date.now();
        setForm({ name: '', businessName: '', email: '', phone: '', message: '', companyWebsite: '', marketingOptIn: false });
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setFormStatus('error');
      setFormError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-28 md:pt-36 pb-16 bg-[var(--primary-color)] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-widest uppercase mb-5 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Partnerships
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 text-white">
              Grow our <span className="text-white underline decoration-white/40 underline-offset-8">sub-broker</span> network
            </h1>

            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-9">
              If you already support businesses with utilities or whether you are a new broker or introducer, we’d love to explore a sub-broker partnership with you.
              Bring your experience — we’ll bring the infrastructure, supplier access and operational support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                to="/partnerships"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="justify-center !bg-white !text-black hover:!bg-white/90 !shadow-lg hover:!shadow-xl"
              >
                Back to Partnerships
              </Button>
              <Button
                href={YOUTUBE_VIDEO_URL}
                variant="outline"
                size="lg"
                className="justify-center !border-white/70 !text-white hover:!bg-white/10"
              >
                Open overview video
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Built for growth</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-4 py-2">
                <ShieldCheck className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">Partnership-first</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What a sub-broker partnership looks like</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                Here is a small introduction to what a sub-broker partnership looks like. If you are interested in learning more, please contact us.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {benefits.map(({ Icon, iconClassName, iconBgClassName, title, description }) => (
                  <div key={title} className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBgClassName} mb-4`}>
                      <Icon className={`w-6 h-6 ${iconClassName}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                <h3 className="text-base font-semibold text-gray-900 mb-4">What you can expect</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Clear onboarding steps',
                    'Defined process & handover',
                    'Support when you need it',
                    'Aligned service standards',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black">
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={YOUTUBE_EMBED_SRC}
                    title="YouTube video player"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[var(--primary-color)]/5 border border-[var(--primary-color)]/10">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                    <TrendingUp className="w-4 h-4 text-[var(--primary-color)]" />
                    Momentum
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">20+</div>
                  <div className="text-xs text-gray-600">Partner relationships</div>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--secondary-color)]/5 border border-[var(--secondary-color)]/10">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[var(--secondary-color)]" />
                    Service
                  </div>
                  <div className="mt-2 text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-xs text-gray-600">Support-led approach</div>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-600">
                <p>
                  Prefer to start from our main partnerships overview?{' '}
                  <a href="/partnerships" className="text-[var(--primary-color)] hover:underline">
                    Go back to Partnerships
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 md:p-10 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Want to explore a sub-broker partnership?</h2>
                <p className="text-gray-700">Start with our main partnerships page and we’ll take it from there.</p>
              </div>
              <div className="w-full md:w-auto">
                <Button
                  to="/partnerships"
                  variant="primary"
                  size="lg"
                  className="w-full md:w-auto px-8 py-4 rounded-full font-semibold leading-none !border-2 !border-transparent whitespace-nowrap text-center !bg-none !bg-[var(--primary-color)] !text-black hover:!bg-[var(--primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary-light)] !shadow-md"
                >
                  View Partnerships
                </Button>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <a href="mailto:partnerships@revo-utilities.com" className="text-[var(--primary-color)] hover:underline">
                partnerships@revo-utilities.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start rounded-2xl border border-gray-100 bg-gray-50 p-8 md:p-10 shadow-sm">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Contact us about sub-broker partnerships</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Share your details and we’ll get back to you to discuss how we can work together.
              </p>


              <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">What happens next</h3>
                <div className="space-y-3">
                  {[
                    'We’ll review your enquiry and reply within 24 hours.',
                    'We’ll talk through your client base, lead volumes and preferred process.',
                    'We’ll outline onboarding steps, service standards and next actions.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4" autoComplete="off" aria-label="Sub-broker Partnership Enquiry Form" onSubmit={handleFormSubmit}>
                <div className="absolute left-[-10000px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="subBrokerCompanyWebsite">Company website</label>
                  <input
                    id="subBrokerCompanyWebsite"
                    name="companyWebsite"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.companyWebsite}
                    onChange={handleInputChange}
                  />
                </div>
                <Input label="Name" id="subBrokerName" name="name" type="text" required placeholder="Your full name" variant="glass" value={form.name} onChange={handleInputChange} />
                <Input label="Business Name" id="subBrokerBusinessName" name="businessName" type="text" required placeholder="Your business name" variant="glass" value={form.businessName} onChange={handleInputChange} />
                <Input label="Email" id="subBrokerEmail" name="email" type="email" required placeholder="Email Address" variant="glass" value={form.email} onChange={handleInputChange} />
                <Input label="Phone Number" id="subBrokerPhone" name="phone" type="tel" required placeholder="Your contact number" variant="glass" value={form.phone} onChange={handleInputChange} />

                <div className="space-y-1.5">
                  <label htmlFor="subBrokerMessage" className="block text-sm font-medium text-neutral-700">
                    Message (optional)
                  </label>
                  <textarea
                    id="subBrokerMessage"
                    name="message"
                    value={form.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full rounded-xl border border-neutral-200 bg-white/70 px-4 py-3 text-neutral-900 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-light)]"
                    placeholder="Tell us about your business and what you’re looking for"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="subBrokerMarketingOptIn"
                    name="marketingOptIn"
                    type="checkbox"
                    checked={form.marketingOptIn}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                  />
                  <label htmlFor="subBrokerMarketingOptIn" className="text-sm text-gray-700">
                    I’d like to receive marketing communications from Revo Utilities (optional).
                  </label>
                </div>

                <div aria-live="polite" className="min-h-[1.5em] text-sm">
                  {formError && <span className="text-red-600">{formError}</span>}
                  {formStatus === 'success' && <span className="text-green-700">Thank you! We will be in touch shortly.</span>}
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Submitting...' : 'Submit enquiry'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubBrokerPartnerships;
