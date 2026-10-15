import { ArrowUpRight, ClipboardList, Sparkles } from 'lucide-react';
import { DynamicLeadForm } from './DynamicLeadForm';
import { initialLeadValues, leadFormConfig } from './leadConfig';
import './lead.css';

export function LeadPage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Form Studio home">
          <span className="brand__mark"><ClipboardList size={19} aria-hidden="true" /></span>
          <span>form<span className="brand__accent">studio</span></span>
        </a>
        <div className="topbar__meta"><span className="status-dot" /> Lead intake <span className="topbar__divider">/</span> <span>Demo workspace</span></div>
      </header>

      <section className="hero" id="top">
        <div className="hero__copy">
          <div className="eyebrow"><Sparkles size={14} aria-hidden="true" /> LET'S GET STARTED</div>
          <h1>Tell us what<br className="desktop-break" /> you're looking for.</h1>
          <p className="hero__description">Share a few details and our team will get back to you with the right next steps.</p>
          <div className="hero__trust"><span className="trust-icon"><ShieldIcon /></span><span>Thoughtful support. No unnecessary noise.</span></div>
        </div>

        <section className="form-card" aria-labelledby="form-title">
          <div className="form-card__heading">
            <div className="form-card__icon"><ClipboardList size={20} aria-hidden="true" /></div>
            <div>
              <p className="form-card__kicker">YOUR DETAILS</p>
              <h2 id="form-title">Lead information</h2>
            </div>
            <span className="required-note"><span aria-hidden="true">*</span> Required</span>
          </div>
          <p className="form-card__intro">Fields marked with an asterisk are required.</p>
          <DynamicLeadForm config={leadFormConfig} initialValues={initialLeadValues} />
          <div className="form-card__bottom"><span>Powered by Form Studio</span><a href="#top">Learn more <ArrowUpRight size={13} aria-hidden="true" /></a></div>
        </section>
      </section>

      <footer className="page-footer">
        <span>© 2026 Form Studio</span>
        <span className="footer-links"><span>Privacy</span><span>Terms</span><span>Help center</span></span>
      </footer>
    </main>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 19 6v5c0 4.4-2.9 7.8-7 10-4.1-2.2-7-5.6-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
