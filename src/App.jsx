import { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Car,
  Check,
  ChevronRight,
  Clock,
  Edit3,
  Gauge,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  UserRound,
  X
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2400&q=82";

const initialPackages = [
  {
    id: "mini-valet",
    name: "Mini Valet",
    price: 45,
    duration: "75 min",
    description: "A sharp maintenance clean for cars that need a premium refresh.",
    includes: ["Exterior safe wash", "Interior vacuum", "Glass cleaned", "Tyres dressed"],
    visible: true
  },
  {
    id: "standard-valet",
    name: "Standard Valet",
    price: 75,
    duration: "2 hrs",
    description: "Balanced inside and outside valet for a crisp, showroom-ready finish.",
    includes: ["Mini Valet included", "Door shuts", "Interior plastics", "Quick wax finish"],
    visible: true
  },
  {
    id: "full-valet",
    name: "Full Valet",
    price: 120,
    duration: "3.5 hrs",
    description: "Deep clean for family cars, daily drivers, and pre-sale presentation.",
    includes: ["Standard Valet included", "Seat shampoo", "Deep interior detail", "Paint sealant"],
    visible: true
  },
  {
    id: "ceramic-coating",
    name: "Ceramic Coating",
    price: 325,
    duration: "1 day",
    description: "Long-lasting gloss and protection prepared with careful paint decontamination.",
    includes: ["Decontamination wash", "Clay bar treatment", "Machine polish", "Ceramic protection"],
    visible: true
  }
];

const addOns = [
  { id: "pet-hair", name: "Pet Hair Removal", price: 20 },
  { id: "seat-shampoo", name: "Seat Shampoo", price: 25 },
  { id: "leather", name: "Leather Treatment", price: 30 },
  { id: "engine", name: "Engine Bay Clean", price: 35 },
  { id: "headlights", name: "Headlight Restoration", price: 45 },
  { id: "odour", name: "Odour Removal", price: 25 }
];

const gallery = [
  {
    title: "Paint Correction",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1200&q=78"
  },
  {
    title: "Interior Reset",
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&w=1200&q=78"
  },
  {
    title: "Ceramic Gloss",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=78"
  }
];

const reviews = [
  {
    name: "Sarah M.",
    date: "June 2026",
    text: "The car looked better than the day I collected it. Punctual, professional, and spotless work."
  },
  {
    name: "Daniel R.",
    date: "May 2026",
    text: "Booked a full valet before selling my car and it made a serious difference. Brilliant finish."
  },
  {
    name: "Emma T.",
    date: "April 2026",
    text: "Mobile service was effortless. Ciaran arrived on time and the interior is immaculate."
  }
];

const initialBookings = [
  {
    id: 1024,
    customer: "Niamh Kelly",
    service: "Full Valet",
    date: "2026-07-08",
    time: "10:00",
    status: "Pending",
    total: 145,
    vehicle: "Audi A4"
  },
  {
    id: 1025,
    customer: "Mark Devlin",
    service: "Ceramic Coating",
    date: "2026-07-09",
    time: "09:00",
    status: "Confirmed",
    total: 325,
    vehicle: "BMW 3 Series"
  }
];

const timeSlots = ["09:00", "10:30", "12:00", "14:00", "15:30"];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [packages, setPackages] = useState(initialPackages);
  const [bookings, setBookings] = useState(initialBookings);
  const [blockedSlots, setBlockedSlots] = useState(["2026-07-10-12:00"]);
  const [booking, setBooking] = useState({
    packageId: initialPackages[1].id,
    date: "2026-07-08",
    time: "10:30",
    vehicleSize: "Medium",
    addOns: []
  });
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const selectedPackage = packages.find((pkg) => pkg.id === booking.packageId) || packages[0];
  const selectedAddOns = addOns.filter((item) => booking.addOns.includes(item.id));
  const bookingTotal = selectedPackage.price + selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const visiblePackages = packages.filter((pkg) => pkg.visible);

  const availableSlots = useMemo(
    () => timeSlots.filter((slot) => !blockedSlots.includes(`${booking.date}-${slot}`)),
    [blockedSlots, booking.date]
  );

  const handleBookingChange = (event) => {
    const { name, value } = event.target;
    setBooking((current) => ({ ...current, [name]: value }));
  };

  const toggleAddOn = (id) => {
    setBooking((current) => ({
      ...current,
      addOns: current.addOns.includes(id)
        ? current.addOns.filter((item) => item !== id)
        : [...current.addOns, id]
    }));
  };

  const submitBooking = (event) => {
    event.preventDefault();
    const newBooking = {
      id: Date.now(),
      customer: booking.name || "New customer",
      service: selectedPackage.name,
      date: booking.date,
      time: booking.time,
      status: "Confirmed",
      total: bookingTotal,
      vehicle: `${booking.make || "Vehicle"} ${booking.model || ""}`.trim()
    };
    setBookings((current) => [newBooking, ...current]);
    setConfirmedBooking(newBooking);
  };

  const updatePackage = (id, field, value) => {
    setPackages((current) =>
      current.map((pkg) =>
        pkg.id === id ? { ...pkg, [field]: field === "price" ? Number(value) : value } : pkg
      )
    );
  };

  const addPackage = () => {
    const id = `package-${Date.now()}`;
    setPackages((current) => [
      ...current,
      {
        id,
        name: "New Detail Package",
        price: 95,
        duration: "2 hrs",
        description: "Editable package ready for seasonal offers or specialist work.",
        includes: ["Custom service list"],
        visible: true
      }
    ]);
  };

  const deletePackage = (id) => {
    setPackages((current) => current.filter((pkg) => pkg.id !== id));
    if (booking.packageId === id && packages.length > 1) {
      setBooking((current) => ({ ...current, packageId: packages.find((pkg) => pkg.id !== id)?.id }));
    }
  };

  const toggleSlot = (slot) => {
    const key = `${booking.date}-${slot}`;
    setBlockedSlots((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  const setBookingStatus = (id, status) => {
    setBookings((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Ciaran Barr Valeting and Detailing home">
          <span className="brand-mark">CB</span>
          <span>
            <strong>Ciaran Barr</strong>
            <small>Valeting & Detailing</small>
          </span>
        </a>
        <button className="icon-button nav-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#packages">Packages</a>
          <a href="#gallery">Gallery</a>
          <a href="#booking">Booking</a>
          <a href="#admin">Admin</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home" style={{ backgroundImage: `url(${heroImage})` }}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="eyebrow"><Sparkles size={16} /> Mobile car valeting across the local area</span>
            <h1>Ciaran Barr Valeting & Detailing</h1>
            <p>
              Premium mobile car care with precise detailing, rich gloss, and a booking flow made
              for getting your car looked after in minutes.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#booking">
                Book Now <ArrowRight size={18} />
              </a>
              <a className="button ghost" href="#packages">
                View Packages <ChevronRight size={18} />
              </a>
            </div>
          </div>
          <div className="hero-stats" aria-label="Business highlights">
            <span><strong>5.0</strong> Rated service</span>
            <span><strong>Mobile</strong> At home or work</span>
            <span><strong>2 min</strong> Online booking</span>
          </div>
        </section>

        <section className="trust-band">
          <div><BadgeCheck /> Fully insured</div>
          <div><ShieldCheck /> Secure booking</div>
          <div><Gauge /> Fast mobile service</div>
          <div><Sparkles /> Premium finishes</div>
        </section>

        <section className="section split" id="packages">
          <div className="section-copy">
            <span className="eyebrow">Service Menu</span>
            <h2>Valeting and detailing packages built around the condition of your car.</h2>
            <p>
              Choose a quick maintenance clean, a deep valet, or specialist protection. Every package
              can be adjusted by Ciaran from the admin dashboard without changing code.
            </p>
          </div>
          <div className="package-grid">
            {visiblePackages.map((pkg) => (
              <article className="package-card" key={pkg.id}>
                <div>
                  <span className="duration">{pkg.duration}</span>
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                </div>
                <ul>
                  {pkg.includes.map((item) => (
                    <li key={item}><Check size={16} /> {item}</li>
                  ))}
                </ul>
                <div className="package-footer">
                  <strong>£{pkg.price}</strong>
                  <a href="#booking" className="text-link">Select</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section gallery-section" id="gallery">
          <div className="section-heading">
            <span className="eyebrow">Before & After</span>
            <h2>Clean lines, corrected paint, and interiors that feel reset.</h2>
          </div>
          <div className="before-after">
            <div className="before-panel">
              <span>Before</span>
              <img src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=78" alt="Vehicle before detailing" />
            </div>
            <div className="after-panel">
              <span>After</span>
              <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=82" alt="Vehicle after detailing" />
            </div>
          </div>
          <div className="gallery-grid">
            {gallery.map((item) => (
              <figure key={item.title}>
                <img src={item.image} alt={item.title} />
                <figcaption>{item.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="section booking-section" id="booking">
          <div className="section-copy">
            <span className="eyebrow">Book Online</span>
            <h2>Reserve a slot in under two minutes.</h2>
            <p>
              Customers only see available times. Confirmation and reminder email hooks are ready
              for back-end integration when the booking service goes live.
            </p>
            {confirmedBooking && (
              <div className="confirmation" role="status">
                <BadgeCheck size={20} />
                Booking confirmed for {confirmedBooking.date} at {confirmedBooking.time}.
              </div>
            )}
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <label>
              Package
              <select name="packageId" value={booking.packageId} onChange={handleBookingChange}>
                {visiblePackages.map((pkg) => (
                  <option value={pkg.id} key={pkg.id}>{pkg.name} - £{pkg.price}</option>
                ))}
              </select>
            </label>
            <div className="form-row">
              <label>
                Date
                <input type="date" name="date" value={booking.date} onChange={handleBookingChange} required />
              </label>
              <label>
                Time
                <select name="time" value={booking.time} onChange={handleBookingChange}>
                  {availableSlots.map((slot) => <option key={slot}>{slot}</option>)}
                </select>
              </label>
            </div>
            <div className="addons">
              {addOns.map((item) => (
                <button
                  className={booking.addOns.includes(item.id) ? "addon active" : "addon"}
                  type="button"
                  key={item.id}
                  onClick={() => toggleAddOn(item.id)}
                >
                  {item.name} <span>£{item.price}</span>
                </button>
              ))}
            </div>
            <div className="form-row">
              <label>
                Make
                <input name="make" onChange={handleBookingChange} placeholder="BMW" required />
              </label>
              <label>
                Model
                <input name="model" onChange={handleBookingChange} placeholder="3 Series" required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Registration
                <input name="registration" onChange={handleBookingChange} placeholder="AB12 CDE" required />
              </label>
              <label>
                Vehicle Size
                <select name="vehicleSize" value={booking.vehicleSize} onChange={handleBookingChange}>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>SUV / Van</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Colour
                <input name="colour" onChange={handleBookingChange} placeholder="Black" />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" onChange={handleBookingChange} placeholder="07700 900000" required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Name
                <input name="name" onChange={handleBookingChange} placeholder="Your name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" onChange={handleBookingChange} placeholder="you@example.com" required />
              </label>
            </div>
            <label>
              Mobile Service Address
              <input name="address" onChange={handleBookingChange} placeholder="Street, town, postcode" required />
            </label>
            <label>
              Notes
              <textarea name="notes" onChange={handleBookingChange} placeholder="Access, condition, pet hair, stains, or anything Ciaran should know." />
            </label>
            <div className="booking-total">
              <span>Total</span>
              <strong>£{bookingTotal}</strong>
            </div>
            <button className="button primary full" type="submit">
              Confirm Booking <CalendarDays size={18} />
            </button>
          </form>
        </section>

        <section className="section why-section">
          <div className="section-heading">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Premium mobile detailing without the hassle.</h2>
          </div>
          <div className="feature-grid">
            <article><Car /><h3>Mobile convenience</h3><p>Valeting at home or work with professional equipment and tidy setup.</p></article>
            <article><Sparkles /><h3>Detail-led finish</h3><p>Careful preparation, quality products, and a finish that lasts.</p></article>
            <article><Clock /><h3>Controlled schedule</h3><p>Availability, holidays, working hours, and appointment slots are managed from admin.</p></article>
          </div>
        </section>

        <section className="section testimonials">
          <div className="section-heading">
            <span className="eyebrow">Reviews</span>
            <h2>Trusted by drivers who care how their car feels.</h2>
          </div>
          <div className="review-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="stars" aria-label="5 star rating">
                  {Array.from({ length: 5 }).map((_, index) => <Star fill="currentColor" key={index} size={17} />)}
                </div>
                <p>{review.text}</p>
                <strong>{review.name}</strong>
                <span>{review.date}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section admin-section" id="admin">
          <div className="section-copy">
            <span className="eyebrow">Admin Dashboard</span>
            <h2>Control bookings, availability, pricing, and customer work from one place.</h2>
            <p>
              This secure dashboard prototype shows the operational model: live booking records,
              package editing, slot blocking, revenue visibility, and schedule management.
            </p>
          </div>
          <div className="dashboard">
            <div className="metric-row">
              <div><span>Today</span><strong>{bookings.filter((item) => item.date === "2026-07-08").length}</strong></div>
              <div><span>Upcoming</span><strong>{bookings.length}</strong></div>
              <div><span>Revenue</span><strong>£{bookings.reduce((sum, item) => sum + item.total, 0)}</strong></div>
              <div><span>Pending</span><strong>{bookings.filter((item) => item.status === "Pending").length}</strong></div>
            </div>

            <div className="dashboard-grid">
              <section className="admin-panel">
                <div className="panel-title">
                  <h3>Bookings</h3>
                  <span>Daily schedule</span>
                </div>
                <div className="booking-list">
                  {bookings.map((item) => (
                    <article className="booking-item" key={item.id}>
                      <div>
                        <strong>{item.time} - {item.customer}</strong>
                        <span>{item.service} · {item.vehicle} · £{item.total}</span>
                      </div>
                      <div className="status-actions">
                        <button type="button" onClick={() => setBookingStatus(item.id, "Completed")} aria-label="Mark completed"><Check size={16} /></button>
                        <button type="button" onClick={() => setBookingStatus(item.id, "Cancelled")} aria-label="Cancel booking"><X size={16} /></button>
                        <small className={`status ${item.status.toLowerCase()}`}>{item.status}</small>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="admin-panel">
                <div className="panel-title">
                  <h3>Availability</h3>
                  <span>{booking.date}</span>
                </div>
                <div className="slot-grid">
                  {timeSlots.map((slot) => {
                    const blocked = blockedSlots.includes(`${booking.date}-${slot}`);
                    return (
                      <button className={blocked ? "slot blocked" : "slot"} onClick={() => toggleSlot(slot)} type="button" key={slot}>
                        <Clock size={15} /> {slot}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="admin-panel package-manager">
                <div className="panel-title">
                  <h3>Pricing</h3>
                  <button className="mini-button" type="button" onClick={addPackage}>Add Package</button>
                </div>
                {packages.map((pkg) => (
                  <div className="package-editor" key={pkg.id}>
                    <Edit3 size={16} />
                    <input value={pkg.name} onChange={(event) => updatePackage(pkg.id, "name", event.target.value)} aria-label={`${pkg.name} name`} />
                    <input type="number" value={pkg.price} onChange={(event) => updatePackage(pkg.id, "price", event.target.value)} aria-label={`${pkg.name} price`} />
                    <button type="button" onClick={() => updatePackage(pkg.id, "visible", !pkg.visible)}>{pkg.visible ? "Hide" : "Show"}</button>
                    <button type="button" onClick={() => deletePackage(pkg.id)} aria-label={`Delete ${pkg.name}`}><Trash2 size={15} /></button>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-copy">
            <span className="eyebrow">Contact</span>
            <h2>Ready for a cleaner, glossier car?</h2>
            <p>Mobile valeting and detailing by appointment. Serving local homes, workplaces, and regular maintenance clients.</p>
            <div className="contact-links">
              <a href="tel:+447700900000"><Phone size={18} /> 07700 900000</a>
              <a href="mailto:bookings@ciaranbarrvaleting.co.uk"><Mail size={18} /> bookings@ciaranbarrvaleting.co.uk</a>
              <span><MapPin size={18} /> Local mobile service area</span>
            </div>
          </div>
          <form className="contact-form">
            <label>Name<input placeholder="Your name" /></label>
            <label>Email<input type="email" placeholder="you@example.com" /></label>
            <label>Message<textarea placeholder="Tell us what your vehicle needs." /></label>
            <button className="button primary full" type="button">Send Enquiry <UserRound size={18} /></button>
          </form>
        </section>
      </main>

      <footer>
        <strong>Ciaran Barr Valeting & Detailing</strong>
        <span>Premium mobile car care · Secure booking · Professional detailing</span>
        <small>© 2026 Ciaran Barr Valeting & Detailing. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default App;
