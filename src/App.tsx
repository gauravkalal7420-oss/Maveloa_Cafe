import { useEffect, useState, type FormEvent, type TouchEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUp, Check, ChevronLeft, ChevronRight, Coffee, Heart, Leaf, Menu as MenuIcon, MessageCircle, Moon, Phone, Sparkles, Utensils, Wifi, X } from 'lucide-react';
import { menuCategories, menuItems, type MenuCategory } from './data/menu';
import { testimonials } from './data/testimonials';

const outdoor = '/images/maveloa-outdoor.png';
const interior = '/images/maveloa-interior.png';
const foodEditorial = '/images/maveloa-food-editorial.png';
const navLinks = [{ label: 'Our Story', href: '#about' }, { label: 'Menu', href: '#menu' }, { label: 'Ambience', href: '#ambience' }, { label: 'Reviews', href: '#reviews' }, { label: 'Contact', href: '#contact' }];

function App() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<MenuCategory>('Coffee');
  const [reviewIndex, setReviewIndex] = useState(0);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const [showTop, setShowTop] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 60); setShowTop(window.scrollY > 650); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const anchor = window.location.hash.slice(1);
    const section = anchor ? document.getElementById(anchor) : null;
    if (!section) return;
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY - 86);
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', closeOnEscape); document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (target: string) => {
    setMenuOpen(false);
    document.querySelector(target)?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  const visibleMenu = menuItems.filter((item) => item.category === category);
  const currentReview = testimonials[reviewIndex];
  const swipeEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStart === null) return;
    const delta = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(delta) > 45) setReviewIndex((index) => (index + (delta < 0 ? 1 : -1) + testimonials.length) % testimonials.length);
    setTouchStart(null);
  };
  const submitEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('success');
    event.currentTarget.reset();
  };
  const motionProps = reduceMotion ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: .65, ease: 'easeOut' as const } };

  return (
    <div className="maveloa-refined min-h-[100dvh] overflow-hidden">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-[#f7f0e5] focus:px-4 focus:py-3" href="#main">Skip to content</a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#f7f0e5]/95 text-[#3a2118] shadow-[0_4px_24px_rgba(36,21,15,.1)] backdrop-blur-md' : 'bg-gradient-to-b from-[#24150f]/55 to-transparent text-[#fff9ef]'}`} data-testid="site-header">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between px-5 md:px-9">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} aria-label="Maveloa Café home" className="refined-brand flex items-center gap-3 no-underline">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full border ${scrolled ? 'border-[#b47a45]' : 'border-white/60'}`}><Coffee size={19}/></span>
            <span className="leading-tight"><span className="serif block text-[1.32rem] tracking-wide">Maveloa</span><span className="block text-[.55rem] font-semibold tracking-[.34em]">CAFÉ</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-[.78rem] font-semibold lg:flex" aria-label="Main navigation">
            {[{ label: 'Home', href: '#home' }, ...navLinks].map((link) => <a className="nav-link" key={link.href} href={link.href}>{link.label}</a>)}
            <button type="button" className={`btn ${scrolled ? 'btn-solid' : 'btn-light'} min-h-[42px] px-5`} onClick={() => scrollTo('#menu')}>View Menu <ArrowRight size={15}/></button>
          </nav>
          <button type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} className="flex h-11 w-11 items-center justify-center rounded-full border border-current lg:hidden" onClick={() => setMenuOpen((open) => !open)} data-testid="mobile-menu-toggle">{menuOpen ? <X/> : <MenuIcon/>}</button>
        </div>
      </header>
      <AnimatePresence>
        {menuOpen && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .22 }} className="fixed inset-0 z-40 flex flex-col bg-[#24150f] px-7 pb-10 pt-28 text-[#fff9ef] lg:hidden" data-testid="mobile-menu">
          <span className="eyebrow !text-[#d4a46d]">Find your moment</span>
          <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">{[{ label: 'Home', href: '#home' }, ...navLinks].map((link) => <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} className="serif border-b border-white/15 py-4 text-3xl">{link.label}</a>)}</nav>
          <p className="mt-auto text-sm text-[#d8c2a8]">Coffee, Conversations & Good Moments</p>
        </motion.div>}
      </AnimatePresence>

      <main id="main">
        <section id="home" className="grain relative flex min-h-[760px] h-[100svh] max-h-[1050px] items-end bg-[#24150f] text-[#fff9ef]" aria-label="Welcome to Maveloa Café">
          <div className="absolute inset-0">
            <motion.img initial={reduceMotion ? false : { scale: 1.07 }} animate={{ scale: 1 }} transition={{ duration: reduceMotion ? 0 : 1.6, ease: 'easeOut' }} src={outdoor} alt="Maveloa Café's warmly lit outdoor terrace, glowing sign and garden seating at evening" className="hero-image h-full w-full object-cover object-center" fetchPriority="high"/>
            <div className="hero-overlay absolute inset-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-[#24150f]/55 via-transparent to-[#24150f]/15"/>
          </div>
          <div className="section-wrap relative z-10 pb-20 pt-32 md:pb-28">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .15 }} className="max-w-[760px]">
              <span className="eyebrow !text-[#e4b47b]">Welcome to Maveloa</span>
              <h1 className="hero-content serif mt-6 max-w-[800px] text-[clamp(4rem,8.8vw,8.5rem)] leading-[.97] tracking-[-.055em]">Coffee,<br/>Conversations<br/><span className="italic text-[#e9c89f]">&amp; Good Moments</span></h1>
              <p className="mt-7 max-w-[540px] text-[1rem] leading-7 text-[#fff5e9]/85 md:text-[1.08rem]">A warm and welcoming café where great coffee, delicious food and meaningful conversations come together.</p>
              <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => scrollTo('#menu')} className="btn btn-solid">Explore Our Menu <ArrowRight size={16}/></button><button type="button" onClick={() => scrollTo('#contact')} className="btn btn-outline-light">Visit Maveloa</button></div>
              <p className="mt-7 text-[.68rem] font-medium tracking-[.13em] text-[#f7e7d4]/75">Freshly prepared <span className="mx-2 text-[#dba66f]">•</span> Carefully brewed <span className="mx-2 text-[#dba66f]">•</span> Made with love</p>
            </motion.div>
          </div>
          <a href="#story" aria-label="Scroll to our story" className="absolute bottom-7 right-8 z-10 hidden items-center gap-3 text-[.65rem] uppercase tracking-[.2em] text-white/80 md:flex">Scroll to discover <ArrowDown size={16}/></a>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d8b17e]/80 to-transparent"/>
        </section>

        <section id="about" className="soft-paper section-pad relative">
          <motion.div {...motionProps} className="section-wrap grid items-center gap-14 lg:grid-cols-[.85fr_1fr]">
            <div className="relative">
              <div className="image-frame relative z-10 h-[430px] rounded-[5px_120px_5px_5px] md:h-[520px]"><img src={interior} alt="Maveloa Café interior with warm pendant lights, leafy plants and comfortable seating" loading="lazy"/></div>
              <div className="absolute -bottom-7 -right-3 z-20 max-w-[210px] bg-[#344331] px-6 py-5 text-[#f7f0e5] shadow-xl md:-right-8"><span className="serif text-2xl italic">A little room<br/>to feel at home.</span></div>
              <Leaf className="botanical -left-8 top-6" size={64}/>
            </div>
            <div className="lg:pl-5">
              <span className="eyebrow">More than a coffee stop</span>
              <h2 className="serif mt-5 max-w-[600px] text-5xl leading-[1.08] tracking-[-.035em] md:text-6xl">A Place Made for <span className="italic text-[#a85d3a]">Good Moments</span></h2>
              <p className="mt-6 max-w-[580px] text-[.98rem] leading-7 text-[#70452d]">At Maveloa Café, coffee is only the beginning. We bring together carefully brewed coffee, comforting food, refreshing drinks and a warm atmosphere designed for conversations, celebrations, work sessions and everyday moments.</p>
              <div className="mt-9 grid gap-5 border-t border-[#d6c4ac] pt-7 sm:grid-cols-3">
                {[{ title: 'Carefully Brewed', body: 'Quality coffee crafted with care.', icon: Coffee }, { title: 'Freshly Prepared', body: 'Simple, delicious food made for every mood.', icon: Utensils }, { title: 'Good Company', body: 'A welcoming space for conversations and memorable moments.', icon: Heart }].map(({ title, body, icon: Icon }) => <article key={title} className="group">
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e9d9c4] text-[#70452d] transition-colors group-hover:bg-[#344331] group-hover:text-[#f7f0e5]"><Icon size={19}/></span><h3 className="serif text-xl">{title}</h3><p className="mt-2 text-[.78rem] leading-5 text-[#806b56]">{body}</p>
                </article>)}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative overflow-hidden bg-[#344331] py-20 text-[#f7f0e5] md:py-28" aria-labelledby="coffee-title">
          <div className="section-wrap grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <motion.div {...motionProps}>
              <span className="eyebrow !text-[#d9b27d]">A signature, poured slowly</span><h2 id="coffee-title" className="serif mt-5 max-w-[540px] text-5xl leading-[1.08] tracking-[-.035em] md:text-6xl">Coffee Worth Slowing Down For</h2><p className="mt-4 text-[#dfd7c6]">Bold flavours, brewed with care.</p>
              <div className="mt-8 overflow-hidden border-y border-white/20">{menuItems.filter((item) => item.category === 'Coffee').map((item) => <div key={item.name} className="menu-row flex items-start justify-between gap-4 border-b border-white/15 py-4 last:border-0"><div><h3 className="serif text-[1.15rem]">{item.name}</h3><p className="mt-1 text-[.78rem] text-[#d8c9b4]">{item.description}</p></div><span className="shrink-0 pt-1 text-sm font-semibold text-[#edc38f]">₹{item.price}</span></div>)}</div>
              <button type="button" onClick={() => scrollTo('#menu')} className="btn btn-light mt-7">View Full Menu <ArrowRight size={15}/></button>
            </motion.div>
            <motion.div {...motionProps} className="relative lg:pl-6"><div className="image-frame relative h-[420px] rounded-[48%_48%_4px_4px] md:h-[590px]"><img src={foodEditorial} alt="A latte with delicate art on a warmly lit café table" loading="lazy" className="!object-[12%_center]"/></div><div className="absolute -bottom-5 left-2 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-[#d9b27d]/70 bg-[#344331] text-center md:bottom-5 md:-left-4"><Sparkles size={17} className="mb-1 text-[#edc38f]"/><span className="serif text-lg leading-tight">Your daily<br/>pause</span></div></motion.div>
          </div>
        </section>

        <section id="menu" className="soft-paper section-pad">
          <motion.div {...motionProps} className="section-wrap">
            <div className="flex flex-col justify-between gap-6 border-b border-[#d6c4ac] pb-8 md:flex-row md:items-end"><div><span className="eyebrow">OUR MENU</span><h2 className="serif mt-4 text-5xl tracking-[-.04em] md:text-6xl">Something for Every Mood</h2><p className="mt-3 text-[#806b56]">From carefully brewed coffee to comforting bites and sweet moments.</p></div><span className="hidden text-right text-[.65rem] uppercase tracking-[.2em] text-[#907c67] md:block">Thoughtfully made<br/>to be shared</span></div>
            <div className="menu-tabs mt-8 flex gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Menu categories" data-testid="menu-category-tabs">{menuCategories.map((name) => <button key={name} type="button" role="tab" aria-selected={category === name} onClick={() => setCategory(name)} className={`min-h-11 shrink-0 rounded-full border px-5 text-[.8rem] font-semibold transition-colors ${category === name ? 'border-[#3a2118] bg-[#3a2118] text-[#f7f0e5]' : 'border-[#cdbda7] bg-transparent text-[#70452d] hover:border-[#a85d3a]'}`}>{name}</button>)}</div>
            <AnimatePresence mode="wait"><motion.div key={category} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22 }} role="tabpanel" className="mt-5 grid gap-x-14 md:grid-cols-2">
              {visibleMenu.map((item) => <article key={item.name} className="menu-row flex min-h-[106px] items-center gap-4 border-b border-[#ddcfbc] px-3 py-4" data-testid="menu-item">{item.vegetarian !== undefined && <span className={`flex h-2.5 w-2.5 shrink-0 rounded-full border ${item.vegetarian ? 'border-[#66704a]' : 'border-[#a85d3a]'}`} aria-label={item.vegetarian ? 'Vegetarian' : 'Non-vegetarian'} title={item.vegetarian ? 'Vegetarian' : 'Non-vegetarian'}><span className={`m-auto h-1 w-1 rounded-full ${item.vegetarian ? 'bg-[#66704a]' : 'bg-[#a85d3a]'}`}/></span>}<div className="min-w-0 flex-1"><div className="flex items-baseline gap-3"><h3 className="serif text-[1.12rem] md:text-xl">{item.name}</h3><span className="h-px flex-1 border-b border-dotted border-[#c8b69f]"/></div><p className="mt-1 text-[.78rem] leading-5 text-[#806b56]">{item.description}</p></div><span className="shrink-0 text-[.88rem] font-bold">₹{item.price}</span></article>)}
            </motion.div></AnimatePresence>
            <p className="mt-5 text-xs text-[#907c67]"><span className="mr-2 inline-block h-2.5 w-2.5 rounded-full border border-[#66704a] align-middle after:mx-auto after:mt-[3px] after:block after:h-1 after:w-1 after:rounded-full after:bg-[#66704a]"/> Vegetarian <span className="ml-5 mr-2 inline-block h-2.5 w-2.5 rounded-full border border-[#a85d3a] align-middle after:mx-auto after:mt-[3px] after:block after:h-1 after:w-1 after:rounded-full after:bg-[#a85d3a]"/> Non-vegetarian</p>
          </motion.div>
        </section>

        <section className="bg-[#eadcc8] py-20 md:py-28" aria-labelledby="food-title">
          <motion.div {...motionProps} className="section-wrap">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><span className="eyebrow">The good stuff</span><h2 id="food-title" className="serif mt-4 text-5xl leading-tight md:text-6xl">Freshly Prepared.<br/><span className="italic text-[#a85d3a]">Always Delicious.</span></h2></div><p className="max-w-[350px] pb-2 text-sm leading-6 text-[#70452d]">From the first sip to the last bite, something good is always coming out of our kitchen.</p></div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-5">
              {[{ title: 'Coffee', label: 'A cup worth lingering over', img: foodEditorial, shape: 'md:col-span-5 md:row-span-2 h-[250px] md:h-[500px]', pos: '8% center' }, { title: 'Pizza', label: 'A little slice of together', img: foodEditorial, shape: 'md:col-span-4 h-[230px] md:h-[300px]', pos: '38% center' }, { title: 'Sandwich', label: 'Fresh, generous, just right', img: foodEditorial, shape: 'md:col-span-3 h-[230px] md:h-[300px]', pos: '60% center' }, { title: 'Dessert & drinks', label: 'Make room for one more', img: foodEditorial, shape: 'col-span-2 md:col-span-7 h-[210px] md:h-[180px]', pos: '86% center' }].map((item) => <article key={item.title} className={`image-frame group relative ${item.shape}`}><img src={item.img} alt={`${item.title} prepared at Maveloa Café`} loading="lazy" style={{ objectPosition: item.pos }} className="!absolute inset-0"/><div className="absolute inset-0 bg-gradient-to-t from-[#24150f]/75 via-[#24150f]/5 to-transparent"/><div className="absolute bottom-5 left-5 text-[#fff9ef]"><h3 className="serif text-2xl md:text-3xl">{item.title}</h3><p className="mt-1 text-xs text-white/80">{item.label}</p></div></article>)}
            </div>
          </motion.div>
        </section>

        <section id="ambience" className="section-pad bg-[#f3eadb]">
          <motion.div {...motionProps} className="section-wrap">
            <div className="grid items-end gap-6 md:grid-cols-[1fr_.75fr]"><div><span className="eyebrow">Settle in, stay awhile</span><h2 className="serif mt-5 max-w-[700px] text-5xl leading-[1.08] tracking-[-.04em] md:text-7xl">Come for the Coffee.<br/><span className="italic text-[#a85d3a]">Stay for the Atmosphere.</span></h2></div><p className="pb-2 text-sm leading-6 text-[#70452d]">Warm lights, greenery, comfortable corners and the aroma of freshly brewed coffee — Maveloa is designed to make every visit feel special.</p></div>
            <div className="mt-12 grid gap-4 md:grid-cols-[1.15fr_.85fr]">
              <figure className="image-frame relative h-[360px] md:h-[530px]"><img src={interior} alt="The Interior — leafy plants, woven pendant lighting and welcoming café tables" loading="lazy"/><figcaption className="absolute bottom-5 left-5 bg-[#f7f0e5]/95 px-5 py-3"><span className="serif text-2xl">The Interior</span></figcaption></figure>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                <figure className="image-frame relative h-[240px] md:h-[257px]"><img src={outdoor} alt="Outdoor Seating — garden tables beneath the warm evening lights" loading="lazy" className="!object-[center_75%]"/><figcaption className="absolute bottom-4 left-4 bg-[#f7f0e5]/95 px-4 py-2"><span className="serif text-xl">Outdoor Seating</span></figcaption></figure>
                <figure className="relative flex h-[240px] items-end overflow-hidden bg-[#344331] p-6 text-[#f7f0e5] md:h-[257px] md:p-8"><div className="absolute -right-10 -top-14 h-52 w-52 rounded-full border border-[#e1bd8e]/25"/><div className="absolute -right-2 -top-5 h-36 w-36 rounded-full border border-[#e1bd8e]/25"/><div className="relative"><span className="eyebrow !text-[#d9b27d]">The little things</span><h3 className="serif mt-3 text-3xl leading-tight">Coffee Corners<br/><span className="italic">Good Conversations</span></h3><p className="mt-3 max-w-[280px] text-xs leading-5 text-[#e3d8c6]">A favourite table. One more cup. The evening unfolding.</p></div></figure>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="relative overflow-hidden bg-[#e4d4bd] py-16">
          <motion.div {...motionProps} className="section-wrap">
            <div className="mb-9 flex items-end justify-between"><div><span className="eyebrow">Whatever your kind of day</span><h2 className="serif mt-3 text-4xl md:text-5xl">A table for every moment.</h2></div><Leaf className="hidden text-[#66704a] md:block" size={46}/></div>
            <div className="grid border-y border-[#cbb89e] sm:grid-cols-2 lg:grid-cols-4">{[{ title: 'Morning Coffee', text: 'Start the day with something special.', icon: Coffee }, { title: 'Catch-ups', text: 'A comfortable place for meaningful conversations.', icon: MessageCircle }, { title: 'Work Sessions', text: 'Coffee, Wi-Fi and a relaxed atmosphere.', icon: Wifi }, { title: 'Evening Moments', text: 'Good food, warm lights and great company.', icon: Moon }].map(({ title, text, icon: Icon }, i) => <article key={title} className={`group px-5 py-8 md:px-7 ${i ? 'border-t border-[#cbb89e] sm:border-l lg:border-t-0' : ''} ${i === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}><Icon className="mb-5 text-[#a85d3a] transition-transform group-hover:-translate-y-1" size={24}/><h3 className="serif text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#806b56]">{text}</p></article>)}</div>
          </motion.div>
        </section>

        <section id="reviews" className="section-pad bg-[#344331] text-[#f7f0e5]">
          <motion.div {...motionProps} className="section-wrap">
            <div className="grid items-center gap-12 md:grid-cols-[.7fr_1.3fr]">
              <div><span className="eyebrow !text-[#d9b27d]">Kind words, for the table</span><h2 className="serif mt-5 text-5xl leading-tight md:text-6xl">A little love<br/><span className="italic text-[#e5c397]">from the café.</span></h2><p className="mt-5 max-w-[300px] text-sm leading-6 text-[#d9d0c0]">These sample testimonials are placeholders for demonstration and are not verified customer reviews.</p><div className="mt-7 flex items-center gap-3"><span className="serif text-4xl">5.0</span><span className="text-[#e8bd85]" aria-label="Five stars">★★★★★</span><span className="text-xs text-[#d9d0c0]">Demo content</span></div></div>
              <div className="relative min-h-[310px]" onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={swipeEnd} data-testid="testimonial-carousel">
                <AnimatePresence mode="wait"><motion.article key={reviewIndex} initial={reduceMotion ? false : { opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} transition={{ duration: .25 }} className="flex min-h-[292px] flex-col justify-between border border-[#e4d4bd]/30 bg-[#3d5039] p-7 md:p-10">
                  <span className="serif text-6xl leading-[.5] text-[#d9b27d]">“</span><blockquote className="serif my-5 text-2xl leading-[1.45] md:text-3xl">“{currentReview.quote}”</blockquote>
                  <div className="flex items-end justify-between gap-4"><div><p className="font-semibold">{currentReview.name}</p><p className="mt-1 text-[.65rem] uppercase tracking-[.16em] text-[#d9b27d]">Demo testimonial · not verified</p></div><div className="flex gap-2"><button type="button" onClick={() => setReviewIndex((i) => (i - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition hover:bg-white/10"><ChevronLeft size={18}/></button><button type="button" onClick={() => setReviewIndex((i) => (i + 1) % testimonials.length)} aria-label="Next testimonial" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition hover:bg-white/10"><ChevronRight size={18}/></button></div></div>
                </motion.article></AnimatePresence>
                <div className="mt-4 flex gap-2" aria-label={`Testimonial ${reviewIndex + 1} of ${testimonials.length}`}>{testimonials.map((review, i) => <button type="button" key={review.name} onClick={() => setReviewIndex(i)} aria-label={`Show testimonial ${i + 1}`} className={`h-1.5 rounded-full transition-all ${i === reviewIndex ? 'w-9 bg-[#d9b27d]' : 'w-4 bg-white/30'}`}/>)}</div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="soft-paper section-pad">
          <motion.div {...motionProps} className="section-wrap">
            <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="eyebrow">A few scenes from here</span><h2 className="serif mt-4 text-5xl md:text-6xl">Moments at Maveloa</h2></div><p className="max-w-[290px] text-sm leading-6 text-[#806b56]">Little details, shared tables and evenings that ask you to stay a little longer.</p></div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{[{ label: 'A warm welcome', src: outdoor, className: 'col-span-2 h-[220px] md:h-[330px]', pos: 'center 55%' }, { label: 'Inside, under the lights', src: interior, className: 'h-[220px] md:h-[330px]', pos: '25% center' }, { label: 'Coffee, made for a pause', src: foodEditorial, className: 'h-[220px] md:h-[330px]', pos: '7% center' }, { label: 'Evening outside', src: outdoor, className: 'h-[220px] md:h-[290px]', pos: 'center 85%' }, { label: 'A little something sweet', src: foodEditorial, className: 'col-span-2 h-[220px] md:h-[290px]', pos: '86% center' }, { label: 'Together at the table', src: outdoor, className: 'h-[220px] md:h-[290px]', pos: '50% 82%' }].map((image) => <figure key={image.label} className={`image-frame group relative ${image.className}`}><img src={image.src} alt={image.label + ' at Maveloa Café'} loading="lazy" style={{ objectPosition: image.pos }}/><figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-[#24150f]/65 to-transparent p-4 text-sm font-medium text-white opacity-100 transition-opacity group-hover:opacity-100 md:p-5 md:opacity-0">{image.label}</figcaption></figure>)}</div>
            <div className="mt-8 flex justify-center"><span className="text-link cursor-default">Follow Our Journey <ArrowRight size={16}/></span></div>
          </motion.div>
        </section>

        <section className="grain relative flex min-h-[490px] items-center bg-[#24150f] text-[#fff9ef] md:min-h-[570px]">
          <img src={outdoor} alt="Maveloa Café glowing at dusk, ready for another good evening" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-center"/><div className="absolute inset-0 bg-[#24150f]/65"/>
          <motion.div {...motionProps} className="section-wrap relative py-20 text-center"><span className="eyebrow !text-[#e0b47d]">The evening is yours</span><h2 className="serif mx-auto mt-5 max-w-[850px] text-5xl leading-[1.06] tracking-[-.035em] md:text-7xl">Your Table.<br/>Your Coffee.<br/><span className="italic text-[#e5c397]">Your Moment.</span></h2><p className="mx-auto mt-5 max-w-md text-[#f0e4d4]">Come by for a cup of coffee and stay for the conversations.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button type="button" className="btn btn-solid" onClick={() => scrollTo('#menu')}>Explore Menu <ArrowRight size={16}/></button><button type="button" className="btn btn-outline-light" onClick={() => scrollTo('#contact')}>Contact Us</button></div></motion.div>
        </section>

        <section id="contact" className="section-pad bg-[#eadcc8]">
          <motion.div {...motionProps} className="section-wrap grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
            <div><span className="eyebrow">We'd love to hear from you</span><h2 className="serif mt-5 max-w-[440px] text-5xl leading-[1.08] tracking-[-.035em] md:text-6xl">Let’s Make It a <span className="italic text-[#a85d3a]">Good Moment</span></h2><p className="mt-5 max-w-[420px] leading-7 text-[#70452d]">Planning a visit or have a question? Leave us a note and we’ll be glad to know.</p>
              <div className="mt-9 space-y-5 border-t border-[#cbb89e] pt-7"><div className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f0e5] text-[#a85d3a]"><Phone size={17}/></span><div><p className="text-xs uppercase tracking-[.14em] text-[#907c67]">Phone</p><a href="tel:999999999" className="mt-1 inline-block font-semibold text-[#3a2118] underline decoration-[#b47a45] underline-offset-4">999999999</a><p className="mt-1 text-[.7rem] text-[#907c67]">Placeholder number — update when available.</p></div></div><div className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f0e5] text-[#a85d3a]"><Leaf size={17}/></span><div><p className="text-xs uppercase tracking-[.14em] text-[#907c67]">Location</p><p className="mt-1 font-semibold">Location details coming soon</p></div></div><div className="flex gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f7f0e5] text-[#a85d3a]"><Moon size={17}/></span><div><p className="text-xs uppercase tracking-[.14em] text-[#907c67]">Opening hours</p><p className="mt-1 font-semibold">Opening hours — coming soon</p></div></div></div>
            </div>
            <div className="enquiry-panel bg-[#f7f0e5] p-6 shadow-[0_15px_45px_rgba(58,33,24,.08)] md:p-10"><div className="mb-6 flex items-center justify-between"><div><span className="eyebrow">A note to Maveloa</span><h3 className="serif mt-2 text-3xl">Send an enquiry</h3></div><MessageCircle className="text-[#b47a45]" size={26}/></div>
              {formStatus === 'success' && <div role="status" className="mb-6 flex items-start gap-3 border border-[#66704a]/30 bg-[#66704a]/10 p-4 text-sm text-[#344331]" data-testid="enquiry-success"><Check size={18} className="mt-0.5 shrink-0"/><div><strong>Thank you! Your enquiry has been received.</strong><p className="mt-1 text-xs">This is a front-end demo; no message has been sent.</p></div></div>}
              <form onSubmit={submitEnquiry} onChange={() => { if (formStatus === 'success') setFormStatus('idle'); }} className="grid gap-4 sm:grid-cols-2" data-testid="enquiry-form">
                <label className="text-xs font-semibold">Name<input className="form-control mt-2" type="text" name="name" placeholder="Your name" required autoComplete="name" maxLength={80}/></label>
                 <label className="text-xs font-semibold">Phone / Email<input className="form-control mt-2" type="text" name="contact" placeholder="How can we reach you?" required pattern="([+()0-9 -]{7,}|[^@\s]+@[^@\s]+\.[^@\s]+)" title="Enter a valid phone number or email address" autoComplete="email" maxLength={120}/></label>
                <label className="text-xs font-semibold">Date<input className="form-control mt-2" type="date" name="date"/></label>
                <label className="text-xs font-semibold">Number of Guests<select className="form-control mt-2" name="guests" defaultValue=""><option value="">Select guests</option>{[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}{n === 10 ? '+' : ''} guest{n > 1 ? 's' : ''}</option>)}</select></label>
                <label className="text-xs font-semibold sm:col-span-2">Message<textarea className="form-control mt-2 min-h-[112px] resize-y" name="message" placeholder="Tell us a little more…" rows={4} required maxLength={800}/></label>
                 <div className="sm:col-span-2"><button type="submit" className="btn btn-solid">Send Enquiry <ArrowRight size={16}/></button><p className="mt-3 text-[.68rem] text-[#907c67]">Demo form only. This form does not store or transmit your details.</p></div>
              </form>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="relative overflow-hidden bg-[#24150f] text-[#f7f0e5]">
        <div className="section-wrap relative z-10 py-14 md:py-16">
          <div className="grid gap-10 border-b border-[#f7f0e5]/20 pb-10 md:grid-cols-[1.2fr_1fr_.7fr]">
            <div><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="inline-flex items-center gap-3 text-inherit no-underline"><span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d9b27d]/70"><Coffee size={20}/></span><span><span className="serif block text-2xl">Maveloa Café</span><span className="mt-1 block text-[.55rem] tracking-[.26em] text-[#d8c2a8]">A PLACE FOR GOOD MOMENTS</span></span></a><p className="mt-5 text-sm text-[#d8c2a8]">Coffee, Conversations & Good Moments</p></div>
            <div><p className="mb-4 text-[.65rem] font-bold uppercase tracking-[.18em] text-[#d9b27d]">Take a look around</p><div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">{[{ label: 'Home', href: '#home' }, ...navLinks].map((link) => <a key={link.href} className="w-fit text-[#f7f0e5]/85 no-underline transition-colors hover:text-[#e5c397]" href={link.href}>{link.label}</a>)}</div></div>
            <div><p className="mb-4 text-[.65rem] font-bold uppercase tracking-[.18em] text-[#d9b27d]">Say hello</p><a href="tel:999999999" className="text-sm text-[#f7f0e5] underline decoration-[#b47a45] underline-offset-4">999999999</a><p className="mt-2 text-xs text-[#a8947e]">Placeholder number</p></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-xs text-[#a8947e] sm:flex-row"><span>© 2026 Maveloa Café. All rights reserved.</span><span>Made for slower sips and longer conversations.</span></div>
        </div>
        <Leaf className="absolute -bottom-10 -right-4 rotate-[-25deg] text-[#8b8d60]/20" size={190}/>
      </footer>
      <AnimatePresence>{showTop && <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} type="button" onClick={() => scrollTo('#home')} aria-label="Back to top" className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#a85d3a] text-[#fff9ef] shadow-lg transition hover:bg-[#914b2d]" data-testid="back-to-top"><ArrowUp size={19}/></motion.button>}</AnimatePresence>
    </div>
  );
}

export default App;