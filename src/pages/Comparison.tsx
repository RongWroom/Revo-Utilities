import { ArrowRight, Check, Phone, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SEOManager, pageSEOConfigs } from '../utils/seoUtils';
import { useLocation } from 'react-router-dom';
import { StructuredDataManager } from '../utils/structuredData';
import Button from '../components/Button';
import Input from '../components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';


const Comparison = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const location = useLocation();

  // Form state and feedback
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    currentSupplier: '',
    companyWebsite: '',
    marketingOptIn: false,
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const formStartedAtRef = useRef(Date.now());

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // SEO
  useEffect(() => {
    SEOManager.setupPageSEO(
      {
        ...pageSEOConfigs.comparison,
        title: 'Business Energy Comparison | Compare Gas & Electricity | Revo Utilities',
        description:
          'Compare business gas and electricity rates in minutes. Get expert help to switch or renegotiate with your current supplier. Free business utilities comparison by Revo Utilities.',
        keywords:
          'business energy comparison, compare business gas, business electricity comparison, switch business energy, commercial energy quotes',
        structuredDataType: 'service',
        robots: 'index, follow',
        breadcrumbs: SEOManager.generateBreadcrumbs(location.pathname),
      },
      location.pathname
    );

    // Add FAQ structured data
    StructuredDataManager.addFAQStructuredData(
      faqs.map(f => ({ question: f.question, answer: f.answer }))
    );

    return () => {
      StructuredDataManager.cleanup();
    };
  }, [location.pathname]);

  // Form validation
  const validateForm = () => {
    if (!form.name.trim() || !form.businessName.trim() || !form.email.trim() || !form.phone.trim() || !form.currentSupplier.trim()) {
      setFormError('Please fill in all required fields.');
      return false;
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    setFormError(null);
    return true;
  };

  // Form submit handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus('loading');
    try {
      const response = await fetch('/api/crm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          subscriberPreference: form.marketingOptIn,
          formStartedAt: formStartedAtRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        console.info('Enquiry submitted successfully.');
        formStartedAtRef.current = Date.now();
        setForm({ name: '', businessName: '', email: '', phone: '', currentSupplier: '', companyWebsite: '', marketingOptIn: false });
      } else {
        throw new Error(result.error || 'Failed to submit form');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setFormStatus('error');
      setFormError('Something went wrong. Please try again.');
    }
  };

  // Form input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  // Calculate the width of one testimonial card (approximate, for smooth loop)
  // We'll use a fixed width for each card for simplicity

  const faqs = [
    {
      question: "How does the utility comparison process work?",
      answer: "Our process is simple and efficient. First, you provide your business details and current utility information through our form. Our expert team then analyses your requirements and compares rates from leading UK suppliers. We'll present you with the best options tailored to your business needs, with clear explanations of each tariff's benefits."
    },
    {
      question: "What information do I need to provide for a comparison?",
      answer: "To get an accurate comparison, we'll need your business name, current supplier details, and approximate annual consumption. Don't worry if you don't have all the information - our team can help you find the necessary details from your existing bills or meter readings."
    },
    {
      question: "Are there any fees for using your comparison service?",
      answer: "No, our comparison service is completely free. We're paid by the energy suppliers when you switch through us, which means you get expert advice and support at no additional cost to your business."
    },
    {
      question: "How long does it take to switch suppliers?",
      answer: " We can switch suppliers instantly our secure pricing for future start dates ensuring your business is protected by market increases in the future"
    },
    {
      question: "What happens if I'm in a fixed-term contract?",
      answer: "If you're in a fixed-term contract, we can still help you plan your switch for when your contract ends. We'll note your contract end date and contact you before it expires to ensure a smooth transition to a better deal."
    }
  ];

  // FAQ accessibility: generate unique ids for each FAQ
  const faqId = (index: number) => `faq-panel-${index}`;
  const faqButtonId = (index: number) => `faq-button-${index}`;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* Hero Section with Background Colour */}
      <div className="bg-gradient-to-b from-primary-300 to-gray-50">
        <section className="relative w-full min-h-[80vh] flex items-center justify-center pt-20 pb-12 md:pt-28 md:pb-20 lg:pt-32 lg:pb-28">
          <Container className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 w-full" size="xl" responsive centered>
            {/* Headline and subheadline */}
            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left justify-center w-full max-w-xl mx-auto md:pr-8">
              <span className="uppercase tracking-widest text-[var(--primary-color)] font-semibold text-sm mb-4 block">Your Utility Advisor</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-[var(--secondary-color)] leading-tight">
                Your <span className="bg-primary-400 text-black font-extrabold rounded-md px-2 py-0.5" style={{lineHeight: '1.2'}}>Trusted</span> Utility Partner, Delivering Value with Integrity.
              </h1>
              <p className="text-base md:text-lg text-[var(--secondary-color)]/80 mb-6 md:mb-8">
                Your savings are our priority. We stand by your side with expertise and dedication, ensuring you get the best deal for your business utilities.
              </p>
              <div className="flex flex-col xs:flex-row xs:items-center gap-4 mt-2 w-full xs:w-auto justify-center md:justify-start">
                <Button to="#form" variant="primary" size="lg" icon={<ArrowRight size={20} />}>Fill in the form</Button>
                <a href="tel:+441412809986" className="flex items-center text-[var(--primary-color)] font-semibold text-base sm:text-lg xs:ml-4 justify-center xs:justify-start mt-2 xs:mt-0" aria-label="Call 0141 280 9986">
                  <Phone size={20} className="mr-2" />
                  0141 280 9986
                </a>
              </div>
            </div>
            {/* Form Card */}
            <div id="form" className="flex-1 w-full max-w-md bg-white rounded-xl shadow-lg p-5 md:p-8 mt-8 md:mt-0 md:self-center mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-[var(--secondary-color)] text-center">Compare Us</h2>
              <p className="text-[var(--secondary-color)]/80 mb-6 text-center">Fill in your details below and let&apos;s see how you can save on your utility bills.</p>
              <form className="space-y-4" autoComplete="off" aria-label="Utilities Comparison Enquiry Form" onSubmit={handleFormSubmit}>
                <div className="absolute left-[-10000px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="companyWebsite">Company website</label>
                  <input
                    id="companyWebsite"
                    name="companyWebsite"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.companyWebsite}
                    onChange={handleInputChange}
                  />
                </div>
                <Input label="Name" id="name" name="name" type="text" required placeholder="Your full name" variant="glass" value={form.name} onChange={handleInputChange} />
                <Input label="Business Name" id="businessName" name="businessName" type="text" required placeholder="Your business name" variant="glass" value={form.businessName} onChange={handleInputChange} />
                <Input label="Email" id="email" name="email" type="email" required placeholder="Email Address" variant="glass" value={form.email} onChange={handleInputChange} />
                <Input label="Phone Number" id="phone" name="phone" type="tel" required placeholder="Your contact number" variant="glass" value={form.phone} onChange={handleInputChange} />
                <Input label="Current Supplier" id="currentSupplier" name="currentSupplier" type="text" required placeholder="Eon, British Gas, etc" variant="glass" value={form.currentSupplier} onChange={handleInputChange} />
                <div className="flex items-start gap-3">
                  <input
                    id="marketingOptIn"
                    name="marketingOptIn"
                    type="checkbox"
                    checked={form.marketingOptIn}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                  />
                  <label htmlFor="marketingOptIn" className="text-sm text-[var(--secondary-color)]/80">
                    I’d like to receive marketing communications from Revo Utilities (optional).
                  </label>
                </div>
                <div aria-live="polite" className="min-h-[1.5em] text-sm">
                  {formError && <span className="text-red-600">{formError}</span>}
                  {formStatus === 'success' && <span className="text-green-700">Thank you! We will be in touch shortly.</span>}
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full mt-4 mb-4" disabled={formStatus === 'loading'}>
                  {formStatus === 'loading' ? 'Submitting...' : 'Get My Free Quote'}
                </Button>
              </form>
            </div>
          </Container>
        </section>
      </div>

      {/* Logo Bar Section */}
      <section className="py-8 md:py-10 px-4 sm:px-6 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-center text-sm font-medium text-[var(--secondary-color)]/60 mb-6">COMPARE AGAINST LEADING UK ENERGY SUPPLIERS</h3>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            <img src="/logos/optimized/British_Gas_logo.svg.webp" alt="British Gas" className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition duration-300" />
            <img src="/logos/optimized/EDF_Energy_logo.svg.webp" alt="EDF Energy" className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition duration-300" />
            <img src="/logos/optimized/Logo_E.ON.svg.webp" alt="E.ON Next" className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition duration-300" />
            <img src="/logos/optimized/ScottishPower_Logo_2023.svg.webp" alt="ScottishPower" className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition duration-300" />
          </div>
        </div>
      </section>

      {/* Utility Solutions & Benefits Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-[var(--background)]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--secondary-color)] mb-3">Get Utility Saving Solutions</h2>
            <p className="text-[var(--secondary-color)]/70 max-w-2xl mx-auto">Comprehensive solutions designed to reduce your business costs with guaranteed savings</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <Card className="h-full p-5 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center mb-4">
                <Check size={24} className="text-[var(--primary-color)]" />
              </div>
              <h3 className="font-semibold text-[var(--secondary-color)] mb-2">Guaranteed Savings</h3>
              <p className="text-[var(--secondary-color)]/70 text-sm">With a guaranteed 15% saving on at least one of your services</p>
            </Card>
            <Card className="h-full p-5 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center mb-4">
                <Check size={24} className="text-[var(--primary-color)]" />
              </div>
              <h3 className="font-semibold text-[var(--secondary-color)] mb-2">Tailored Strategies</h3>
              <p className="text-[var(--secondary-color)]/70 text-sm">Strategies to suit your business needs and usage patterns</p>
            </Card>
            <Card className="h-full p-5 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center mb-4">
                <Check size={24} className="text-[var(--primary-color)]" />
              </div>
              <h3 className="font-semibold text-[var(--secondary-color)] mb-2">Complete Solutions</h3>
              <p className="text-[var(--secondary-color)]/70 text-sm">Complete solutions for everything that costs your business money</p>
            </Card>
            <Card className="h-full p-5 md:p-8 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--primary-color)]/10 flex items-center justify-center mb-4">
                <Check size={24} className="text-[var(--primary-color)]" />
              </div>
              <h3 className="font-semibold text-[var(--secondary-color)] mb-2">10+ Years Experience</h3>
              <p className="text-[var(--secondary-color)]/70 text-sm">Over a decade of experience serving UK businesses with reliable energy solutions.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Feature Grid Section (split view) - move here above FAQ */}
      <section className="w-full py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="w-full h-80 md:h-[480px] flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
              alt="Business team working together"
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
          {/* Right: Features List */}
          <div className="w-full flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--secondary-color)]">Our Key Services</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[var(--primary-color)] flex-shrink-0"></span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Business Energy</h3>
                  <p className="text-gray-600 text-sm">Secure competitive rates and tailored contracts from top UK suppliers, with expert support at every step.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[var(--primary-color)] flex-shrink-0"></span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Telecoms</h3>
                  <p className="text-gray-600 text-sm">Business broadband, phone systems, and connectivity solutions for modern enterprises.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[var(--primary-color)] flex-shrink-0"></span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Merchant Services</h3>
                  <p className="text-gray-600 text-sm">POS/EPOS solutions and payment processing for all business types.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[var(--primary-color)] flex-shrink-0"></span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">EV Solutions</h3>
                  <p className="text-gray-600 text-sm">Electric vehicle charging infrastructure and support for your fleet.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[var(--primary-color)] flex-shrink-0"></span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Renewables</h3>
                  <p className="text-gray-600 text-sm">Solar, wind, and green energy solutions for a sustainable future.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 w-2 h-2 rounded-full bg-[var(--primary-color)] flex-shrink-0"></span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Insurance</h3>
                  <p className="text-gray-600 text-sm">Business insurance solutions through our trusted partners.</p>
                </div>
              </li>
            </ul>
            <Button to="/our-services" variant="primary" size="lg" className="mt-10 w-full md:w-auto">Explore All Services</Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 bg-[var(--background)]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--secondary-color)] mb-3">Frequently Asked Questions</h2>
            <p className="text-[var(--secondary-color)]/70 max-w-2xl mx-auto">Find answers to common questions about our utility comparison service</p>
            <p className="text-[var(--secondary-color)]/70 max-w-2xl mx-auto mt-2 text-sm">
              Looking to get started? Begin your <a href="/comparison" className="text-[var(--primary-color)] underline">business energy comparison</a> or learn more about our
              {' '}<a href="/our-services" className="text-[var(--primary-color)] underline">business utility services</a>.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={false}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <button
                  id={faqButtonId(index)}
                  aria-expanded={openFaqIndex === index}
                  aria-controls={faqId(index)}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenFaqIndex(openFaqIndex === index ? null : index);
                    }
                  }}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-color)]"
                >
                  <span className="font-semibold text-[var(--secondary-color)]">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-[var(--primary-color)]" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      id={faqId(index)}
                      role="region"
                      aria-labelledby={faqButtonId(index)}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-[var(--secondary-color)]/80 border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maximize Your Business Potential Section (moved from Services) */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center mb-16 md:mb-20">
            <span className="inline-block text-[var(--primary-color)] text-sm font-semibold tracking-widest uppercase mb-3">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Maximise Your Business Potential</h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-light)] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover how Revo Utilities transforms your business operations <br /> with innovative utility solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Cost Savings Card */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-[var(--primary-color)] transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[var(--primary-color)]/10">
              <div className="w-16 h-16 mb-6 bg-[var(--primary-color)]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Significant Cost Savings</h3>
              <p className="text-gray-300 mb-6">
                Leverage our expertise to reduce your utility expenses by 10-15% on average, with some clients saving up to 30%.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Average 15% savings
                </span>
                <span className="mx-3">•</span>
                <span>No upfront costs</span>
              </div>
            </div>
            {/* Time Efficiency Card */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-[var(--primary-color)] transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[var(--primary-color)]/10">
              <div className="w-16 h-16 mb-6 bg-[var(--primary-color)]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Time Efficiency</h3>
              <p className="text-gray-300 mb-6">
                Save countless hours with our end-to-end utility management, from research to implementation and ongoing support.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  80% time saved
                </span>
                <span className="mx-3">•</span>
                <span>Dedicated account manager</span>
              </div>
            </div>
            {/* Expert Advice Card */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl border border-gray-700 hover:border-[var(--primary-color)] transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[var(--primary-color)]/10">
              <div className="w-16 h-16 mb-6 bg-[var(--primary-color)]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">Expert Guidance</h3>
              <p className="text-gray-300 mb-6">
                Access industry experts who provide tailored recommendations based on your specific business needs and goals.
              </p>
              <div className="flex items-center text-sm text-gray-400">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                  15+ years experience
                </span>
                <span className="mx-3">•</span>
                <span>Ongoing support</span>
              </div>
            </div>
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 mb-4 bg-[var(--primary-color)]/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ongoing Support</h3>
              <p className="text-gray-300">
                Continuous account management and regular rate reviews
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Comparison;
