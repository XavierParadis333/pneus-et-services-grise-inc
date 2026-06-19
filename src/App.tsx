import { useEffect, useRef, useState } from "react";
import {
  Phone,
  ArrowRight,
  ArrowUpRight,
  Check,
  Disc3,
  Gauge,
  Wrench,
  Car,
  Clock,
  MapPin,
  ShieldCheck,
  Cog,
} from "lucide-react";

const PHONE_DISPLAY = "450-653-2224";
const PHONE_TEL = "4506532224";
const ADDRESS = "1450 Rue de Montarville, Saint-Bruno-de-Montarville, QC J3V 3T5";

function ImageWithFade({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#181c26,#0f1117)" }}>
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        loading={eager ? "eager" : "lazy"}
        // @ts-ignore
        fetchpriority={eager ? "high" : undefined}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease" }}
      />
    </div>
  );
}

export default function App() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="site-wrapper">
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,57,70,0.18), transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="#top" className="nav-logo">
            <span className="logo-main">Pneus &amp; Services</span>
            <span className="logo-accent">Grisé</span>
          </a>
          <ul className="nav-links">
            <li><a className="nav-link" href="#services">Services</a></li>
            <li><a className="nav-link" href="#apropos">À propos</a></li>
            <li><a className="nav-link" href="#contact">Contact</a></li>
          </ul>
          <a className="btn-nav-cta" href={`tel:${PHONE_TEL}`}>
            <Phone size={15} /> {PHONE_DISPLAY}
          </a>
          <button className="nav-hamburger" aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="hero-bg">
          <ImageWithFade src="/images/hero.webp" alt="Atelier de mécanique générale" className="hero-img" eager />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <span className="hero-badge"><Wrench size={13} /> Garage de mécanique générale · St-Bruno</span>
          <h1 className="hero-title">
            Votre voiture entre
            <span className="hero-br" />
            de <span className="hero-title-accent">bonnes mains</span>
          </h1>
          <p className="hero-sub">
            Vente et installation de pneus, freins, alignement, suspension et mécanique
            générale. Un service honnête et fiable, exécuté par des mécaniciens d&apos;expérience.
          </p>
          <a className="hero-phone" href={`tel:${PHONE_TEL}`}>
            <Phone size={26} /> {PHONE_DISPLAY}
          </a>
          <div className="hero-actions">
            <a className="btn-primary" href="#contact">Prendre rendez-vous</a>
            <a className="btn-ghost" href="#services">Nos services <ArrowRight size={16} /></a>
          </div>
        </div>
        <div className="hero-scroll-indicator"><div className="scroll-line" /></div>
      </header>

      {/* STATS BAND */}
      <section className="stats-band">
        <div className="stats-inner">
          <div className="stat-item">
            <span className="stat-number">7<span className="stat-plus">+</span></span>
            <span className="stat-label">Services spécialisés</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">100<span className="stat-plus">%</span></span>
            <span className="stat-label">Mécanique générale</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">6<span className="stat-plus">j</span></span>
            <span className="stat-label">Ouvert / semaine</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-number">St-Bruno</span>
            <span className="stat-label">Montarville</span>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-section" id="services">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-eyebrow">Nos services</span>
            <h2 className="section-title">
              Tout pour garder votre véhicule <span className="title-accent">en santé</span>
            </h2>
          </div>
          <div className="services-grid">
            {/* Card 1 */}
            <article className="service-card">
              <div className="service-img-wrap">
                <ImageWithFade src="/images/service-tires.webp" alt="Pneus et installation" className="service-img" />
                <div className="service-img-overlay" />
              </div>
              <div className="service-body">
                <div className="service-icon-wrap"><Disc3 size={20} /></div>
                <h3 className="service-title">Pneus &amp; installation</h3>
                <p className="service-desc">
                  Vente, installation et balancement de pneus toutes saisons et d&apos;hiver,
                  avec entreposage et conseils adaptés à votre véhicule.
                </p>
                <ul className="service-list">
                  <li><Check size={14} /> Vente &amp; pose de pneus</li>
                  <li><Check size={14} /> Balancement &amp; valves</li>
                  <li><Check size={14} /> Alignement des roues</li>
                </ul>
                <a className="service-link" href="#contact">En savoir plus <ArrowUpRight size={14} /></a>
              </div>
            </article>

            {/* Card 2 — featured */}
            <article className="service-card service-card--featured">
              <div className="service-img-wrap">
                <ImageWithFade src="/images/service-brakes.webp" alt="Réparation de freins" className="service-img" />
                <div className="service-img-overlay" />
              </div>
              <div className="service-body">
                <div className="service-icon-wrap service-icon-wrap--accent"><ShieldCheck size={20} /></div>
                <h3 className="service-title">Freins &amp; sécurité</h3>
                <p className="service-desc">
                  Inspection, réparation et remplacement complet du système de freinage
                  pour rouler en toute confiance, en toutes saisons.
                </p>
                <ul className="service-list">
                  <li><Check size={14} /> Réparation des freins</li>
                  <li><Check size={14} /> Suspension &amp; direction</li>
                  <li><Check size={14} /> Silencieux &amp; échappement</li>
                </ul>
                <a className="service-link service-link--accent" href="#contact">En savoir plus <ArrowUpRight size={14} /></a>
              </div>
            </article>

            {/* Card 3 */}
            <article className="service-card">
              <div className="service-img-wrap">
                <ImageWithFade src="/images/service-alignment.webp" alt="Entretien et mécanique générale" className="service-img" />
                <div className="service-img-overlay" />
              </div>
              <div className="service-body">
                <div className="service-icon-wrap"><Cog size={20} /></div>
                <h3 className="service-title">Entretien &amp; mécanique</h3>
                <p className="service-desc">
                  Vidanges d&apos;huile, service d&apos;injection et diagnostic complet :
                  un entretien préventif qui prolonge la vie de votre auto.
                </p>
                <ul className="service-list">
                  <li><Check size={14} /> Vidange d&apos;huile</li>
                  <li><Check size={14} /> Service d&apos;injection</li>
                  <li><Check size={14} /> Mécanique générale</li>
                </ul>
                <a className="service-link" href="#contact">En savoir plus <ArrowUpRight size={14} /></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WHY US / ABOUT */}
      <section className="why-section" id="apropos">
        <div className="why-inner">
          <div className="why-visual">
            <div style={{ position: "relative", height: 560 }}>
              <ImageWithFade src="/images/editorial.webp" alt="Mécanicien au travail" className="why-img" />
            </div>
            <div className="why-badge-float">
              <span className="why-badge-num">St-Bruno</span>
              <span className="why-badge-text">Votre garage<br />de quartier</span>
            </div>
          </div>
          <div className="why-content">
            <span className="section-eyebrow">À propos</span>
            <h2 className="section-title why-title">
              Un service <span className="title-accent">honnête</span>, sans surprise
            </h2>
            <p className="why-desc">
              Chez Pneus et Services Grisé Inc., on croit à une mécanique simple et
              transparente. De la vente de pneus à la réparation complète, chaque
              intervention est faite avec soin par une équipe qui connaît la valeur
              d&apos;un travail bien fait — et d&apos;un client qui revient.
            </p>
            <div className="why-pillars">
              <div className="pillar">
                <div className="pillar-icon"><Gauge size={18} /></div>
                <div>
                  <div className="pillar-title">Diagnostic précis</div>
                  <div className="pillar-desc">On cible le vrai problème avant de toucher à quoi que ce soit.</div>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon"><Wrench size={18} /></div>
                <div>
                  <div className="pillar-title">Mécanique complète</div>
                  <div className="pillar-desc">Pneus, freins, suspension, échappement et entretien sous un même toit.</div>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon"><Car size={18} /></div>
                <div>
                  <div className="pillar-title">Service de proximité</div>
                  <div className="pillar-desc">Un garage de quartier au service des automobilistes de St-Bruno.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
        <div className="cta-bg">
          <ImageWithFade src="/images/cta.webp" alt="Véhicule au garage" className="cta-img" />
          <div className="cta-overlay" />
        </div>
        <div className="cta-content">
          <span className="cta-offer-badge"><Clock size={14} /> <strong>Ouvert 6 jours</strong> — Lun au sam</span>
          <h2 className="cta-title">
            Besoin d&apos;un rendez-vous? <span className="cta-title-accent">Appelez-nous</span>
          </h2>
          <p className="cta-sub">
            Pneus, freins, alignement ou simple vidange : passez nous voir au {ADDRESS.split(",")[0]} ou
            réservez votre plage horaire par téléphone. On s&apos;occupe du reste.
          </p>
          <div className="cta-actions">
            <a className="btn-cta-main" href={`tel:${PHONE_TEL}`}>
              <Phone size={17} /> {PHONE_DISPLAY}
            </a>
            <a className="btn-cta-phone" href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Voir l&apos;itinéraire
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <span className="logo-main">Pneus &amp; Services</span>
              <span className="logo-accent">Grisé</span>
            </div>
            <p className="footer-tagline">
              Garage de mécanique générale au service des automobilistes de
              Saint-Bruno-de-Montarville.
            </p>
            <div className="footer-contact">
              <a className="footer-phone" href={`tel:${PHONE_TEL}`}><Phone size={17} /> {PHONE_DISPLAY}</a>
              <span className="footer-location"><MapPin size={15} /> {ADDRESS}</span>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="#services">Pneus &amp; installation</a></li>
              <li><a href="#services">Alignement des roues</a></li>
              <li><a href="#services">Freins &amp; suspension</a></li>
              <li><a href="#services">Silencieux</a></li>
              <li><a href="#services">Vidange &amp; injection</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#top">Accueil</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#apropos">À propos</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Heures</h4>
            <ul className="footer-links">
              <li><span className="footer-hours"><Clock size={14} /> Lun – Ven : 8h à 17h</span></li>
              <li><span className="footer-hours"><Clock size={14} /> Samedi : 8h à 12h</span></li>
              <li><span className="footer-hours"><Clock size={14} /> Dimanche : fermé</span></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Pneus et Services Grisé Inc. Tous droits réservés.</span>
          <div className="footer-legal">
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <a href="#top">Retour en haut</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
