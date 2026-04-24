import React, { useState, useEffect, useRef } from 'react';

// Helper component for Icons
const Icon = ({ name, className }) => {
    const icons = {
        menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
        'scan-face': <><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/></>,
        bot: <><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></>,
        shirt: <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>,
        instagram: <><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></>,
        twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 2.8 3.2 2.8 5.5 0 3.1-2.2 5.4-5 5.4a15.3 15.3 0 0 1-4.7-1c-1.2.5-2.3.8-3.3.8-3.4 0-6.5-2.8-6.5-6.5 0-1.8 1.5-3.5 3.5-4.5-2.1-.3-3.9-1.5-3.9-3.5 0-.5.2-1 .6-1.4 2.4 2.3 5.2 3.6 8.5 3.6 0-.6 0-1.2 0-1.8 0-2.2 1.8-4 4-4 1.1 0 2.1.5 2.8 1.2z"/>,
        pinterest: <><path d="M12.5 12a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5Z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 3 1.7 5.5 4 6.8V15h-2v-3h2v-2.5c0-2.1 1.2-3.5 3.3-3.5h2.7v3h-1.7c-.8 0-1 .4-1 1V12h3l-.4 3h-2.6v6.9c2.3-1.3 4-3.8 4-6.9c0-5.5-4.5-10-10-10Z"/></>,
        upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></>,
        search: <><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></>,
        brain: <><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v1.2a1 1 0 0 0 1 1 1 1 0 0 1 1 1.5 1 1 0 0 0 1 1h.2a2.5 2.5 0 0 1 2.3 2.3v1.3a1 1 0 0 0 .8.9 1 1 0 0 1 .5 1.8 1 1 0 0 0 0 1.9 1 1 0 0 1-.5 1.8 1 1 0 0 0-.8.9v1.3a2.5 2.5 0 0 1-2.3 2.3h-.2a1 1 0 0 0-1 1 1 1 0 0 1-1 1.5 1 1 0 0 0-1 1v1.2A2.5 2.5 0 0 1 9.5 22h-5A2.5 2.5 0 0 1 2 19.5v-15A2.5 2.5 0 0 1 4.5 2h5Z"/><path d="M14 10.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/><path d="M6 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/><path d="M10 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/></>,
        server: <><rect width="2" height="2" x="11" y="2" /><rect width="2" height="2" x="11" y="6" /><rect width="2" height="2" x="11" y="10" /><path d="M6 20h4"/><path d="M8 16v4"/><path d="M6 4h4"/><path d="M8 2v2"/><path d="M20 12h-8"/><path d="M16 10v4"/><path d="M18 6h-8"/><path d="M14 4v4"/></>,
        'arrow-left': <><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></>,
        'shopping-bag': <><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></>
    };
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{icons[name]}</svg>;
};

const useReveal = () => {
    const ref = useRef(null);
    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                element.classList.add('visible');
                element.classList.remove('opacity-0');
            }
        }, { threshold: 0.1 });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    return ref;
};

const Navbar = ({ navigate, handleSearchSubmit, activePage, activeHash }) => {
    const [query, setQuery] = useState("");
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim().length >= 2) {
            handleSearchSubmit(query.trim());
            setMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { label: "Home", page: "home", href: "#home" },
        { label: "Recommend", page: "recommend", href: "#" },
        { label: "Products", page: "home", href: "#styles" },
        { label: "About", page: "about", href: "#" }
    ];

    const handleNavClick = (e, page, href) => {
        e.preventDefault();
        navigate(page, href);
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#home" onClick={(e) => handleNavClick(e, 'home', '#home')} className="text-2xl font-bold text-slate-800 tracking-tight">👗 Klaro</a>
                
                <nav className="hidden lg:flex items-center space-x-10">
                    {navLinks.map(({ label, page, href }) => {
                        const isActive = (activePage === page) && (page !== 'home' || activeHash === href);
                        return (
                            <a key={label} href={href} onClick={(e) => handleNavClick(e, page, href)} className={`relative text-slate-600 hover:text-slate-900 font-medium transition-colors ${isActive ? 'text-slate-900' : ''}`}>
                                {label}
                                {isActive && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full"></span>}
                            </a>
                        );
                    })}
                </nav>

                <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
                    <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="px-4 py-2 bg-slate-100 text-slate-700 placeholder-slate-400 border border-slate-200 rounded-lg w-48 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:w-64 transition-all duration-300" />
                    <button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-2.5 rounded-lg hover:opacity-90 transition-opacity shadow-md"><Icon name="search" className="w-5 h-5"/></button>
                </form>

                <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-slate-700">
                    <Icon name="menu" className="w-7 h-7" />
                </button>
            </div>
            {isMobileMenuOpen && (
                <div className="lg:hidden mx-4 mt-2 p-4 border border-slate-200 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl">
                    <nav className="flex flex-col space-y-2">
                        {navLinks.map(({ label, page, href }) => (
                            <a key={label} href={href} onClick={(e) => handleNavClick(e, page, href)} className="block py-2 text-slate-600 hover:text-slate-900 font-medium rounded-md px-3">{label}</a>
                        ))}
                    </nav>
                    <form onSubmit={handleSearch} className="flex space-x-2 w-full mt-4 pt-4 border-t border-slate-200">
                        <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} className="px-4 py-2 bg-slate-100 border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        <button type="submit" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-2.5 rounded-lg hover:opacity-90"><Icon name="search" className="w-5 h-5"/></button>
                    </form>
                </div>
            )}
        </header>
    );
};

const HeroSection = () => {
    const revealRef1 = useReveal();
    const revealRef2 = useReveal();
    const revealRef3 = useReveal();

    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center overflow-hidden bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')"}}>
            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
            <div className="relative z-10 container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 ref={revealRef1} className="text-5xl md:text-7xl font-extrabold text-slate-800 leading-tight reveal opacity-0 font-manrope">
                        Define Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">Perfect Style</span>
                    </h1>
                    <p ref={revealRef2} className="mt-6 text-lg md:text-xl text-slate-800 font-medium max-w-3xl mx-auto reveal opacity-0" style={{ transitionDelay: '200ms' }}>
                        Forget trends. Discover you. Upload, search, and let our AI build a wardrobe that's 100% authentic.
                    </p>
                    <div ref={revealRef3} className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 reveal opacity-0" style={{ transitionDelay: '400ms' }}>
                        <a href="#recommend" className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-all shadow-lg text-lg transform hover:scale-105">Get Recommendations</a>
                        <a href="#how-it-works" className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-8 py-4 rounded-lg hover:opacity-90 transition-all text-lg transform hover:scale-105">Learn More</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection = () => {
    const titleRef = useReveal();
    const step1Ref = useReveal();
    const step2Ref = useReveal();
    const step3Ref = useReveal();

    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div ref={titleRef} className="text-center mb-20 reveal opacity-0">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-manrope">How It Works</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Your personalized style journey in three simple steps.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-10 text-center">
                    <div ref={step1Ref} className="reveal opacity-0 p-8" style={{ transitionDelay: '200ms' }}>
                        <div className="mx-auto mb-8 bg-blue-100 text-blue-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-sm"><Icon name="scan-face" className="w-12 h-12" /></div>
                        <h3 className="text-2xl font-semibold mb-3 text-slate-800 font-manrope">1. Share Your Vibe</h3>
                        <p className="text-slate-600">Upload a photo or take our quick style quiz to tell us what you love.</p>
                    </div>
                    <div ref={step2Ref} className="reveal opacity-0 p-8" style={{ transitionDelay: '400ms' }}>
                        <div className="mx-auto mb-8 bg-pink-100 text-pink-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-sm"><Icon name="bot" className="w-12 h-12" /></div>
                        <h3 className="text-2xl font-semibold mb-3 text-slate-800 font-manrope">2. AI Does The Magic</h3>
                        <p className="text-slate-600">Our smart AI analyzes your input and scours trends to find your unique style DNA.</p>
                    </div>
                    <div ref={step3Ref} className="reveal opacity-0 p-8" style={{ transitionDelay: '600ms' }}>
                        <div className="mx-auto mb-8 bg-purple-100 text-purple-600 w-24 h-24 rounded-2xl flex items-center justify-center shadow-sm"><Icon name="shirt" className="w-12 h-12" /></div>
                        <h3 className="text-2xl font-semibold mb-3 text-slate-800 font-manrope">3. Get Your Outfits</h3>
                        <p className="text-slate-600">Receive daily outfit recommendations and curated style boards just for you.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

const StylesSection = () => {
    const titleRef = useReveal();
    const styleRefs = [useReveal(), useReveal(), useReveal(), useReveal(), useReveal()];
    const styles = [ 
        { name: "Minimalist", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop", className: "" }, 
        { name: "Streetwear", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1974&auto=format&fit=crop", className: "row-span-2" }, 
        { name: "Boho Chic", img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1974&auto=format&fit=crop", className: "row-span-2" }, 
        { name: "Classic", img: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop", className: "" }, 
        { name: "Artsy", img: "https://images.unsplash.com/photo-1552374196-c4e7d3e1e4d6?q=80&w=1974&auto=format&fit=crop", className: "" }, 
    ];
    return (
        <section id="styles" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div ref={titleRef} className="text-center mb-16 reveal opacity-0">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 font-manrope">Discover Your Vibe</h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">From minimalist chic to bold streetwear, we've got you covered.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {styles.map((style, index) => (
                        <div key={style.name} ref={styleRefs[index]} className={`group relative overflow-hidden rounded-2xl reveal opacity-0 ${style.className}`} style={{ transitionDelay: `${index * 100}ms` }}>
                            <img src={style.img} alt={`${style.name} Fashion`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <h3 className="absolute bottom-5 left-5 text-white text-2xl md:text-3xl font-bold font-manrope transition-transform duration-300 group-hover:-translate-y-1">{style.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LandingPage = () => (
    <>
        <HeroSection />
        <HowItWorksSection />
        <StylesSection />
    </>
);

const UploadForm = ({ onUpload, loading }) => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (file) onUpload(file);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 sm:p-10 rounded-3xl shadow-xl text-center border border-slate-100">
            <div className="mx-auto mb-6 bg-purple-100 text-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center">
                <Icon name="upload" className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold mb-3 font-manrope text-slate-800">Upload Your Item</h2>
            <p className="text-slate-600 mb-8">Upload an image of a clothing item to get similar recommendations.</p>
            <form onSubmit={handleSubmit}>
                <div className={`mb-6 p-4 border-2 border-dashed rounded-2xl transition-colors ${preview ? 'border-purple-300' : 'border-slate-200 hover:border-purple-400'}`}>
                    <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    {!preview && (
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center text-slate-500 hover:text-purple-600 transition-colors py-8">
                            <span className="font-semibold">Click to upload a file</span>
                            <span className="text-sm">PNG, JPG, GIF up to 10MB</span>
                        </label>
                    )}
                    {preview && (
                        <div className="relative group">
                             <img src={preview} alt="Preview" className="mx-auto max-h-60 rounded-lg object-contain" />
                             <label htmlFor="file-upload" className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg">
                                Change Image
                             </label>
                        </div>
                    )}
                </div>
                <button type="submit" disabled={!file || loading} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-4 text-lg rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg disabled:bg-slate-400 disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none disabled:cursor-not-allowed">
                    {loading ? 'Analyzing...' : 'Get Recommendations'}
                </button>
            </form>
        </div>
    );
};

// UPDATED: Now clickable!
const RecommendationGrid = ({ items, title, onProductClick }) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mt-16">
        {title && <h2 className="text-3xl font-bold text-center mb-8 font-manrope text-slate-800">{title}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">

          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => onProductClick(item)} // Handle click
              className="bg-white p-4 shadow-lg rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
            >
              <div className="bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
                <img
                  src={item.image_url}
                  alt={item.name || `Product ${index}`}
                  className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/300x400/E2E8F0/CCCCCC?text=Image+Error';
                  }}
                />
                
                {item.price && (
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold shadow-sm text-slate-800">
                        ₹{item.price}
                    </div>
                )}
              </div>
  
              {item.name && <h3 className="font-semibold truncate font-manrope text-slate-800 mb-2">{item.name}</h3>}
  
              <div className="text-sm text-slate-600 flex flex-wrap gap-2">
                {item.metadata?.gender && <span className="bg-slate-50 px-2 py-0.5 rounded text-xs border border-slate-200">{item.metadata.gender}</span>}
                {item.metadata?.articleType && <span className="bg-slate-50 px-2 py-0.5 rounded text-xs border border-slate-200">{item.metadata.articleType}</span>}
                {item.metadata?.baseColour && <span className="bg-slate-50 px-2 py-0.5 rounded text-xs border border-slate-200" style={{borderLeft: `4px solid ${item.metadata.baseColour.toLowerCase()}`}}>{item.metadata.baseColour}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

// NEW: Product Detail Page Component
const ProductDetailsPage = ({ product, onBack }) => {
    if (!product) return null;
  
    return (
      <div className="container mx-auto p-6 pt-32 min-h-screen">
         <button onClick={onBack} className="mb-8 flex items-center text-slate-600 hover:text-purple-600 transition-colors font-medium">
            <Icon name="arrow-left" className="w-5 h-5 mr-2"/> Back to results
         </button>
         <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image Section */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 flex items-center justify-center overflow-hidden">
               <img src={product.image_url} alt={product.name} className="max-h-[600px] w-full object-contain hover:scale-105 transition-transform duration-500" />
            </div>
            
            {/* Details Section */}
            <div>
               <div className="flex flex-wrap items-center gap-3 mb-6">
                  {product.metadata?.gender && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-bold tracking-wide uppercase">{product.metadata.gender}</span>}
                  {product.metadata?.articleType && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold tracking-wide uppercase">{product.metadata.articleType}</span>}
               </div>
               
               <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-manrope mb-6 leading-tight">{product.name}</h1>
               <div className="text-4xl font-bold text-slate-800 mb-10">₹{product.price}</div>
               
               {/* Features Grid */}
               <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mb-10">
                  <h3 className="font-bold text-slate-900 mb-6 text-xl">Product Features</h3>
                  <div className="grid grid-cols-2 gap-y-6 text-base">
                     <div>
                        <div className="text-slate-500 text-sm mb-1">Color</div>
                        <div className="font-semibold text-slate-900 flex items-center gap-3">
                           {product.metadata?.baseColour && (
                               <span className="w-6 h-6 rounded-full border border-slate-300 shadow-sm" style={{backgroundColor: product.metadata.baseColour.toLowerCase()}}></span>
                           )}
                           {product.metadata?.baseColour || 'Multi'}
                        </div>
                     </div>
                     <div>
                        <div className="text-slate-500 text-sm mb-1">Category</div>
                        <div className="font-semibold text-slate-900">{product.metadata?.articleType || 'General'}</div>
                     </div>
                     <div>
                        <div className="text-slate-500 text-sm mb-1">Ideal For</div>
                        <div className="font-semibold text-slate-900">{product.metadata?.gender || 'Unisex'}</div>
                     </div>
                     <div>
                        <div className="text-slate-500 text-sm mb-1">Material</div>
                        <div className="font-semibold text-slate-900">Premium Cotton Blend</div>
                     </div>
                  </div>
               </div>
               
               <div className="flex gap-4">
                   <button className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 text-lg transform hover:-translate-y-1">
                      <Icon name="shopping-bag" className="w-5 h-5" /> Add to Cart
                   </button>
               </div>
            </div>
         </div>
      </div>
    );
};

const RecommendPage = ({ onProductClick }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (file) => {
        setLoading(true);
        setError("");
        setRecommendations([]);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("https://modelbynikhil-klaro-recommend-api.hf.space/recommend", { method: "POST", body: formData });
            if (!response.ok) throw new Error("Failed to get recommendations. Please try another image.");
            const data = await response.json();
            
            // Map data to ensure consistency with Search results and ProductDetail expectations
            const mappedData = (data.recommendations || data || []).map(item => ({
                ...item,
                metadata: item.metadata || {
                    gender: item.gender,
                    articleType: item.articleType,
                    baseColour: item.baseColour || item.color
                }
            }));
            
            setRecommendations(mappedData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-6 pt-32 min-h-screen">
            <UploadForm onUpload={handleUpload} loading={loading} />
            {loading && <div className="text-center text-purple-600 mt-8 font-semibold">Loading recommendations...</div>}
            {error && <div className="text-center text-red-600 mt-8 bg-red-100 p-3 rounded-lg border border-red-200">{error}</div>}
            {/* Pass onProductClick */}
            <RecommendationGrid items={recommendations} title="Our Recommendations" onProductClick={onProductClick} />
        </div>
    );
};

const SearchRecommendPage = ({ query, onProductClick }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const perPage = 12;

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!query || query.length < 2) {
                setResults([]);
                return;
            };
            setLoading(true);
            try {
                const res = await fetch(`https://modelbynikhil-klaro-search-api.hf.space/search?q=${encodeURIComponent(query)}&limit=60`);
                if (!res.ok) throw new Error("Search failed. Please try again.");
                const data = await res.json();
                
                const mappedResults = data.map(item => {
                    const generatedName = item.name 
                        ? item.name 
                        : `${item.gender || ''} ${item.color || ''} ${item.articleType || 'Product'}`.trim();

                    return {
                        id: item.id,
                        image_url: item.image_url,
                        name: generatedName,
                        price: item.price,
                        metadata: {
                            gender: item.gender,
                            articleType: item.articleType,
                            baseColour: item.color,
                            usage: "Fashion" 
                        }
                    };
                });

                setResults(mappedResults || []);
                setPage(1);
            } catch (err) {
                console.error("API Error:", err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRecommendations();
    }, [query]);

    const totalPages = Math.ceil(results.length / perPage);
    const paginatedResults = results.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="container mx-auto p-6 pt-32 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 font-manrope text-slate-800">
                🔍 Results for: <span className="text-purple-600">{query}</span>
            </h2>

            {loading && <div className="text-center mt-12 font-semibold text-slate-700">Loading...</div>}
            
            {!loading && results.length === 0 && <div className="text-center mt-12 text-slate-600 bg-slate-100 p-6 rounded-2xl">No results found for "{query}". Try a different search term.</div>}

            {/* Pass onProductClick */}
            <RecommendationGrid items={paginatedResults} title="" onProductClick={onProductClick} />

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 space-x-4">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-sm" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>Prev</button>
                    <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-sm" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>Next</button>
                </div>
            )}
        </div>
    );
};

const AboutPage = () => {
    // ... (Same as before)
    const titleRef = useReveal();
    const techTitleRef = useReveal();
    const tech1Ref = useReveal();
    const tech2Ref = useReveal();
    const teamTitleRef = useReveal();
    const teamMemberRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    useEffect(() => {
        teamMemberRefs.forEach((ref) => {
            const element = ref.current;
            if (!element) return;
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add('visible');
                    element.classList.remove('opacity-0');
                }
            }, { threshold: 0.1 });
            observer.observe(element);
            return () => observer.disconnect();
        });
    }, [teamMemberRefs]);
    const team = [
        { name: "Harsh Vardhan", role: "UI/UX Designer" },
        { name: "Jatin", role: "Frontend Architect" },
        { name: "Nalin", role: "Product Manager" },
        { name: "Nikhil", role: "AI & Backend" }
    ];
    return (
        <div className="bg-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div ref={titleRef} className="text-center reveal opacity-0">
                    <h2 className="text-4xl font-extrabold text-slate-800 sm:text-5xl font-manrope">We are ML Engineers not web devlopers</h2>
                </div>
                <div className="mt-20">
                    <div ref={techTitleRef} className="text-center reveal opacity-0">
                        <h3 className="text-5xl font-extrabold text-slate-800 font-manrope pb-3">😊</h3>
                        <h3 className="text-5xl font-extrabold text-slate-800 font-manrope">Tech Stack</h3>
                    </div>
                    <div className="mt-12 grid gap-8 md:grid-cols-2">
                        <div ref={tech1Ref} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 reveal opacity-0" style={{transitionDelay: '400ms'}}>
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-purple-100 text-purple-600"><Icon name="brain" /></div>
                            <h4 className="mt-6 text-xl font-bold text-slate-800">Deep Learning Backend</h4>
                            <p className="mt-2 text-base text-slate-600">The core of our recommendation engine uses a pre-trained ResNet50 model to extract feature vectors from clothing images. This allows us to find items that are not just similar in color or category, but also in texture, pattern, and style.</p>
                        </div>
                        <div ref={tech2Ref} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 reveal opacity-0" style={{transitionDelay: '600ms'}}>
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-100 text-indigo-600"><Icon name="server" /></div>
                            <h4 className="mt-6 text-xl font-bold text-slate-800">API & Frontend</h4>
                            <p className="mt-2 text-base text-slate-600">A robust FastAPI server handles the image uploads and similarity searches, delivering results quickly. The frontend is built with React and Tailwind CSS for a modern, responsive, and interactive user experience.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-20">
                    <div ref={teamTitleRef} className="text-center reveal opacity-0">
                        <h3 className="text-3xl font-extrabold text-slate-800 font-manrope">Meet Team Klaro</h3>
                        <p className="mt-4 text-lg text-slate-600">The passionate individuals behind this project.</p>
                    </div>
                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {team.map((member, index) => (
                            <div key={member.name} ref={teamMemberRefs[index]} className="text-center reveal opacity-0" style={{transitionDelay: `${200 * (index + 1)}ms`}}>
                                <img className="mx-auto h-32 w-32 rounded-full" src={`https://placehold.co/256x256/E0E7FF/4F46E5?text=${member.name.charAt(0)}`} alt={member.name} />
                                <h4 className="mt-4 text-xl font-bold text-slate-800">{member.name}</h4>
                                <p className="text-purple-600 font-semibold">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function App() {
    const [page, setPage] = useState('home');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeHash, setActiveHash] = useState('#home');
    
    // NEW State for Product Details
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [previousPage, setPreviousPage] = useState('home');

    const navigate = (targetPage, hash) => {
        setPage(targetPage);
        if (targetPage === 'home') {
            setActiveHash(hash);
            setTimeout(() => {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 0);
        } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (page !== 'home') return;
            const sections = ['#home', '#how-it-works', '#styles'];
            const currentSection = sections.find(sectionId => {
                const sectionEl = document.querySelector(sectionId);
                if (!sectionEl) return false;
                const rect = sectionEl.getBoundingClientRect();
                return rect.top <= 150 && rect.bottom >= 150;
            });
            if (currentSection && currentSection !== activeHash) {
                setActiveHash(currentSection);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [page, activeHash]);
    
    const handleSearchSubmit = (query) => {
        setSearchQuery(query);
        setPage('search');
    };
    
    // NEW: Handle clicking a product
    const handleProductClick = (product) => {
        setSelectedProduct(product);
        setPreviousPage(page); // Remember where we came from
        setPage('product');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPage = () => {
        switch (page) {
            case 'recommend': return <RecommendPage onProductClick={handleProductClick} />;
            case 'search': return <SearchRecommendPage query={searchQuery} onProductClick={handleProductClick} />;
            case 'product': return <ProductDetailsPage product={selectedProduct} onBack={() => setPage(previousPage)} />;
            case 'about': return <AboutPage />;
            case 'home':
            default: return <LandingPage />;
        }
    };

    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

            <style>{`
                body { font-family: 'Inter', sans-serif; background-color: #f8fafc; color: #1e293b; }
                .font-manrope { font-family: 'Manrope', sans-serif; }
                html { scroll-behavior: smooth; }
                .reveal { transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
                .reveal.visible { opacity: 1; transform: translateY(0); }
                .opacity-0 { opacity: 0; transform: translateY(40px); }
            `}</style>
            
            <div className="bg-white">
                <Navbar navigate={navigate} handleSearchSubmit={handleSearchSubmit} activePage={page} activeHash={activeHash} />
                <main>
                    {renderPage()}
                </main>
                <Footer />
            </div>
        </>
    );
}

const Footer = () => {
    return (
        <footer className="bg-slate-100 border-t border-slate-200">
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-4">
                        <h3 className="text-2xl font-bold text-slate-800 font-manrope">👗 Klaro</h3>
                        <p className="mt-4 text-slate-600">The future of fashion is personal.</p>
                    </div>
                    <div className="md:col-span-2">
                        <h4 className="font-semibold text-slate-800">Menu</h4>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Home</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Recommend</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">About</a></li>
                        </ul>
                    </div>
                     <div className="md:col-span-2">
                        <h4 className="font-semibold text-slate-800">Support</h4>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-slate-600 hover:text-slate-900 transition-colors">Terms</a></li>
                        </ul>
                    </div>
                     <div className="md:col-span-4">
                        <h4 className="font-semibold text-slate-800">Stay in the Loop</h4>
                        <p className="mt-4 text-slate-600">Get the latest trends and feature updates.</p>
                        <form className="flex mt-4 space-x-2">
                            <input type="email" placeholder="Enter your email" className="bg-white text-slate-800 placeholder-slate-400 px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 border border-slate-300" />
                            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Sign Up</button>
                        </form>
                    </div>
                </div>
                <div className="mt-16 border-t border-slate-200 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-slate-500">&copy; 2024 Klaro. All Rights Reserved.</p>
                    <div className="flex mt-4 sm:mt-0 space-x-5">
                        <a href="#" className="text-slate-500 hover:text-slate-900"><Icon name="instagram" /></a>
                        <a href="#" className="text-slate-500 hover:text-slate-900"><Icon name="twitter" /></a>
                        <a href="#" className="text-slate-500 hover:text-slate-900"><Icon name="pinterest" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
