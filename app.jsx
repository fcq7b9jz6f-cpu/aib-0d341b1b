import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Music, Mic, Film, User, Menu, X } from "lucide-react";

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { title: "الرئيسية", href: "#hero" },
    { title: "المسيرة", href: "#biography" },
    { title: "أشهر الأغاني", href: "#songs" },
    { title: "المعرض", href: "#gallery" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const smoothScroll = (e, target) => {
      e.preventDefault();
      document.querySelector(target).scrollIntoView({
          behavior: 'smooth'
      });
      setIsMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="bg-background text-text-primary font-body">

        <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#hero" onClick={(e) => smoothScroll(e, '#hero')} className="font-display font-bold text-2xl text-primary">كوكب الشرق</a>
            <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => smoothScroll(e, link.href)} className="text-text-secondary hover:text-primary transition-colors duration-300 pb-1 border-b-2 border-transparent hover:border-primary"> {link.title} </a>
              ))}
            </nav>
            <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary z-50">
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>
          </div>
          {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="md:hidden absolute top-full left-0 w-full bg-background shadow-lg">
                <nav className="flex flex-col items-center py-4">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} onClick={(e) => smoothScroll(e, link.href)} className="py-3 text-lg text-text-secondary hover:text-primary transition-colors duration-300"> {link.title} </a>
                    ))}
                </nav>
            </motion.div>
          )}
        </header>

        <main>
          <HeroSection />
          <BiographySection />
          <SongsSection />
          <GallerySection />
        </main>

        <footer className="bg-neutral-800 text-neutral-300 py-8">
            <div className="container mx-auto px-6 text-center">
                <p className="font-display text-lg">"لقد عرفت في حياتي الطويلة أن كل مجد الدنيا باطل أمام لحظة حب صادقة." - أم كلثوم</p>
                <p className="mt-4 text-sm font-body opacity-70">صُنع هذا الموقع بحب وتقدير لصوت مصر الخالد. &copy; {new Date().getFullYear()}</p>
            </div>
        </footer>
      </div>
    </BrowserRouter>
  );
};

const MotionSection = ({ children, id }) => (
    <motion.section 
        id={id}
        className="py-20 md:py-32"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
    >
        {children}
    </motion.section>
)

const HeroSection = () => (
  <section id="hero" className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
           style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images.unsplash.com/photo-1589100788772-91f39727a871?q=80&w=2670&auto=format&fit=crop)'}}>
    <motion.div 
      className="text-center text-white p-6"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
    >
      <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-shadow-lg">كوكب الشرق</h1>
      <p className="font-body text-xl md:text-3xl mt-4 max-w-2xl mx-auto text-shadow">
        أم كلثوم: <em>صوت</em> مصر الذي وحّد قلوب الملايين
      </p>
    </motion.div>
  </section>
);

const BiographySection = () => (
    <MotionSection id="biography">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-5 gap-12 items-center">
                <div className="md:col-span-3">
                    <h2 className="font-display text-5xl md:text-6xl text-primary mb-6">مسيرة خالدة</h2>
                    <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
                        <p>وُلدت فاطمة إبراهيم السيد البلتاجي، التي عُرفت فيما بعد باسم أم كلثوم، في قرية طماي الزهايرة بالدقهلية. منذ نعومة أظفارها، أظهرت موهبة صوتية استثنائية، حيث كان والدها يصطحبها معه لتلاوة القرآن في الاحتفالات والموالد.</p>
                        <p>في عشرينيات القرن الماضي، انتقلت إلى القاهرة، وهناك بدأت رحلتها الأسطورية. تعاونت مع كبار الملحنين والشعراء مثل أحمد رامي، رياض السنباطي، ومحمد القصبجي، لتقدم أعمالًا فنية غيرت وجه الموسيقى العربية. لم تكن مجرد مطربة، بل كانت ظاهرة ثقافية واجتماعية، حيث كانت حفلاتها الشهرية في أول خميس من كل شهر حدثًا ينتظره العالم العربي بأسره.</p>
                        <p>عُرفت بلقب "كوكب الشرق" و "سيدة الغناء العربي"، وتجاوز تأثيرها حدود الفن ليصل إلى السياسة والعمل الوطني، حيث أقامت حفلات عديدة لدعم المجهود الحربي المصري. رحلت أم كلثوم عام 1975، لكن صوتها وفنها ما زالا حاضرين بقوة، يمثلان جزءًا أصيلًا من هوية وتاريخ المنطقة.</p>
                    </div>
                </div>
                <div className="md:col-span-2 flex justify-center">
                    <motion.div 
                        className="w-full max-w-sm h-auto aspect-[3/4] rounded-lg shadow-2xl overflow-hidden"
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <img src="https://images.unsplash.com/photo-1618778494708-0e7b858daf3a?q=80&w=2274&auto=format&fit=crop" alt="صورة فنية لأم كلثوم" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>
        </div>
    </MotionSection>
);

const SongsSection = () => {
    const songs = [
        { title: "الأطلال", composer: "رياض السنباطي", year: "1966" },
        { title: "أنت عمري", composer: "محمد عبد الوهاب", year: "1964" },
        { title: "سيرة الحب", composer: "بليغ حمدي", year: "1964" },
        { title: "ألف ليلة وليلة", composer: "بليغ حمدي", year: "1969" },
        { title: "بعيد عنك", composer: "بليغ حمدي", year: "1965" },
        { title: "فكروني", composer: "محمد عبد الوهاب", year: "1966" },
        { title: "الحب كله", composer: "بليغ حمدي", year: "1971" },
        { title: "رباعيات الخيام", composer: "رياض السنباطي", year: "1950" },
    ];

    return (
        <MotionSection id="songs">
            <div className="container mx-auto px-6">
                <h2 className="font-display text-5xl md:text-6xl text-primary mb-12 text-center">روائع غنائية</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {songs.map((song, index) => (
                        <motion.div 
                            key={song.title} 
                            className="bg-neutral-800/20 p-6 rounded-lg text-center flex flex-col justify-between items-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.1}}
                            whileHover={{ y: -8, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
                        >
                            <Music className="text-accent mb-4" size={40}/>
                            <h3 className="font-display text-2xl text-primary">{song.title}</h3>
                            <p className="text-text-secondary mt-2">من ألحان: {song.composer}</p>
                            <p className="text-sm text-accent font-bold mt-2">{song.year}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </MotionSection>
    );
};

const GallerySection = () => {
    const images = [
        'https://images.unsplash.com/photo-1549472301-44a7735a2977?q=80&w=2574&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1594515573484-7a98efb4a372?q=80&w=2574&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1588071243571-0852467b7e88?q=80&w=2574&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1603400501831-23d2b274c653?q=80&w=2574&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563874257-238430756774?q=80&w=2674&auto=format&fit=crop',
    ];

    return (
        <MotionSection id="gallery">
            <div className="container mx-auto px-6">
                <h2 className="font-display text-5xl md:text-6xl text-primary mb-12 text-center">معرض الصور</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((src, index) => (
                    <motion.div 
                        key={index} 
                        className="overflow-hidden rounded-lg shadow-lg group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1}}
                    >
                        <img src={src} alt={`صورة أرشيفية ${index + 1}`} className="w-full h-full object-cover aspect-square md:aspect-[4/3] group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                    </motion.div>
                ))}
                </div>
            </div>
        </MotionSection>
    )
}

createRoot(document.getElementById("root")).render(<App />);