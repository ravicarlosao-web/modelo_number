import { useEffect, useRef, useState } from "react";
import { Link, Route, Switch, Router as WouterRouter } from "wouter";

// CountUp Component for Section 4
function CountUp({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* SECTION 1 — FIXED HEADER */}
      <header
        className={`fixed top-0 w-full h-[70px] bg-white border-b border-[#E5E7EB] z-[1000] transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* LEFT: Logo */}
          <div className="flex items-center">
            <img src="/gasosa-logo.png" alt="Gasosa Auto Agro" className="h-10 w-auto" />
          </div>

          {/* CENTER: Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] uppercase tracking-[1px] font-medium text-[#1A1A2E]">
            <a href="#quem-somos" className="hover:text-[#003DA5] transition-colors">QUEM SOMOS</a>
            <a href="#sectores" className="hover:text-[#003DA5] transition-colors flex items-center gap-1">SECTORES ▾</a>
            <a href="#infraestruturas" className="hover:text-[#003DA5] transition-colors">INFRAESTRUTURAS</a>
            <a href="#parceiros" className="hover:text-[#003DA5] transition-colors">PARCEIROS</a>
            <a href="#contactos" className="hover:text-[#003DA5] transition-colors">CONTACTOS</a>
          </nav>

          {/* RIGHT: Language & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-1 text-[13px] font-medium text-[#1A1A2E] hover:text-[#003DA5]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              PT ▾
            </button>
            <button 
              className="md:hidden p-2 text-[#1A1A2E]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-white border-b border-[#E5E7EB] shadow-lg flex flex-col p-4 md:hidden">
            <a href="#quem-somos" className="py-3 text-[13px] uppercase tracking-[1px] font-medium text-[#1A1A2E] border-b border-[#E5E7EB]">QUEM SOMOS</a>
            <a href="#sectores" className="py-3 text-[13px] uppercase tracking-[1px] font-medium text-[#1A1A2E] border-b border-[#E5E7EB]">SECTORES</a>
            <a href="#infraestruturas" className="py-3 text-[13px] uppercase tracking-[1px] font-medium text-[#1A1A2E] border-b border-[#E5E7EB]">INFRAESTRUTURAS</a>
            <a href="#parceiros" className="py-3 text-[13px] uppercase tracking-[1px] font-medium text-[#1A1A2E] border-b border-[#E5E7EB]">PARCEIROS</a>
            <a href="#contactos" className="py-3 text-[13px] uppercase tracking-[1px] font-medium text-[#1A1A2E]">CONTACTOS</a>
          </div>
        )}
      </header>

      {/* SECTION 2 — HERO BANNER */}
      <section className="w-full bg-white relative overflow-hidden" style={{ minHeight: "90vh", paddingTop: "70px" }}>
        <div className="max-w-7xl mx-auto w-full px-8 flex flex-col items-center justify-center text-center" style={{ minHeight: "calc(90vh - 70px)" }}>
          {/* CENTER CONTENT */}
          <div className="w-full flex flex-col items-center z-10 py-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-6 h-[2px] bg-[#003DA5]"></div>
              <span className="text-[12px] uppercase text-[#003DA5] font-bold tracking-wider">SOLUÇÕES INDUSTRIAIS E AGRÍCOLAS</span>
            </div>
            
            <h1 className="font-['Poppins'] text-[52px] md:text-[72px] font-bold leading-[1.1] text-[#1A1A2E] mb-6">
              Referência angolana<br/>
              no sector <span className="text-[#0057D8]">automóvel</span><br/>
              e <span className="text-[#0057D8]">agrícola.</span>
            </h1>
            
            <p className="text-[18px] text-[#6B7280] max-w-[700px] mb-8">
              Qualidade e confiança para quem impulsiona Angola — nos campos, nas estradas e nas indústrias.
            </p>
            
            <div className="w-[40px] h-[2px] bg-[#003DA5] mb-8"></div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
              <button className="bg-[#003DA5] text-white px-7 py-[14px] rounded-[4px] font-bold text-[14px] hover:scale-105 transition-transform duration-300">
                SOLICITAR COTAÇÃO →
              </button>
              <button className="border-2 border-[#003DA5] text-[#003DA5] px-7 py-[14px] rounded-[4px] font-bold text-[14px] hover:scale-105 transition-transform duration-300">
                CONHECER SECTORES →
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 items-center justify-center w-full">
              <div className="flex items-center gap-3 flex-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-[12px] text-[#1A1A2E]">QUALIDADE CERTIFICADA</span>
                  <span className="text-[11px] text-[#6B7280] leading-tight mt-0.5">Produtos certificados e<br/>parceiros globais.</span>
                </div>
              </div>
              <div className="hidden sm:block w-[1px] h-[40px] bg-[#E5E7EB] mx-4"></div>
              <div className="flex items-center gap-3 flex-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-[12px] text-[#1A1A2E]">APOIO ESPECIALIZADO</span>
                  <span className="text-[11px] text-[#6B7280] leading-tight mt-0.5">Equipa técnica pronta<br/>para apoiar.</span>
                </div>
              </div>
              <div className="hidden sm:block w-[1px] h-[40px] bg-[#E5E7EB] mx-4"></div>
              <div className="flex items-center gap-3 flex-1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-[12px] text-[#1A1A2E]">ENTREGA EFICIENTE</span>
                  <span className="text-[11px] text-[#6B7280] leading-tight mt-0.5">Logística ágil e segura<br/>em todo o país.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3 — SOLUÇÕES POR INDÚSTRIA */}
      <section id="sectores" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[12px] uppercase text-[#003DA5] font-bold tracking-wider">OS NOSSOS SECTORES</span>
            <h2 className="font-['Poppins'] text-[32px] md:text-[36px] font-bold text-[#1A1A2E] mt-3">
              Soluções completas para diferentes indústrias
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 1 */}
            <div className="group bg-white border border-[#E5E7EB] rounded-[12px] p-6 cursor-pointer hover:border-[#003DA5] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
              <svg className="mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
              </svg>
              <h3 className="font-bold text-[18px] text-[#1A1A2E] mb-2">Automóvel</h3>
              <p className="text-[14px] text-[#6B7280] mb-8 flex-1">Peças, acessórios e soluções para veículos leves e pesados.</p>
              <div className="mt-auto flex items-end justify-between">
                <span className="text-[#003DA5] font-bold">→</span>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
                  <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
                </svg>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white border border-[#E5E7EB] rounded-[12px] p-6 cursor-pointer hover:border-[#003DA5] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
              <svg className="mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
              <h3 className="font-bold text-[18px] text-[#1A1A2E] mb-2">Agrícola</h3>
              <p className="text-[14px] text-[#6B7280] mb-8 flex-1">Equipamentos, máquinas e insumos para o sector agrícola.</p>
              <div className="mt-auto flex items-end justify-between">
                <span className="text-[#003DA5] font-bold">→</span>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1">
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
                </svg>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white border border-[#E5E7EB] rounded-[12px] p-6 cursor-pointer hover:border-[#003DA5] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
              <svg className="mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <h3 className="font-bold text-[18px] text-[#1A1A2E] mb-2">Importação</h3>
              <p className="text-[14px] text-[#6B7280] mb-8 flex-1">Sourcing global e logística internacional com eficiência e segurança.</p>
              <div className="mt-auto flex items-end justify-between">
                <span className="text-[#003DA5] font-bold">→</span>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white border border-[#E5E7EB] rounded-[12px] p-6 cursor-pointer hover:border-[#003DA5] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
              <svg className="mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <h3 className="font-bold text-[18px] text-[#1A1A2E] mb-2">Equipamentos</h3>
              <p className="text-[14px] text-[#6B7280] mb-8 flex-1">Soluções industriais e equipamentos para diversos sectores.</p>
              <div className="mt-auto flex items-end justify-between">
                <span className="text-[#003DA5] font-bold">→</span>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group bg-white border border-[#E5E7EB] rounded-[12px] p-6 cursor-pointer hover:border-[#003DA5] hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col">
              <svg className="mb-4" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <h3 className="font-bold text-[18px] text-[#1A1A2E] mb-2">Logística</h3>
              <p className="text-[14px] text-[#6B7280] mb-8 flex-1">Armazenagem, distribuição e transporte com cobertura nacional.</p>
              <div className="mt-auto flex items-end justify-between">
                <span className="text-[#003DA5] font-bold">→</span>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — NÚMEROS E CREDENCIAIS */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <svg className="mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <div className="font-['Poppins'] text-[40px] font-bold text-[#1A1A2E] mb-1">
                +<CountUp end={15} />
              </div>
              <span className="font-bold text-[14px] uppercase text-[#1A1A2E] tracking-wider mb-2">ANOS DE EXPERIÊNCIA</span>
              <p className="text-[13px] text-[#6B7280]">No mercado angolano</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <svg className="mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                <path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>
              </svg>
              <div className="font-['Poppins'] text-[40px] font-bold text-[#1A1A2E] mb-1">
                +<CountUp end={500} />
              </div>
              <span className="font-bold text-[14px] uppercase text-[#1A1A2E] tracking-wider mb-2">CLIENTES</span>
              <p className="text-[13px] text-[#6B7280]">Empresas que confiam nas nossas soluções</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <svg className="mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div className="font-['Poppins'] text-[40px] font-bold text-[#1A1A2E] mb-1">
                +<CountUp end={18} />
              </div>
              <span className="font-bold text-[14px] uppercase text-[#1A1A2E] tracking-wider mb-2">PROVÍNCIAS</span>
              <p className="text-[13px] text-[#6B7280]">Presença e cobertura em todo o país.</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <svg className="mb-4" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              <div className="font-['Poppins'] text-[40px] font-bold text-[#1A1A2E] mb-1">
                +<CountUp end={2000} duration={2000} />
              </div>
              <span className="font-bold text-[14px] uppercase text-[#1A1A2E] tracking-wider mb-2">PRODUTOS</span>
              <p className="text-[13px] text-[#6B7280]">Portfólio completo para diversos sectores</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — INFRAESTRUTURAS */}
      <section id="infraestruturas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[12px] uppercase text-[#003DA5] font-bold tracking-wider">INFRAESTRUTURAS</span>
            <h2 className="font-['Poppins'] text-[32px] md:text-[36px] font-bold text-[#1A1A2E] mt-3">
              Estrutura sólida para entregar mais valor
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Armazéns Modernos",
                desc: "Espaços amplos e seguros para armazenagem de produtos."
              },
              {
                title: "Oficinas Especializadas",
                desc: "Serviços técnicos com profissionais qualificados e tecnologia avançada."
              },
              {
                title: "Frota Própria",
                desc: "Transporte eficiente para garantir entrega rápida e segura."
              },
              {
                title: "Presença Nacional",
                desc: "Estratégia de expansão contínua para estar mais perto de si."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#F5F7FA] rounded-[12px] overflow-hidden flex flex-col">
                <div className="h-[180px] w-full bg-[#F5F7FA] relative border-b border-[#E5E7EB]">
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="#D1D5DB" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="#D1D5DB" strokeWidth="1" />
                  </svg>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-bold text-[16px] text-[#1A1A2E] mb-2">{item.title}</h3>
                  <p className="text-[14px] text-[#6B7280]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — PARCEIROS / MARCAS */}
      <section id="parceiros" className="py-16 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[12px] uppercase text-[#003DA5] font-bold tracking-wider">PARCEIROS QUE CONFIAM EM NÓS</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="w-[150px] h-[60px] bg-[#F0F0F0] rounded-[8px] flex items-center justify-center border border-transparent hover:border-[#003DA5] transition-colors cursor-pointer">
                <span className="text-[#9CA3AF] text-sm font-bold">LOGO {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — CHAMADA FINAL CTA */}
      <section className="bg-[#003DA5] py-[60px] w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-6 w-full md:w-[70%] mb-8 md:mb-0">
            <svg className="hidden sm:block flex-shrink-0" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <div>
              <h2 className="font-['Poppins'] text-[24px] md:text-[28px] font-bold text-white mb-2 leading-tight">
                Vamos encontrar a solução ideal para o seu negócio.
              </h2>
              <p className="text-[16px] text-white opacity-85">
                A nossa equipa está pronta para apresentar a melhor solução para si.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-[30%] flex md:justify-end">
            <button className="w-full md:w-auto bg-white text-[#003DA5] px-8 py-[16px] rounded-[4px] font-bold text-[14px] hover:bg-[#E8F0FF] transition-colors whitespace-nowrap">
              FALAR COM A NOSSA EQUIPA →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FOOTER */}
      <footer className="bg-[#1A1A2E] pt-[60px] pb-[40px]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* COL 1 — Brand */}
            <div className="flex flex-col">
              <div className="flex items-center mb-4">
                <img src="/gasosa-logo.png" alt="Gasosa Auto Agro" className="h-9 w-auto brightness-0 invert" />
              </div>
              <p className="text-[13px] text-gray-400 mb-6">Soluções industriais e agrícolas</p>
              <div className="flex items-center gap-3">
                {[
                  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
                  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                  <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                ].map((icon, i) => (
                  <div key={i} className="w-[32px] h-[32px] rounded-full border border-gray-600 flex items-center justify-center text-white hover:border-white transition-colors cursor-pointer">
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            {/* COL 2 — LINKS RÁPIDOS */}
            <div className="flex flex-col">
              <h4 className="font-bold text-white text-[14px] mb-4">LINKS RÁPIDOS</h4>
              <nav className="flex flex-col gap-3 text-[14px] text-gray-400">
                <a href="#quem-somos" className="hover:text-white transition-colors">Quem Somos</a>
                <a href="#sectores" className="hover:text-white transition-colors">Sectores</a>
                <a href="#infraestruturas" className="hover:text-white transition-colors">Infraestruturas</a>
                <a href="#parceiros" className="hover:text-white transition-colors">Parceiros</a>
                <a href="#contactos" className="hover:text-white transition-colors">Contactos</a>
              </nav>
            </div>

            {/* COL 3 — SECTORES */}
            <div className="flex flex-col">
              <h4 className="font-bold text-white text-[14px] mb-4">SECTORES</h4>
              <nav className="flex flex-col gap-3 text-[14px] text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Automóvel</a>
                <a href="#" className="hover:text-white transition-colors">Agrícola</a>
                <a href="#" className="hover:text-white transition-colors">Importação</a>
                <a href="#" className="hover:text-white transition-colors">Equipamentos</a>
                <a href="#" className="hover:text-white transition-colors">Logística</a>
              </nav>
            </div>

            {/* COL 4 — CONTACTOS */}
            <div id="contactos" className="flex flex-col">
              <h4 className="font-bold text-white text-[14px] mb-4">CONTACTOS</h4>
              <div className="flex flex-col gap-4 text-[14px] text-gray-400">
                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+244 000 000 000</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  <span>+244 000 000 000</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <span>info@gasosa.ao</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>Luanda, Angola</span>
                </div>
              </div>
            </div>

            {/* COL 5 — NEWSLETTER */}
            <div className="flex flex-col">
              <h4 className="font-bold text-white text-[14px] mb-4">NEWSLETTER</h4>
              <p className="text-[13px] text-gray-400 mb-4">
                Subscreva para receber novidades e informações da Gasosa Auto Agro.
              </p>
              <div className="flex w-full">
                <input 
                  type="email" 
                  placeholder="O seu email" 
                  className="w-full bg-[#2A2A3E] border border-gray-600 text-white px-4 py-2 text-[14px] rounded-l-[4px] outline-none focus:border-[#003DA5]"
                />
                <button className="bg-[#003DA5] px-4 py-2 rounded-r-[4px] flex items-center justify-center hover:bg-[#1A6FFF] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-[20px] border-t border-[#333] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[13px] text-gray-400 text-center md:text-left">
              © 2024 Gasosa Auto Agro. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4 text-[13px] text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route>
        <div className="min-h-screen flex items-center justify-center">404 - Not Found</div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
