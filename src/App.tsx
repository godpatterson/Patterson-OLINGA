import { useState, useEffect, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Smartphone,
  Cpu,
  Tv,
  PenTool,
  Award,
  ChevronLeft,
  ChevronRight,
  Eye,
  MessageSquare,
  TrendingUp,
  Sliders,
  ExternalLink,
  Target,
  Send,
  Zap,
  Upload,
  Info,
  Check,
  RefreshCw
} from "lucide-react";

// Fallback/Default image imports generated in previous step
import defaultCyberFace from "./assets/images/cyber_patterson_face_1782444992622.jpg";
import defaultMag from "./assets/images/patterson_magazine_cover_1782445011793.jpg";
import defaultCameroon from "./assets/images/patterson_cameroon_poster_1782445031173.jpg";
import defaultAzure from "./assets/images/patterson_azure_atelier_1782445056994.jpg";
import defaultNews from "./assets/images/patterson_news_martial_arts_1782445074838.jpg";

export default function App() {
  // States for user-uploaded custom media
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [customPhotos, setCustomPhotos] = useState<{ [key: string]: string }>({
    magazine: "",
    cameroon: "",
    blueprint: "",
    newspaper: "",
  });

  // Controls & States for the Video Visage
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoQuality, setVideoQuality] = useState("RAW 4K");
  const [progress, setProgress] = useState(25);
  const videoRef = useRef<HTMLVideoElement>(null);

  // States for interactive sliders
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [showConfigHelper, setShowConfigHelper] = useState(true);

  // The 4 sliding photos data
  const slidingPhotos = [
    {
      id: "magazine",
      title: "Édition Créateur — PTS Magazine",
      type: "Couverture de Mode",
      defaultImg: defaultMag,
      description: "Couverture de magazine premium de style minimaliste et impact visuel maximum pour Patterson Olinga."
    },
    {
      id: "cameroon",
      title: "Cameroun : Terre de Contrastes",
      type: "Art Digital & Affiche",
      defaultImg: defaultCameroon,
      description: "Une magnifique affiche combinant le visage de Patterson avec la richesse culturelle et naturelle du Cameroun."
    },
    {
      id: "blueprint",
      title: "Azure Atelier — Conçu Pour Imposer",
      type: "Fiche Technique Mode",
      defaultImg: defaultAzure,
      description: "Directives techniques d'atelier et design de mode exclusif, alliant élégance et coupe moderne de précision."
    },
    {
      id: "newspaper",
      title: "PTS News — Injustice à Bédi",
      type: "Affiche Narrative",
      defaultImg: defaultNews,
      description: "Composition dramatique inspirée de faits réels, relatant un combat d'arts martiaux à Douala sous forme de journal d'époque."
    }
  ];

  // Original 3 projects from the user's original HTML
  const originalProjects = [
    {
      id: 0,
      title: "Nextlevel Studio",
      type: "Prompt Engineering",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
      ],
      desc: "Conception de prompts optimisés de haute intensité pour générer des scènes cinématographiques et visuels futuristes d'un photoréalisme absolu."
    },
    {
      id: 1,
      title: "Aura Brand Identity",
      type: "Identité Visuelle",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
      ],
      desc: "Direction artistique haut de gamme et développement de charte graphique moderne pour positionner les marques créatives."
    },
    {
      id: 2,
      title: "Solaris Digital",
      type: "Conception Web",
      images: [
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
        "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
      ],
      desc: "Création de sites web ultra-rapides et immersifs pour présenter des galeries d'images et des animations interactives d'avant-garde."
    }
  ];

  // Helper list for standard services
  const servicesList = [
    {
      num: "01",
      name: "Prompt Engineering IA",
      desc: "Création de prompts avancés pour générer des personnages récurrents, décors réalistes et éléments graphiques constants sur Midjourney, Flux, et Stable Diffusion."
    },
    {
      num: "02",
      name: "Création de Contenu de Marque",
      desc: "Conception de visuels haut de gamme, de affiches promotionnelles et de formats publicitaires à esthétique cinématographique pour vos réseaux."
    },
    {
      num: "03",
      name: "Développement Web Interactif",
      desc: "Programmation d'interfaces fluides et soignées sous React et Tailwind CSS, centrées sur l'expérience utilisateur et l'animation premium."
    },
    {
      num: "04",
      name: "Direction Créative",
      desc: "Supervision complète de l'identité de marque, depuis l'idée initiale et la génération d'images d'art jusqu'à la mise en page finale."
    }
  ];

  // Handles playing/pausing state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, customVideoUrl]);

  // Handle fake video progress simulator if native video isn't loaded
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !customVideoUrl) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying, customVideoUrl]);

  // Video timeupdate handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration || 1;
      setProgress((current / duration) * 100);
    }
  };

  // Video file upload handler
  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setIsPlaying(true);
    }
  };

  // Photo file upload handler
  const handlePhotoUpload = (id: string, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCustomPhotos((prev) => ({
        ...prev,
        [id]: url,
      }));
    }
  };

  // Reset all uploaded files
  const handleResetMedia = () => {
    setCustomVideoUrl(null);
    setCustomPhotos({
      magazine: "",
      cameroon: "",
      blueprint: "",
      newspaper: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#0C0C0C] text-slate-100 font-sans antialiased selection:bg-fuchsia-600 selection:text-white pb-16">
      
      {/* ===== INTERACTIVE CUSTOMIZATION CONSOLE (Panneau de configuration média) ===== */}
      <div className="bg-[#111] border-b border-white/10 text-xs py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
            </span>
            <span className="font-mono text-slate-300">
              <strong className="text-fuchsia-400">CONSOLE DES MÉDIAS :</strong> Personnalisez le site en insérant vos fichiers originaux directement.
            </span>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setShowConfigHelper(!showConfigHelper)}
              className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition text-slate-300 flex items-center gap-1 font-mono uppercase text-[10px]"
            >
              <Info className="w-3.5 h-3.5 text-fuchsia-400" /> {showConfigHelper ? "Masquer l'aide" : "Aide d'intégration"}
            </button>

            {(customVideoUrl || Object.values(customPhotos).some(v => v !== "")) && (
              <button
                onClick={handleResetMedia}
                className="px-3 py-1 rounded bg-rose-950/40 border border-rose-800/30 text-rose-300 hover:bg-rose-900/30 transition flex items-center gap-1 font-mono uppercase text-[10px]"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Réinitialiser
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Helper Panel showing instructions to place the files permanently */}
      <AnimatePresence>
        {showConfigHelper && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-fuchsia-950/25 border-b border-fuchsia-500/20 text-slate-300"
          >
            <div className="max-w-7xl mx-auto p-4 sm:p-6 text-xs sm:text-sm space-y-3">
              <h4 className="font-bold text-fuchsia-400 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Comment afficher vos fichiers originaux définitivement ?
              </h4>
              <p className="text-slate-400 leading-relaxed max-w-4xl text-xs">
                Les fichiers que vous déposez dans la boîte de discussion ne sont pas écrits directement sur le disque du conteneur en raison des règles de la plateforme. 
                Cependant, nous avons configuré l'application pour qu'elle charge vos propres médias en mémoire temporaire grâce aux boutons ci-dessous ! Pour que vos médias soient 
                <strong> permanents </strong> lors de vos partages ou téléchargements futurs, placez simplement vos fichiers d'origine dans le dossier du projet avec ces noms exacts :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 font-mono text-[11px] mt-2">
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <span className="text-fuchsia-400 block font-bold">Vidéo Visage :</span>
                  <span className="text-slate-400">src/assets/video_face_loop.mp4</span>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <span className="text-cyan-400 block font-bold">Photo 1 (Magazine) :</span>
                  <span className="text-slate-400">src/assets/photo_magazine.jpg</span>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <span className="text-cyan-400 block font-bold">Photo 2 (Affiche) :</span>
                  <span className="text-slate-400">src/assets/photo_cameroon.jpg</span>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <span className="text-cyan-400 block font-bold">Photo 3 (Vêtement) :</span>
                  <span className="text-slate-400">src/assets/photo_blueprint.jpg</span>
                </div>
                <div className="p-2.5 rounded bg-black/40 border border-white/5">
                  <span className="text-cyan-400 block font-bold">Photo 4 (Journal) :</span>
                  <span className="text-slate-400">src/assets/photo_newspaper.jpg</span>
                </div>
              </div>
              <p className="text-slate-500 italic text-[11px] pt-1">
                *Actuellement, l'application utilise des rendus générés par IA comme magnifiques exemples par défaut si aucun fichier n'est téléversé.*
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== HEADER / NAVIGATION BAR ===== */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0C0C0C]/90 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#hero-section" className="flex items-center gap-1.5 font-display text-xl font-black tracking-widest text-white uppercase">
            PATTERSON<span className="text-fuchsia-500 font-light">OLINGA</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
            <a href="#video-block" className="hover:text-fuchsia-400 transition-colors">La Vidéo IA</a>
            <a href="#photos-slider" className="hover:text-fuchsia-400 transition-colors">4 Photos Coulissantes</a>
            <a href="#projects-section" className="hover:text-fuchsia-400 transition-colors">Mes Projets</a>
            <a href="#services-section" className="hover:text-fuchsia-400 transition-colors">Services</a>
            <a href="#narrative-about" className="hover:text-fuchsia-400 transition-colors">À Propos</a>
            <a href="#contact-footer" className="hover:text-fuchsia-400 transition-colors">Contact</a>
          </nav>

          <a
            href="https://wa.me/237693590361"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white shadow-lg shadow-fuchsia-600/10 transition-all duration-300 flex items-center gap-1"
          >
            ME CONTACTER <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </a>
        </div>
      </header>

      {/* ===== HERO WITH NAME HEADER ===== */}
      <section id="hero-section" className="relative pt-16 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        
        {/* Ambient glows */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
          <div className="w-[450px] h-[450px] rounded-full bg-fuchsia-900/15 blur-[120px] absolute -top-10 left-1/3"></div>
          <div className="w-[350px] h-[350px] rounded-full bg-cyan-900/10 blur-[100px] absolute bottom-0 right-1/3"></div>
        </div>

        {/* Technical subtitle metadata */}
        <div className="flex items-center justify-between text-slate-500 font-mono text-[9px] sm:text-xs tracking-[0.2em] uppercase border-b border-white/5 pb-4 mb-10">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
            <span>CREATIVE PORTFOLIO 2026 // v4.1</span>
          </div>
          <div>DOUALA, CAMEROUN</div>
          <div>VISUAL EXPERT &amp; AI DEVELOPER</div>
        </div>

        {/* Master Branding Heading: PATTERSON OLINGA */}
        <div className="text-center">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs font-mono tracking-[0.4em] uppercase text-fuchsia-400 block mb-3 font-semibold"
          >
            ✨ PORTFOLIO OFFICIEL — DIRECTION ARTISTIQUE
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none font-sans"
          >
            <span className="block text-slate-200">PATTERSON</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-400 to-cyan-400 drop-shadow-sm glow-text">
              OLINGA
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-6 text-xs sm:text-sm md:text-base font-light text-slate-400 max-w-xl sm:max-w-2xl mx-auto uppercase tracking-widest leading-relaxed"
          >
            AI Visual Architect &amp; Directeur Artistique. La vidéo ci-dessous présente mon visage animé en mouvement infini. Parcourez ensuite les quatre photos qui coulissent pour découvrir mes créations phares.
          </motion.p>
        </div>
      </section>

      {/* ===== VIDEO BLOCK (DIRECTEMENT EN DESSOUS DU NOM) ===== */}
      <section id="video-block" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-[10px] font-mono uppercase text-fuchsia-400 tracking-[0.2em]">RENDU EN MOUVEMENT INFINI</span>
          <h2 className="text-sm font-bold tracking-widest text-slate-400 uppercase mt-1">LE VISAGE BOUGE DE GAUCHE À DROITE</h2>
        </div>

        {/* Video Frame */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#070707] shadow-2xl shadow-fuchsia-500/5 group">
          
          {/* Header high-tech */}
          <div className="bg-[#121212] px-4 py-3 flex items-center justify-between border-b border-white/5 text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-fuchsia-500 animate-pulse" : "bg-rose-500"}`}></span>
              <span className="text-slate-200 tracking-wider">VISAGE_PATTERSON_INFINITE_LOOP</span>
            </div>
            <div className="flex items-center gap-3">
              {customVideoUrl ? (
                <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded text-[9px] border border-emerald-500/20 font-bold flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" /> VOTRE VIDÉO ACTIVE
                </span>
              ) : (
                <span className="text-fuchsia-400 bg-fuchsia-500/10 px-1.5 py-0.5 rounded text-[9px] border border-fuchsia-500/20">VISU_IA_EXEMPLE</span>
              )}
              <span className="hidden sm:inline">60 FPS</span>
              <span>{videoQuality}</span>
            </div>
          </div>

          {/* Video Container Canvas */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden flex items-center justify-center">
            
            {/* Hologram lines scanner */}
            {isPlaying && (
              <motion.div 
                className="absolute left-0 w-full h-[2px] bg-fuchsia-500/80 z-20 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                initial={{ top: "0%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Futuristic Overlay HUD Elements */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 pointer-events-none font-mono text-[9px] sm:text-[11px] text-cyan-400">
              <div className="flex justify-between">
                <div className="w-5 h-5 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-sm"></div>
                <div className="text-right">
                  <span className="text-slate-500 text-[8px] block">SYSTEM_LOCK</span>
                  <span className="text-fuchsia-400 font-bold">INFINITE_SWEEP: ACTIVE</span>
                </div>
                <div className="w-5 h-5 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-sm"></div>
              </div>

              {/* Central scanning bounds */}
              <div className="flex justify-between items-center px-2">
                <div className="flex flex-col gap-0.5 text-slate-500 text-[8px]">
                  <span>OFFSET_X: 1.05</span>
                  <span>OFFSET_Y: -0.42</span>
                  <span>SCANNING: 100%</span>
                </div>
                
                {/* Face Tracker ring overlay */}
                <div className="w-20 h-20 sm:w-44 sm:h-44 border border-dashed border-fuchsia-500/40 rounded-full flex items-center justify-center animate-[spin_24s_linear_infinite]">
                  <div className="w-16 h-16 sm:w-36 sm:h-36 border border-dotted border-cyan-400/20 rounded-full"></div>
                </div>

                <div className="flex flex-col items-end gap-0.5 text-slate-500 text-[8px]">
                  <span>AI_VISAGE_PROMPT</span>
                  <span>STRETCH_RATIO: 1.15</span>
                  <span>STATUS: LOOPING</span>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="w-5 h-5 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-sm"></div>
                <div className="text-[8px] sm:text-[10px] text-slate-400">
                  <span>AUTOPLAY_LOOP : ON</span>
                </div>
                <div className="w-5 h-5 border-b-2 border-r-2 border-cyan-400/40 rounded-br-sm"></div>
              </div>
            </div>

            {/* Video or Fallback Panning Photo */}
            {customVideoUrl ? (
              <video
                ref={videoRef}
                src={customVideoUrl}
                loop
                autoPlay
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover select-none"
              />
            ) : (
              // Fallback: If no custom video is loaded, we display the visage and perform the panned horizontal sweep infinitely
              <motion.div
                className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%]"
                animate={isPlaying ? {
                  x: ["-6%", "6%", "-6%"], // Left to Right sweeping
                  y: ["-1%", "1%", "-1%"],
                  scale: [1, 1.02, 1]
                } : {}}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img 
                  src={defaultCyberFace} 
                  alt="Portrait Visage IA de Patterson" 
                  className="w-full h-full object-cover select-none"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            )}

            {/* Manual Play trigger overlay */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-3 z-30 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-full bg-fuchsia-600/30 border border-fuchsia-500 flex items-center justify-center text-white backdrop-blur-sm animate-pulse shadow-lg">
                    <Play className="w-5 h-5 fill-white ml-0.5 text-white" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300">Vidéo en pause (cliquez pour relancer)</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contrôles de lecture */}
          <div className="bg-[#121212] px-4 py-3 flex flex-col gap-2.5 border-t border-white/5">
            
            {/* Time progress timeline bar */}
            <div className="relative w-full h-1 bg-slate-800 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = clickX / rect.width;
              setProgress(ratio * 100);
              if (videoRef.current) {
                videoRef.current.currentTime = ratio * videoRef.current.duration;
              }
            }}>
              <div 
                className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition"
                  title={isPlaying ? "Pause" : "Lancer"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-slate-300" /> : <Play className="w-4 h-4 fill-slate-300" />}
                </button>

                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition"
                  title={isMuted ? "Activer le son" : "Désactiver le son"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-fuchsia-400" />}
                </button>

                <span className="font-mono text-[10px] text-slate-400">
                  LOOP_TRACK // PROGRESS: {Math.round(progress)}%
                </span>
              </div>

              {/* Live uploader zone in the video panel */}
              <div className="flex items-center gap-2">
                <label className="cursor-pointer px-3 py-1 rounded bg-fuchsia-600/10 border border-fuchsia-500/30 text-fuchsia-300 hover:bg-fuchsia-500/20 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 transition">
                  <Upload className="w-3 h-3" /> Télécharger votre vidéo originale (.mp4)
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===== PORTFOLIO SLIDER: THE 4 PHOTOS COULISSANTES (EN DESSOUS DE LA VIDÉO) ===== */}
      <section id="photos-slider" className="py-16 bg-[#0E0E0E] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-[10px] font-mono uppercase text-fuchsia-400 tracking-[0.25em] block mb-1">
              PROJETS PHARES EN COULISSEMENT
            </span>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight font-display">
              VOILA LES 4 PHOTOS QUI COULISSENT
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              Retrouvez ci-dessous les quatre œuvres majeures qui coulissent en continu. Vous pouvez également cliquer sur l'une d'elles pour l'inspecter ou téléverser votre propre fichier d'origine.
            </p>
          </div>

          {/* INFINITE SLIDING MARQUEE TRACK (The Continuous Slider requested) */}
          <div className="relative mb-14">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0E0E0E] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0E0E0E] to-transparent z-10 pointer-events-none"></div>

            <div className="overflow-hidden py-4">
              <div className="animate-scroll-left flex gap-6 w-max">
                
                {/* 1st list iteration */}
                {slidingPhotos.map((photo, index) => {
                  const imageSrc = customPhotos[photo.id] || photo.defaultImg;
                  return (
                    <div 
                      key={`slide1-${photo.id}`}
                      onClick={() => setCarouselIndex(index)}
                      className={`w-[260px] sm:w-[320px] flex-shrink-0 bg-black/40 rounded-2xl border overflow-hidden group cursor-pointer transition-all duration-300 ${carouselIndex === index ? "border-fuchsia-500 scale-[1.01] shadow-lg shadow-fuchsia-500/5" : "border-white/5 hover:border-white/20 hover:scale-[1.01]"}`}
                    >
                      <div className="aspect-[3/4] overflow-hidden relative bg-[#151515]">
                        <img 
                          src={imageSrc} 
                          alt={photo.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-black/70 px-2 py-0.5 rounded text-[8px] font-mono text-fuchsia-400 border border-fuchsia-500/20">
                          PHOTO 0{index + 1}
                        </div>
                        {customPhotos[photo.id] && (
                          <div className="absolute top-3 right-3 bg-emerald-500/80 px-2 py-0.5 rounded text-[8px] font-mono text-white font-bold">
                            ORIGINAL
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-fuchsia-400 tracking-wider block">{photo.type}</span>
                          <h4 className="font-bold text-slate-200 text-xs sm:text-sm mt-0.5 truncate">{photo.title}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* 2nd duplicated list iteration for infinite continuous rolling loop */}
                {slidingPhotos.map((photo, index) => {
                  const imageSrc = customPhotos[photo.id] || photo.defaultImg;
                  return (
                    <div 
                      key={`slide2-${photo.id}`}
                      onClick={() => setCarouselIndex(index)}
                      className={`w-[260px] sm:w-[320px] flex-shrink-0 bg-black/40 rounded-2xl border overflow-hidden group cursor-pointer transition-all duration-300 ${carouselIndex === index ? "border-fuchsia-500 scale-[1.01] shadow-lg shadow-fuchsia-500/5" : "border-white/5 hover:border-white/20 hover:scale-[1.01]"}`}
                    >
                      <div className="aspect-[3/4] overflow-hidden relative bg-[#151515]">
                        <img 
                          src={imageSrc} 
                          alt={photo.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 bg-black/70 px-2 py-0.5 rounded text-[8px] font-mono text-fuchsia-400 border border-fuchsia-500/20">
                          PHOTO 0{index + 1}
                        </div>
                        {customPhotos[photo.id] && (
                          <div className="absolute top-3 right-3 bg-emerald-500/80 px-2 py-0.5 rounded text-[8px] font-mono text-white font-bold">
                            ORIGINAL
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[9px] font-mono uppercase text-fuchsia-400 tracking-wider block">{photo.type}</span>
                          <h4 className="font-bold text-slate-200 text-xs sm:text-sm mt-0.5 truncate">{photo.title}</h4>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {/* INTERACTIVE MANUAL DETAILED COMPONENT (Allows viewing and uploading each photo) */}
          <div className="bg-[#111] p-6 sm:p-8 rounded-2xl border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left side: descriptions and upload handles */}
            <div className="md:col-span-5 flex flex-col justify-between h-full min-h-[320px]">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-fuchsia-400 font-bold">PHOTO 0{carouselIndex + 1}</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">04</span>
                  <span className="ml-4 px-2 py-0.5 rounded bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 uppercase text-[9px] font-bold">
                    {slidingPhotos[carouselIndex].id}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-100 uppercase tracking-tight mt-3">
                  {slidingPhotos[carouselIndex].title}
                </h3>
                
                <span className="text-[10px] font-mono uppercase text-slate-400 mt-1 block">
                  Catégorie : <span className="text-fuchsia-400">{slidingPhotos[carouselIndex].type}</span>
                </span>

                <p className="text-slate-400 text-xs sm:text-sm mt-4 leading-relaxed font-light">
                  {slidingPhotos[carouselIndex].description}
                </p>

                {/* Upload button for this specific slide */}
                <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                  <span className="block font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    Importer votre photo originale :
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer flex items-center justify-center gap-1 px-4 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-[10px] uppercase tracking-wider transition w-full">
                      <Upload className="w-3.5 h-3.5" /> Choisir l'image originale
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpload(slidingPhotos[carouselIndex].id, e)}
                        className="hidden"
                      />
                    </label>

                    {customPhotos[slidingPhotos[carouselIndex].id] && (
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400" title="Image d'origine chargée">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <span className="block text-[9px] text-slate-500 font-mono">
                    * Recommandé : Image verticale (format 3:4)
                  </span>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="flex items-center gap-3 mt-8">
                <button 
                  onClick={() => setCarouselIndex((prev) => (prev === 0 ? 3 : prev - 1))}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-fuchsia-600 hover:border-fuchsia-500 transition-all duration-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setCarouselIndex((prev) => (prev === 3 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-fuchsia-600 hover:border-fuchsia-500 transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <span className="ml-auto text-[10px] font-mono text-slate-500">
                  {customPhotos[slidingPhotos[carouselIndex].id] ? "✓ Image originale active" : "⚠ Rendu de démonstration"}
                </span>
              </div>

            </div>

            {/* Right side: large preview of the active slider photo */}
            <div className="md:col-span-7 aspect-[3/4] sm:aspect-[4/3] md:aspect-auto md:h-[480px] rounded-xl overflow-hidden relative bg-[#151515] border border-white/10 group">
              <img 
                src={customPhotos[slidingPhotos[carouselIndex].id] || slidingPhotos[carouselIndex].defaultImg} 
                alt={slidingPhotos[carouselIndex].title} 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div>
                  <span className="text-[9px] font-mono uppercase text-fuchsia-400 tracking-wider block">PREVIEW EN DIRECT</span>
                  <p className="text-white font-bold text-sm">{slidingPhotos[carouselIndex].title}</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ===== ORIGINAL USER PROJECTS SECTION ===== */}
      <section id="projects-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono text-fuchsia-400 tracking-[0.3em] uppercase block mb-1">
              💼 TRAVAUX DU PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
              MES PROJETS ORIGINAUX
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mt-3">
              Découvrez mes projets créatifs originaux importés directement de ma figma avec leurs liens de ressources originaux et visuels de démonstration.
            </p>
          </div>
        </div>

        {/* 3 Original Projects layout */}
        <div className="space-y-24">
          {originalProjects.map((proj, idx) => (
            <div key={proj.id} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-white/5 pb-16 last:border-0 last:pb-0">
              
              {/* Project info card */}
              <div className="lg:col-span-4 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-fuchsia-500 font-bold">0{idx + 1}</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">03</span>
                  <span className="ml-2 px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                    {proj.type}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-200 uppercase tracking-tight">
                  {proj.title}
                </h3>
                
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
                  {proj.desc}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <a 
                    href="https://wa.me/237693590361" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:border-fuchsia-500 hover:text-white transition duration-300"
                  >
                    S'enquérir du projet
                  </a>
                </div>
              </div>

              {/* Project images panel - replicating the user figma structure */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white/[0.01] p-3 rounded-2xl border border-white/5">
                
                <div className="sm:col-span-5 flex flex-col gap-3">
                  <div className="h-[140px] sm:h-[180px] rounded-xl overflow-hidden border border-white/10">
                    <img src={proj.images[0]} alt={proj.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="h-[180px] sm:h-[240px] rounded-xl overflow-hidden border border-white/10">
                    <img src={proj.images[1]} alt={proj.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                </div>

                <div className="sm:col-span-7 h-[332px] sm:h-[432px] rounded-xl overflow-hidden border border-white/10">
                  <img src={proj.images[2]} alt={proj.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>

              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services-section" className="py-24 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono text-fuchsia-400 tracking-[0.3em] uppercase block mb-1">
              ⚡ COMPÉTENCES &amp; SOLUTIONS IA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-display">
              MES DOMAINES D'EXPERTISE
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
              Chaque visuel est conçu pour imposer. J'orchestre les outils d'intelligence artificielle générative pour atteindre une cohérence créative parfaite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((ser, index) => (
              <div key={index} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-fuchsia-500/40 hover:bg-white/[0.08] transition duration-300 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-2xl font-black text-slate-600 block">{ser.num}</span>
                  <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wide mt-4">{ser.name}</h3>
                  <p className="text-slate-400 text-xs mt-2.5 leading-relaxed font-light">{ser.desc}</p>
                </div>
                <span className="text-[9px] font-mono text-fuchsia-400 uppercase tracking-wider mt-6 block">PROFESSIONNEL</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== NARRATIVE ABOUT (À PROPOS) ===== */}
      <section id="narrative-about" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Deco elements replica from user's figma */}
        <div className="absolute top-10 left-4 w-12 sm:w-20 opacity-30 pointer-events-none">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="w-full" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute bottom-10 left-4 w-12 sm:w-20 opacity-30 pointer-events-none">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-full" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute top-10 right-4 w-12 sm:w-20 opacity-30 pointer-events-none">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="w-full" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute bottom-10 right-4 w-12 sm:w-20 opacity-30 pointer-events-none">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-full" referrerPolicy="no-referrer" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-8">
          <span className="text-xs font-mono text-fuchsia-400 tracking-[0.3em] uppercase block">
            📖 HISTOIRE DE CONCEPTEUR
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans">
            À PROPOS DE PATTERSON
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Créateur visuel basé au Cameroun, je maîtrise l'art de transformer des idées en expériences visuelles percutantes. Du prompt engineering à la conception de sites web, en passant par les visuels publicitaires et les vidéos de marque — je construis des univers numériques qui marquent les esprits.
          </p>

          <div className="border-t border-b border-white/5 py-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center max-w-xl mx-auto">
            <div>
              <span className="text-2xl font-black text-fuchsia-500 block">128K</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-1">Abonnés</span>
            </div>
            <div>
              <span className="text-2xl font-black text-cyan-400 block">5 ANS</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-1">D'Expérience</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-2xl font-black text-emerald-400 block">100%</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mt-1">Fidélité IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT / FOOTER ===== */}
      <footer id="contact-footer" className="bg-[#090909] border-t border-white/5 py-16 px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl sm:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 font-sans">
            TRAVAILLONS ENSEMBLE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed uppercase tracking-wider font-light">
            Un projet en tête ? Une vision à concrétiser ?<br/>Contactez-moi directement sur l'un de mes numéros WhatsApp officiels.
          </p>

          {/* Dual WhatsApp Contact Groups */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a 
              href="https://wa.me/237693590361" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center gap-2 transition duration-300 shadow-lg shadow-emerald-500/10"
            >
              <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +237 693 590 361
            </a>
            
            <a 
              href="https://wa.me/237651843666" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#25D366] hover:bg-[#1ebe5d] text-white flex items-center gap-2 transition duration-300 shadow-lg shadow-emerald-500/10"
            >
              <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +237 651 843 666
            </a>
          </div>

          <p className="text-[10px] text-slate-500 font-mono tracking-widest pt-8 uppercase">
            © 2026 PATTERSON OLINGA — TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </footer>

    </div>
  );
}
