import { Phone, ArrowUpRight, ArrowRight, Check, MapPin, Clock, Calendar } from "lucide-react";

const PHONE_DISPLAY = "450-653-2224";
const PHONE_TEL = "4506532224";
const ADDRESS = "1450 Rue de Montarville, Saint-Bruno-de-Montarville, QC J3V 3T5";

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

const IMG = {
  hero: "photo-1676018366904-c083ed678e60",
  whyMain: "photo-1711386689622-1cda23e10217",
  whySub: "photo-1631720040176-0d789a643a78",
  cta: "photo-1619642751034-765dfdf7c58e",
};

const SERVICES = [
  { n: "01", t: "Pneus & installation", d: "Vente, pose, balancement et entreposage de pneus toutes saisons et d'hiver.", img: "photo-1599256872237-5dcc0fbe9668" },
  { n: "02", t: "Alignement des roues", d: "Géométrie de précision pour une tenue de route sûre et une usure égale des pneus.", img: "photo-1613214150132-9606e332d68e" },
  { n: "03", t: "Freins", d: "Inspection, plaquettes, disques et étriers — un freinage net en toutes saisons.", img: "photo-1637640125496-31852f042a60" },
  { n: "04", t: "Suspension & direction", d: "Amortisseurs, rotules et composants de direction pour un roulement stable.", img: "photo-1618783129985-dd97dbe4ad99" },
  { n: "05", t: "Silencieux & échappement", d: "Réparation et remplacement du système d'échappement et des silencieux.", img: "photo-1613214150333-53afb7561e6d" },
  { n: "06", t: "Vidange & injection", d: "Vidange d'huile, service d'injection et entretien préventif complet.", img: "photo-1619505372149-07875c35b313" },
];

export default function App() {
  return (
    <div className="site">
      {/* NAV */}
      <nav className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="logo">
            Pneu Grisé<small>Mécanique générale</small>
          </a>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#apropos">Atelier</a></li>
            <li><a href="#rdv">Rendez-vous</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <a className="nav-phone" href={`tel:${PHONE_TEL}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          <button className="nav-burger" aria-label="Menu"><span /><span /><span /></button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero" id="top">
        <div className="hero-bg">
          <img src={U(IMG.hero, 2000)} alt="Atelier de mécanique" loading="eager" fetchPriority="high" />
        </div>
        <div className="hero-grid-line" />
        <div className="wrap hero-content">
          <span className="kicker hero-kicker">Garage de mécanique générale · St-Bruno</span>
          <h1 className="display hero-title">
            Votre véhicule,<br />notre <span className="accent">expertise</span>
          </h1>
          <p className="hero-sub">
            Pneus, freins, alignement, suspension et mécanique générale.
            Un service honnête et fiable, exécuté par des mécaniciens d'expérience.
          </p>
          <div className="hero-actions">
            <a className="btn btn-red" href="#rdv"><Calendar size={16} /> Prendre rendez-vous</a>
            <a className="btn btn-ghost" href="#services">Nos services <ArrowRight size={16} /></a>
          </div>
          <div className="hero-stats">
            <div className="hstat"><div className="hstat-n">6<span className="accent">/7</span></div><div className="hstat-l">Jours ouverts</div></div>
            <div className="hstat"><div className="hstat-n">7<span className="accent">+</span></div><div className="hstat-l">Services spécialisés</div></div>
            <div className="hstat"><div className="hstat-n">100<span className="accent">%</span></div><div className="hstat-l">Mécanique générale</div></div>
            <div className="hstat"><div className="hstat-n">8–17<span className="accent">h</span></div><div className="hstat-l">Du lundi au vendredi</div></div>
          </div>
        </div>
      </header>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          <span>Pneus • Alignement • Freins • Suspension • Silencieux • Vidange • Injection • Mécanique générale • </span>
          <span>Pneus • Alignement • Freins • Suspension • Silencieux • Vidange • Injection • Mécanique générale • </span>
        </div>
      </div>

      {/* SERVICES */}
      <section className="services" id="services">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="kicker" style={{ marginBottom: "1rem" }}>Ce qu'on fait</span>
              <h2 className="display sec-title">Un atelier complet,<br />sous un même toit</h2>
            </div>
            <p className="sec-note">De la pose de pneus à la réparation mécanique : tout est fait sur place, avec soin.</p>
          </div>

          {SERVICES.map((s) => (
            <a className="srow" href="#rdv" key={s.n}>
              <span className="srow-num">{s.n}</span>
              <span className="srow-title">{s.t}</span>
              <span className="srow-desc">{s.d}</span>
              <span className="srow-img"><img src={U(s.img, 400)} alt="" loading="lazy" /></span>
              <span className="srow-arrow"><ArrowUpRight size={20} /></span>
            </a>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="why" id="apropos">
        <div className="wrap why-grid">
          <div className="why-visual">
            <div className="why-img-main"><img src={U(IMG.whyMain)} alt="Mécanicien au travail" loading="lazy" /></div>
            <div className="why-img-sub"><img src={U(IMG.whySub, 500)} alt="Détail d'atelier" loading="lazy" /></div>
          </div>
          <div>
            <span className="kicker">L'atelier</span>
            <h2 className="display why-title">Un service honnête,<br />sans surprise</h2>
            <p className="why-text">
              Chez Pneu Grisé, on croit à une mécanique simple et transparente.
              On cible le vrai problème avant de toucher à quoi que ce soit, et chaque intervention
              est faite avec le soin qu'on donnerait à notre propre véhicule.
            </p>
            <div className="why-checks">
              <div className="why-check"><Check size={17} /> Diagnostic précis</div>
              <div className="why-check"><Check size={17} /> Pneus &amp; alignement</div>
              <div className="why-check"><Check size={17} /> Freins &amp; suspension</div>
              <div className="why-check"><Check size={17} /> Vidange &amp; injection</div>
              <div className="why-check"><Check size={17} /> Silencieux</div>
              <div className="why-check"><Check size={17} /> Conseils sans pression</div>
            </div>
            <div className="why-counters">
              <div><div className="counter-n">6<span className="accent">j</span></div><div className="counter-l">Ouvert / semaine</div></div>
              <div><div className="counter-n">7<span className="accent">+</span></div><div className="counter-l">Services</div></div>
              <div><div className="counter-n">Local</div><div className="counter-l">Saint-Bruno-de-Montarville</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT CTA */}
      <section className="cta" id="rdv">
        <div className="cta-bg"><img src={U(IMG.cta)} alt="Voiture au garage" loading="lazy" /></div>
        <div className="wrap cta-in">
          <span className="kicker">Prêt à rouler en confiance ?</span>
          <h2 className="display cta-title">Réservez votre<br />passage à l'atelier</h2>
          <p className="cta-sub">
            Pneus, freins, alignement ou simple vidange : passez nous voir au {ADDRESS.split(",")[0]}
            {" "}ou réservez votre plage horaire par téléphone. On s'occupe du reste.
          </p>
          <div className="cta-actions">
            <a className="cta-phone" href={`tel:${PHONE_TEL}`}><Phone size={26} /> {PHONE_DISPLAY}</a>
            <a className="btn btn-red" href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Voir l'itinéraire
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="foot" id="contact">
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo">Pneu Grisé<small>Mécanique générale</small></div>
              <p className="foot-tag">Garage de mécanique générale au service des automobilistes de Saint-Bruno-de-Montarville.</p>
              <a className="cta-phone" href={`tel:${PHONE_TEL}`} style={{ fontSize: "1.3rem" }}><Phone size={20} /> {PHONE_DISPLAY}</a>
            </div>
            <div>
              <h4 className="foot-h">Services</h4>
              <ul className="foot-list">
                {SERVICES.slice(0, 5).map((s) => <li key={s.n}><a href="#services">{s.t}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="foot-h">Navigation</h4>
              <ul className="foot-list">
                <li><a href="#top">Accueil</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#apropos">Atelier</a></li>
                <li><a href="#rdv">Rendez-vous</a></li>
              </ul>
            </div>
            <div>
              <h4 className="foot-h">Coordonnées</h4>
              <ul className="foot-list">
                <li><span><MapPin size={15} /> {ADDRESS}</span></li>
                <li><span><Clock size={15} /> Lun – Ven : 8h à 17h</span></li>
                <li><span><Clock size={15} /> Samedi : 8h à 12h</span></li>
                <li><span><Clock size={15} /> Dimanche : fermé</span></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© {new Date().getFullYear()} Pneu Grisé — Mécanique générale. Tous droits réservés.</span>
            <span>Saint-Bruno-de-Montarville, QC</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
