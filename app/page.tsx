"use client";

import { useState, useEffect, useRef } from "react";
import { Bot, Globe, Github, Linkedin, MessageCircle, ArrowRight, Workflow, ChevronRight, ExternalLink, Instagram } from "lucide-react";

// ─── CONTATOS ───────────────────────────────────────────────────────────────
const WHATSAPP_LINK  = "https://wa.me/5562998114209";
const INSTAGRAM_LINK = "https://instagram.com/a.vjunq";
const GITHUB_LINK    = "https://github.com/seuusuario"; // substitua
const LINKEDIN_LINK  = "https://linkedin.com/in/seuusuario"; // substitua

// ─── FOTO ───────────────────────────────────────────────────────────────────
const PHOTO_URL = "/foto_site.jpeg";

// ─── PROJETOS ───────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "Chatbot Nutricionista",
    desc: "Assistente IA integrado ao site de nutricionista com Claude API e fluxo de vendas automatizado.",
    tags: ["Claude API", "Next.js", "n8n"],
    link: "https://luis-resende-nutri.vercel.app",
  },
  {
    title: "Automação de Leads",
    desc: "Pipeline completo de captura e qualificação de leads via WhatsApp com IA e CRM.",
    tags: ["n8n", "Evolution API", "Node.js"],
    link: "#",
  },
  {
    title: "Dashboard de IA",
    desc: "Painel analítico com insights gerados por LLM para tomada de decisão em tempo real.",
    tags: ["Python", "OpenAI", "Vercel"],
    link: "#",
  },
];

// ─── TERMINAL LINES ──────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  { delay: 0,    text: "$ initializing arthur.dev...", color: "#00fff0" },
  { delay: 600,  text: "> loading tech stack...",      color: "#a78bfa" },
  { delay: 1200, text: "  ✓ Python 3.12",              color: "#86efac" },
  { delay: 1600, text: "  ✓ Node.js / TypeScript",     color: "#86efac" },
  { delay: 2000, text: "  ✓ n8n + Make (automação)",   color: "#86efac" },
  { delay: 2400, text: "  ✓ Anthropic / OpenAI APIs",  color: "#86efac" },
  { delay: 2800, text: "  ✓ Next.js + Vercel",         color: "#86efac" },
  { delay: 3200, text: "  ✓ Evolution API / WhatsApp", color: "#86efac" },
  { delay: 3600, text: "> status: DISPONÍVEL",         color: "#00fff0" },
  { delay: 4000, text: "_ ",                           color: "#ffffff", blink: true },
];

// ─── TYPEWRITER HOOK ─────────────────────────────────────────────────────────
function useTypewriter(lines: typeof TERMINAL_LINES) {
  const [visible, setVisible] = useState<typeof TERMINAL_LINES>([]);
  useEffect(() => {
    lines.forEach((line) => {
      setTimeout(() => setVisible((v) => [...v, line]), line.delay);
    });
  }, []);
  return visible;
}

// ─── TYPING TITLE HOOK ───────────────────────────────────────────────────────
const TITLES = [
  "trabalham por você",
  "escalam sem limites",
  "vendem enquanto dorme",
  "automatizam tudo",
];

function useTypingTitle() {
  const [titleIdx, setTitleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TITLES[titleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setTitleIdx((i) => (i + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, titleIdx]);

  return displayed;
}

// ─── COUNTER HOOK ────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1500, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

// ─── INTERSECTION OBSERVER HOOK ──────────────────────────────────────────────
function useInView(threshold = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold, rootMargin: "0px 0px -30px 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── GLOW ORB ────────────────────────────────────────────────────────────────
function GlowOrb({ style }: { style: React.CSSProperties }) {
  return <div style={{ position: "absolute", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", ...style }} />;
}

// ─── TERMINAL ────────────────────────────────────────────────────────────────
function TerminalSection() {
  const lines = useTypewriter(TERMINAL_LINES);
  const [blink, setBlink] = useState(true);
  useEffect(() => { const t = setInterval(() => setBlink(b => !b), 500); return () => clearInterval(t); }, []);

  return (
    <div style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(0,255,240,0.15)", borderRadius: "12px", padding: "28px 32px", fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", lineHeight: "1.9", boxShadow: "0 0 40px rgba(0,255,240,0.06)", backdropFilter: "blur(12px)", maxWidth: "560px", width: "100%" }}>
      <div style={{ display: "flex", gap: "7px", marginBottom: "20px" }}>
        {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />)}
        <span style={{ color: "#666", fontSize: "12px", marginLeft: "8px" }}>arthur@dev ~ terminal</span>
      </div>
      {lines.map((line, i) => (
        <div key={i} style={{ color: line.color }}>
          {line.blink ? <span>{line.text}<span style={{ opacity: blink ? 1 : 0 }}>█</span></span> : line.text}
        </div>
      ))}
    </div>
  );
}

// ─── SERVICE CARD (fade-in on scroll) ────────────────────────────────────────
function ServiceCard({ icon: Icon, title, desc, accent, delay = 0 }: { icon: any; title: string; desc: string; accent: string; delay?: number }) {
  const { ref, inView } = useInView(0);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? accent + "55" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px", padding: "32px 28px",
        transition: "all 0.3s ease",
        boxShadow: hov ? `0 0 30px ${accent}18` : "none",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform, background, border, box-shadow",
      }}>
      <div style={{ width: 48, height: 48, borderRadius: "12px", background: accent + "18", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", border: `1px solid ${accent}33` }}>
        <Icon size={22} color={accent} />
      </div>
      <h3 style={{ color: "#f0f0f0", fontSize: "17px", fontWeight: 700, marginBottom: "10px", fontFamily: "'Syne', sans-serif" }}>{title}</h3>
      <p style={{ color: "#888", fontSize: "14px", lineHeight: "1.7" }}>{desc}</p>
    </div>
  );
}

// ─── PROJECT CARD (hover 3D) ──────────────────────────────────────────────────
function ProjectCard({ title, desc, tags, link }: { title: string; desc: string; tags: string[]; link: string }) {
  const { ref, inView } = useInView(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "28px", transition: "transform 0.15s ease, box-shadow 0.3s ease", cursor: "default", willChange: "transform" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <h3 style={{ color: "#f0f0f0", fontSize: "16px", fontWeight: 700, fontFamily: "'Syne', sans-serif" }}>{title}</h3>
          <a href={link} target="_blank" rel="noreferrer" style={{ color: "#666" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
            onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
            <ExternalLink size={16} />
          </a>
        </div>
        <p style={{ color: "#777", fontSize: "13px", lineHeight: "1.7", marginBottom: "18px" }}>{desc}</p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tags.map(tag => (
            <span key={tag} style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)", borderRadius: "6px", padding: "3px 10px", fontSize: "11px", color: "#a78bfa", fontFamily: "monospace" }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── TIMELINE TECH STACK ─────────────────────────────────────────────────────
const STACK_ITEMS = [
  { label: "Automação & Integração", techs: ["n8n", "Make", "Webhooks", "REST APIs"], color: "#00fff0" },
  { label: "IA & LLMs",              techs: ["Claude API", "OpenAI", "Langchain"],    color: "#a78bfa" },
  { label: "Backend & Deploy",       techs: ["Python", "Node.js", "Next.js", "Vercel"], color: "#00fff0" },
];

function TechTimeline() {
  const { ref, inView } = useInView(0);
  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: "24px" }}>
      {/* vertical line */}
      <div style={{ position: "absolute", left: 0, top: 8, bottom: 8, width: "2px", background: "rgba(0,255,240,0.15)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ width: "100%", background: "linear-gradient(to bottom, #00fff0, #a78bfa)", height: inView ? "100%" : "0%", transition: "height 1.2s ease" }} />
      </div>

      {STACK_ITEMS.map(({ label, techs, color }, i) => (
        <div key={label} style={{ marginBottom: "28px", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)", transition: `opacity 0.5s ease ${i * 200}ms, transform 0.5s ease ${i * 200}ms` }}>
          {/* dot */}
          <div style={{ position: "absolute", left: "-5px", width: "12px", height: "12px", borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}`, marginTop: "4px" }} />
          <div style={{ color: "#555", fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: "8px" }}>{label}</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
            {techs.map(t => (
              <span key={t} style={{ background: `${color}10`, border: `1px solid ${color}25`, borderRadius: "6px", padding: "4px 12px", fontSize: "12px", color: color === "#00fff0" ? "#a0e0de" : "#c4b5fd", fontFamily: "monospace" }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const typingTitle = useTypingTitle();
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  const c1 = useCounter(10, 1200, statsVisible);
  const c2 = useCounter(100, 1500, statsVisible);
  const c3 = useCounter(3, 800, statsVisible);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsVisible(true); obs.disconnect(); } }, { threshold: 0 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        @keyframes pulse-ring { 0%{transform:scale(.95);box-shadow:0 0 0 0 rgba(0,255,240,.4)} 70%{transform:scale(1);box-shadow:0 0 0 12px rgba(0,255,240,0)} 100%{transform:scale(.95);box-shadow:0 0 0 0 rgba(0,255,240,0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes waPulse { 0%,100%{box-shadow:0 0 20px rgba(0,255,240,.25)} 50%{box-shadow:0 0 40px rgba(0,255,240,.5)} }
        .fade-up{animation:fadeUp .7s ease forwards;opacity:0}
        .delay-1{animation-delay:.1s}.delay-2{animation-delay:.25s}.delay-3{animation-delay:.4s}.delay-4{animation-delay:.55s}.delay-5{animation-delay:.7s}
        .float{animation:float 4s ease-in-out infinite}
        .cta-btn{transition:all .25s ease!important;animation:waPulse 2s ease-in-out infinite}
        .cta-btn:hover{transform:translateY(-2px)!important}
        .nav-link{transition:color .2s;color:#666;text-decoration:none;font-size:14px}
        .nav-link:hover{color:#00fff0}
        @media(max-width:768px){.hero-grid{flex-direction:column!important;text-align:center}.hero-photo{width:220px!important;height:220px!important;margin:0 auto}.services-grid{grid-template-columns:1fr!important}.projects-grid{grid-template-columns:1fr!important}.hero-title{font-size:38px!important}.hero-buttons{justify-content:center!important}.stats-row{justify-content:center!important}}
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#050505", color: "#d4d4d4", minHeight: "100vh", overflowX: "hidden" }}>

        {/* ── NAV ── */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "18px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(5,5,5,0.9)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all .3s ease" }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "18px", color: "#fff" }}>arthur<span style={{ color: "#00fff0" }}>.dev</span></span>
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {[["#servicos","Serviços"],["#projetos","Projetos"],["#contato","Contato"]].map(([href, label]) => (
              <a key={href} href={href} className="nav-link">{label}</a>
            ))}
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px", overflow: "hidden" }}>
          <GlowOrb style={{ width: 500, height: 500, background: "rgba(0,255,240,0.06)", top: -100, right: -100 }} />
          <GlowOrb style={{ width: 400, height: 400, background: "rgba(167,139,250,0.07)", bottom: 0, left: -150 }} />
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="hero-grid" style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "64px", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <div style={{ flex: 1 }}>
              {/* badge */}
              <div className="fade-up delay-1" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,255,240,0.08)", border: "1px solid rgba(0,255,240,0.2)", borderRadius: "100px", padding: "6px 14px", marginBottom: "28px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00fff0", animation: "pulse-ring 1.8s ease infinite" }} />
                <span style={{ color: "#00fff0", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em" }}>DISPONÍVEL PARA PROJETOS</span>
              </div>

              {/* title com typing */}
              <h1 className="fade-up delay-2 hero-title" style={{ fontFamily: "'Syne',sans-serif", fontSize: "52px", fontWeight: 900, lineHeight: 1.1, color: "#fff", marginBottom: "20px" }}>
                Sistemas que<br />
                <span style={{ background: "linear-gradient(90deg,#00fff0,#a78bfa,#00fff0)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>
                  {typingTitle}<span style={{ WebkitTextFillColor: "#00fff0", opacity: 0.7 }}>|</span>
                </span>
              </h1>

              <p className="fade-up delay-3" style={{ color: "#888", fontSize: "16px", lineHeight: "1.75", maxWidth: "480px", marginBottom: "36px" }}>
                Automação backend, assistentes de IA e landing pages de alta conversão. Transformo processos manuais em sistemas inteligentes que escalam.
              </p>

              <div className="fade-up delay-4 hero-buttons" style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#00fff0", color: "#050505", padding: "13px 26px", borderRadius: "10px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                  <MessageCircle size={16} /> Falar no WhatsApp
                </a>
                <a href="#projetos" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.05)", color: "#d4d4d4", border: "1px solid rgba(255,255,255,0.1)", padding: "13px 26px", borderRadius: "10px", fontWeight: 500, fontSize: "14px", textDecoration: "none", transition: "all .25s ease" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}>
                  Ver Projetos <ArrowRight size={15} />
                </a>
              </div>

              {/* stats com contador */}
              <div ref={statsRef} className="fade-up delay-5 stats-row" style={{ display: "flex", gap: "32px", marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { value: `${c1}+`, label: "Projetos entregues" },
                  { value: `${c2}%`,  label: "Clientes satisfeitos" },
                  { value: `${c3}x`,  label: "Eficiência média" },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "24px", fontWeight: 900, color: "#fff" }}>{value}</div>
                    <div style={{ fontSize: "12px", color: "#666", marginTop: "2px" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* foto */}
            <div className="float" style={{ flexShrink: 0 }}>
              <div className="hero-photo" style={{ width: 320, height: 320, borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(0,255,240,0.15)", boxShadow: "0 0 60px rgba(0,255,240,0.1), 0 0 120px rgba(167,139,250,0.08)", position: "relative" }}>
                <img src={PHOTO_URL} alt="Arthur do Vale" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,5,5,0.5) 0%,transparent 60%)" }} />
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVIÇOS ── */}
        <section id="servicos" style={{ padding: "100px 40px", position: "relative" }}>
          <GlowOrb style={{ width: 400, height: 400, background: "rgba(167,139,250,0.05)", top: 0, left: "50%", transform: "translateX(-50%)" }} />
          <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>O que eu faço</span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "40px", fontWeight: 900, color: "#fff", marginTop: "12px" }}>Serviços</h2>
            </div>
            <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
              <ServiceCard icon={Workflow} title="Automação Backend" accent="#00fff0" delay={0}
                desc="Fluxos inteligentes com n8n e Make que eliminam tarefas repetitivas, integram APIs e escalam sem aumentar sua equipe." />
              <ServiceCard icon={Bot} title="Assistentes de IA" accent="#a78bfa" delay={150}
                desc="Chatbots e agentes com Claude/OpenAI que qualificam leads, respondem clientes 24h e executam ações no seu sistema." />
              <ServiceCard icon={Globe} title="Landing Pages" accent="#00fff0" delay={300}
                desc="Interfaces de alta conversão com design moderno, animações e integração com funis de vendas e ferramentas de pagamento." />
            </div>
          </div>
        </section>

        {/* ── TERMINAL + TECH TIMELINE ── */}
        <section style={{ padding: "80px 40px", background: "rgba(255,255,255,0.01)", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "80px", flexWrap: "wrap" }}>
            <TerminalSection />
            <div style={{ flex: 1, minWidth: "280px" }}>
              <span style={{ color: "#00fff0", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Tech Stack</span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "36px", fontWeight: 900, color: "#fff", margin: "12px 0 20px" }}>Ferramentas que domino</h2>
              <p style={{ color: "#777", fontSize: "14px", lineHeight: "1.8", marginBottom: "32px" }}>
                Stack selecionado para entregar automações robustas, integrações de IA e interfaces de alta performance.
              </p>
              <TechTimeline />
            </div>
          </div>
        </section>

        {/* ── PROJETOS ── */}
        <section id="projetos" style={{ padding: "100px 40px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <span style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>Portfólio</span>
              <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "40px", fontWeight: 900, color: "#fff", marginTop: "12px" }}>Projetos recentes</h2>
            </div>
            <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }}>
              {PROJECTS.map(p => <ProjectCard key={p.title} {...p} />)}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section id="contato" style={{ padding: "100px 40px", position: "relative", overflow: "hidden" }}>
          <GlowOrb style={{ width: 600, height: 300, background: "rgba(0,255,240,0.05)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
          <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div style={{ width: 64, height: 64, borderRadius: "16px", background: "rgba(0,255,240,0.1)", border: "1px solid rgba(0,255,240,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
              <MessageCircle size={28} color="#00fff0" />
            </div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "44px", fontWeight: 900, color: "#fff", marginBottom: "16px", lineHeight: 1.15 }}>Pronto para automatizar?</h2>
            <p style={{ color: "#777", fontSize: "16px", lineHeight: "1.7", marginBottom: "40px" }}>
              Me conta seu projeto e vamos construir algo que trabalha por você — 24 horas por dia, 7 dias por semana.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#00fff0", color: "#050505", padding: "16px 36px", borderRadius: "12px", fontWeight: 800, fontSize: "15px", textDecoration: "none", fontFamily: "'Syne',sans-serif" }}>
                <MessageCircle size={18} /> WhatsApp <ChevronRight size={16} />
              </a>
              <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.3)", padding: "16px 36px", borderRadius: "12px", fontWeight: 700, fontSize: "15px", textDecoration: "none", transition: "all .25s ease", fontFamily: "'Syne',sans-serif" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.2)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.1)"; }}>
                <Instagram size={18} /> Instagram
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "32px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#fff" }}>arthur<span style={{ color: "#00fff0" }}>.dev</span></span>
          <span style={{ color: "#444", fontSize: "13px" }}>© 2026 Arthur do Vale Junqueira</span>
          <div style={{ display: "flex", gap: "16px" }}>
            {[
              { href: GITHUB_LINK, icon: Github, hover: "#00fff0" },
              { href: LINKEDIN_LINK, icon: Linkedin, hover: "#a78bfa" },
              { href: INSTAGRAM_LINK, icon: Instagram, hover: "#f472b6" },
              { href: WHATSAPP_LINK, icon: MessageCircle, hover: "#00fff0" },
            ].map(({ href, icon: Icon, hover }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer" style={{ color: "#555", transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = hover)}
                onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </>
  );
}