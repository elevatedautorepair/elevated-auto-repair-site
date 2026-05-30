import { useMemo, useState } from 'react'
import {
  ArrowRight,
  BatteryCharging,
  CalendarCheck2,
  Car,
  CheckCircle2,
  CircleGauge,
  ClipboardCheck,
  Clock3,
  Cog,
  Disc3,
  FileImage,
  Gauge,
  Mail,
  MapPin,
  Menu,
  Navigation,
  Phone,
  ShieldCheck,
  Snowflake,
  Wrench,
  X,
  Zap,
} from 'lucide-react'
import './App.css'

const phoneDisplay = '(270) 577-2479'
const phoneHref = 'tel:+12705772479'
const smsHrefBase = 'sms:+12705772479'
const emailDisplay = 'service@elevatedautorepairky.com'
const emailHrefBase = `mailto:${emailDisplay}`
const address = '3046 Ohio Dr, Henderson, KY 42420'
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
const facebookHref = 'https://www.facebook.com/share/18XtvYkQjM/?mibextid=wwXIfr'

const services = [
  {
    id: 'Diagnostics',
    icon: CircleGauge,
    title: 'Diagnostics',
    text: 'Warning lights, drivability problems, noises, leaks, and performance concerns traced before parts are recommended.',
  },
  {
    id: 'Brakes',
    icon: Disc3,
    title: 'Brakes',
    text: 'Pads, rotors, hydraulic checks, noise diagnosis, and brake feel issues handled with clear approval first.',
  },
  {
    id: 'Maintenance',
    icon: Wrench,
    title: 'Maintenance',
    text: 'Oil service, fluids, filters, belts, hoses, tune-up items, and mileage-based care to keep the vehicle dependable.',
  },
  {
    id: 'Engine Repair / Replacement',
    icon: Cog,
    title: 'Engine Repair / Replacement',
    text: 'Engine concerns, major repair planning, replacement guidance, and clear next steps before big work is approved.',
  },
  {
    id: 'A/C Service',
    icon: Snowflake,
    title: 'A/C Service',
    text: 'Cooling performance checks, leak concerns, blower issues, and climate-control service for hot Kentucky days.',
  },
  {
    id: 'Electrical',
    icon: BatteryCharging,
    title: 'Electrical',
    text: 'Batteries, charging systems, lighting, fuses, starting problems, parasitic draws, and electrical diagnostics.',
  },
  {
    id: 'Steering / Suspension',
    icon: Gauge,
    title: 'Steering / Suspension',
    text: 'Shocks, struts, steering feel, clunks, wheel-end concerns, and ride quality issues inspected carefully.',
  },
]

const processSteps = [
  {
    icon: CalendarCheck2,
    title: 'Request',
    text: 'Send the vehicle details, preferred timing, and the symptom you are noticing.',
  },
  {
    icon: CircleGauge,
    title: 'Inspect',
    text: 'The concern is checked first so the repair path is based on the real cause.',
  },
  {
    icon: ClipboardCheck,
    title: 'Approve',
    text: 'You get the next step and expected cost before repair work moves forward.',
  },
  {
    icon: Wrench,
    title: 'Repair',
    text: 'The approved work is completed, checked, and explained before pickup.',
  },
]

const makes = [
  'Chevrolet',
  'Ford',
  'Toyota',
  'Honda',
  'Nissan',
  'GMC',
  'Dodge',
  'Ram',
  'Jeep',
  'Hyundai',
  'Kia',
  'Subaru',
  'BMW',
  'Mercedes-Benz',
]

const years = Array.from({ length: 31 }, (_, index) => `${2026 - index}`)

const initialForm = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  vehicleYear: '',
  make: '',
  model: '',
  mileage: '',
  service: 'Diagnostics',
  date: '',
  time: '',
  dropoff: '',
  notes: '',
  photoName: '',
}

const requiredFields = [
  'firstName',
  'lastName',
  'phone',
  'vehicleYear',
  'make',
  'model',
  'service',
  'date',
  'time',
  'dropoff',
]

function formatRequest(request, requestId) {
  return [
    `Elevated Auto Repair request ${requestId}`,
    `Name: ${request.firstName} ${request.lastName}`,
    `Phone: ${request.phone}`,
    request.email ? `Email: ${request.email}` : null,
    `Vehicle: ${request.vehicleYear} ${request.make} ${request.model}`,
    request.mileage ? `Mileage: ${request.mileage}` : null,
    `Service: ${request.service}`,
    `Preferred: ${request.date} at ${request.time}`,
    `Visit type: ${request.dropoff}`,
    request.photoName ? `Photo: ${request.photoName}` : null,
    request.notes ? `Notes: ${request.notes}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [quickQuote, setQuickQuote] = useState({
    service: 'Diagnostics',
    vehicleYear: '',
    make: '',
    model: '',
  })
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState(null)
  const [submittedRequest, setSubmittedRequest] = useState(null)

  const submittedMessage = useMemo(() => {
    if (!submittedRequest) return ''
    return formatRequest(submittedRequest.data, submittedRequest.id)
  }, [submittedRequest])

  const submittedSmsHref = useMemo(() => {
    if (!submittedMessage) return smsHrefBase
    return `${smsHrefBase}?&body=${encodeURIComponent(submittedMessage)}`
  }, [submittedMessage])

  const submittedEmailHref = useMemo(() => {
    if (!submittedRequest || !submittedMessage) return emailHrefBase
    const subject = `Service request ${submittedRequest.id}`
    return `${emailHrefBase}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(submittedMessage)}`
  }, [submittedMessage, submittedRequest])

  function handleQuickChange(event) {
    const { name, value } = event.target
    setQuickQuote((current) => ({ ...current, [name]: value }))
  }

  function selectQuickService(service) {
    setQuickQuote((current) => ({ ...current, service }))
  }

  function continueToAppointment() {
    setFormData((current) => ({
      ...current,
      service: quickQuote.service,
      vehicleYear: quickQuote.vehicleYear,
      make: quickQuote.make,
      model: quickQuote.model,
    }))
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleFormChange(event) {
    const { name, value, files } = event.target
    setFormData((current) => ({
      ...current,
      [name]: files?.[0]?.name ?? value,
    }))
    setStatus(null)
  }

  function selectService(service) {
    setFormData((current) => ({ ...current, service }))
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const missing = requiredFields.filter((field) => !formData[field]?.trim())

    if (missing.length) {
      setStatus({
        type: 'error',
        message: 'Please fill in the required service request fields before submitting.',
      })
      return
    }

    const requestId = `EA-${Date.now().toString().slice(-6)}`
    const nextRequest = { id: requestId, data: formData }
    setSubmittedRequest(nextRequest)
    localStorage.setItem('elevatedAutoRepairLastRequest', JSON.stringify(nextRequest))
    setStatus({
      type: 'success',
      message: `Request ${requestId} is ready. You can text it, call now, or copy the details.`,
    })
  }

  async function copyRequest() {
    if (!submittedMessage) return
    await navigator.clipboard.writeText(submittedMessage)
    setStatus({
      type: 'success',
      message: 'Request details copied.',
    })
  }

  const navLinks = [
    ['Services', '#services'],
    ['Process', '#process'],
    ['About', '#about'],
    ['Book', '#book'],
  ]

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Elevated Auto Repair home">
          <img src="/assets/elevated-logo-wide.png" alt="Elevated Auto Repair" />
        </a>

        <nav className={mobileMenuOpen ? 'primary-nav is-open' : 'primary-nav'} aria-label="Main navigation">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>

        <a className="header-call" href={phoneHref}>
          <Phone size={18} aria-hidden="true" />
          <span>{phoneDisplay}</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">
              <span>Auto</span>
              <span>repair,</span>
              <span>elevated.</span>
            </h1>
            <p>
              Clean diagnostics, clear repair guidance, and dependable service for drivers in Henderson and the
              surrounding area.
            </p>

            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="#book">
                Request service
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button-outline" href={phoneHref}>
                <Phone size={18} aria-hidden="true" />
                Call
              </a>
            </div>

            <div className="hero-proof" aria-label="Service standards">
              <span>
                <CheckCircle2 size={18} aria-hidden="true" />
                Written approval first
              </span>
              <span>
                <ShieldCheck size={18} aria-hidden="true" />
                Owner-led service
              </span>
              <span>
                <MapPin size={18} aria-hidden="true" />
                Henderson, KY
              </span>
            </div>
          </div>

          <div className="hero-media" aria-hidden="true">
            <img src="/assets/hero-bay.png" alt="" />
            <div className="hero-angle"></div>
          </div>
        </section>

        <section className="quick-quote-section" aria-labelledby="quick-quote-title">
          <div className="quick-quote-panel">
            <div className="section-intro dark">
              <h2 id="quick-quote-title">Get a quick service start</h2>
              <p>Choose the issue and vehicle basics, then continue into the full request form.</p>
            </div>

            <div className="service-chip-row" role="list" aria-label="Common service choices">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <button
                    className={quickQuote.service === service.id ? 'service-chip is-selected' : 'service-chip'}
                    key={service.id}
                    type="button"
                    onClick={() => selectQuickService(service.id)}
                  >
                    <Icon size={22} aria-hidden="true" />
                    <span>{service.title}</span>
                  </button>
                )
              })}
            </div>

            <div className="quick-fields">
              <label>
                <span>Year</span>
                <select name="vehicleYear" value={quickQuote.vehicleYear} onChange={handleQuickChange}>
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Make</span>
                <input
                  name="make"
                  list="vehicle-makes"
                  placeholder="Vehicle make"
                  value={quickQuote.make}
                  onChange={handleQuickChange}
                />
              </label>

              <label>
                <span>Model</span>
                <input name="model" placeholder="Vehicle model" value={quickQuote.model} onChange={handleQuickChange} />
              </label>

              <button className="button button-primary quote-button" type="button" onClick={continueToAppointment}>
                Continue request
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        <section className="services-section" id="services" aria-labelledby="services-title">
          <div className="section-intro">
            <h2 id="services-title">Service built around the problem, not the guess.</h2>
            <p>
              Start with the concern, get a sensible inspection path, and approve the repair before work begins.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article className="service-card" key={service.id}>
                  <div className="service-icon">
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button type="button" onClick={() => selectService(service.id)}>
                    Select service
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </article>
              )
            })}
          </div>
        </section>

        <section className="process-section" id="process" aria-labelledby="process-title">
          <div className="section-intro dark">
            <h2 id="process-title">A clear path from concern to repair.</h2>
            <p>Designed for people who want straight answers, clean communication, and no surprise work.</p>
          </div>

          <div className="process-grid">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <article className="process-step" key={step.title}>
                  <div className="process-number">{index + 1}</div>
                  <Icon size={30} aria-hidden="true" />
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="about-copy">
            <div className="section-intro">
              <h2 id="about-title">Local repair with a sharper standard.</h2>
              <p>
                Elevated Auto Repair is starting with a simple operating promise: diagnose carefully, explain clearly,
                and keep the vehicle owner in control of the repair decision.
              </p>
            </div>

            <div className="trust-list">
              <div>
                <Zap size={22} aria-hidden="true" />
                <span>Fast intake for urgent concerns</span>
              </div>
              <div>
                <ClipboardCheck size={22} aria-hidden="true" />
                <span>Approval before parts or labor</span>
              </div>
              <div>
                <Car size={22} aria-hidden="true" />
                <span>Practical guidance for daily drivers and work vehicles</span>
              </div>
            </div>
          </div>

          <aside className="location-panel" aria-label="Shop contact information">
            <div className="location-photo">
              <img src="/assets/technician-greeting.png" alt="Technician greeting a customer in a clean repair bay" />
              <div className="location-logo-card" aria-hidden="true">
                <img src="/assets/elevated-logo-wide.png" alt="" />
              </div>
            </div>
            <div className="location-details">
              <h3>Elevated Auto Repair</h3>
              <p>{address}</p>
              <p>
                <Phone size={17} aria-hidden="true" />
                <a href={phoneHref}>{phoneDisplay}</a>
              </p>
              <p>
                <Mail size={17} aria-hidden="true" />
                <a href={emailHrefBase}>{emailDisplay}</a>
              </p>
              <p>
                <Clock3 size={17} aria-hidden="true" />
                Call for current availability
              </p>
              <a className="button button-outline" href={mapsHref} target="_blank" rel="noreferrer">
                Get directions
                <Navigation size={18} aria-hidden="true" />
              </a>
              <a className="button button-outline social-button" href={facebookHref} target="_blank" rel="noreferrer">
                <FacebookIcon />
                Facebook
              </a>
            </div>
          </aside>
        </section>

        <section className="booking-section" id="book" aria-labelledby="booking-title">
          <div className="booking-heading">
            <div className="section-intro">
              <h2 id="booking-title">Request an appointment.</h2>
              <p>
                Fill out the vehicle and symptom details. The form validates the request and prepares it to send by
                text or copy for follow-up.
              </p>
            </div>
            <a className="button button-outline" href={phoneHref}>
              <Phone size={18} aria-hidden="true" />
              Call
            </a>
          </div>

          <form className="appointment-form" onSubmit={handleSubmit} noValidate>
            <datalist id="vehicle-makes">
              {makes.map((make) => (
                <option key={make} value={make} />
              ))}
            </datalist>

            <div className="field-grid">
              <label>
                <span>First name *</span>
                <input name="firstName" value={formData.firstName} onChange={handleFormChange} autoComplete="given-name" />
              </label>
              <label>
                <span>Last name *</span>
                <input name="lastName" value={formData.lastName} onChange={handleFormChange} autoComplete="family-name" />
              </label>
              <label>
                <span>Phone *</span>
                <input name="phone" value={formData.phone} onChange={handleFormChange} autoComplete="tel" inputMode="tel" />
              </label>
              <label>
                <span>Email</span>
                <input name="email" value={formData.email} onChange={handleFormChange} autoComplete="email" type="email" />
              </label>
              <label>
                <span>Year *</span>
                <select name="vehicleYear" value={formData.vehicleYear} onChange={handleFormChange}>
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>Make *</span>
                <input name="make" list="vehicle-makes" value={formData.make} onChange={handleFormChange} />
              </label>
              <label>
                <span>Model *</span>
                <input name="model" value={formData.model} onChange={handleFormChange} />
              </label>
              <label>
                <span>Mileage</span>
                <input name="mileage" value={formData.mileage} onChange={handleFormChange} inputMode="numeric" />
              </label>
              <label>
                <span>Service needed *</span>
                <select name="service" value={formData.service} onChange={handleFormChange}>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Other">Other / not sure</option>
                </select>
              </label>
              <label>
                <span>Preferred date *</span>
                <input
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  inputMode="numeric"
                  placeholder="MM/DD/YYYY"
                />
              </label>
              <label>
                <span>Preferred time *</span>
                <select name="time" value={formData.time} onChange={handleFormChange}>
                  <option value="">Select time</option>
                  <option value="Morning">Morning</option>
                  <option value="Midday">Midday</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="First available">First available</option>
                </select>
              </label>
              <label>
                <span>Drop off *</span>
                <select name="dropoff" value={formData.dropoff} onChange={handleFormChange}>
                  <option value="">Select option</option>
                  <option value="Drop off">Drop off</option>
                  <option value="Tow-in / not drivable">Tow-in / not drivable</option>
                  <option value="Need advice">Need advice</option>
                </select>
              </label>
            </div>

            <div className="form-lower-grid">
              <label className="notes-field">
                <span>Additional details / symptoms</span>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  placeholder="Tell us what changed, when it happens, warning lights, noises, leaks, or recent work."
                />
              </label>

              <label className="upload-field">
                <FileImage size={34} aria-hidden="true" />
                <span>{formData.photoName || 'Upload photo name for the request'}</span>
                <small>Optional: warning light, leak, tire, part, or dash message</small>
                <input name="photoName" type="file" accept="image/*" onChange={handleFormChange} />
              </label>
            </div>

            {status && (
              <div className={status.type === 'success' ? 'form-status success' : 'form-status error'} role="status">
                {status.message}
              </div>
            )}

            <div className="form-actions">
              <button className="button button-primary" type="submit">
                Prepare request
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              {submittedRequest && (
                <>
                  <a className="button button-dark" href={submittedEmailHref}>
                    <Mail size={18} aria-hidden="true" />
                    Email request
                  </a>
                  <a className="button button-dark" href={submittedSmsHref}>
                    <Phone size={18} aria-hidden="true" />
                    Text request
                  </a>
                  <button className="button button-outline" type="button" onClick={copyRequest}>
                    Copy details
                  </button>
                </>
              )}
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <img src="/assets/elevated-logo-wide.png" alt="Elevated Auto Repair" />
          <p>Auto repair, elevated.</p>
        </div>
        <div>
          <h2>Contact</h2>
          <p>{address}</p>
          <a href={phoneHref}>{phoneDisplay}</a>
          <a href={emailHrefBase}>{emailDisplay}</a>
        </div>
        <div>
          <h2>Quick links</h2>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#book">Book appointment</a>
          <a href={facebookHref} target="_blank" rel="noreferrer">
            Facebook
          </a>
        </div>
      </footer>

      <div className="mobile-action-bar" aria-label="Mobile contact actions">
        <a href={phoneHref}>
          <Phone size={18} aria-hidden="true" />
          Call
        </a>
        <a href="#book">
          <CalendarCheck2 size={18} aria-hidden="true" />
          Book
        </a>
      </div>
    </div>
  )
}

function FacebookIcon() {
  return (
    <svg className="facebook-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M14.4 8.2V6.7c0-.7.5-.9 1-.9h1.8V2.7L14.7 2.6c-3 0-4.7 1.8-4.7 4.9v.7H7v3.5h3V21h3.8v-9.3h3l.5-3.5h-3Z"
      />
    </svg>
  )
}

export default App
