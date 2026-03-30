import React, { useEffect, useRef } from 'react';
import '../index.css';

// ── Data ──────────────────────────────────────────────────────────
const interests = [
    { label: 'Control Engineering', icon: '⟳' },
    { label: 'Motion Planning',     icon: '⇢' },
    { label: 'SLAM',                icon: '◎' },
    { label: 'Embedded Systems',    icon: '⬡' },
];

const learning = [
    { label: 'German',           icon: 'DE' },
    { label: 'Topology',         icon: '∞' },
    { label: 'Abstract Algebra', icon: '⊕' },
];

const reading = {
    last: { author: 'Fernandez Villaverde, Jesus; de la Torre, Francisco', title: 'La factura del cupo catalán: Privilegios territoriales frente a ciudadanía' },
    current: [
        { author: 'Kenko; Chomei', title: 'Essays in Idleness and Hojoki' },
	{ author: 'Murakami, Haruki', title: 'Kafka en la orilla'}
    ],
};

// ── Component ─────────────────────────────────────────────────────
const ProfileComponent = () => {
    const sectionRef = useRef(null);
    const [isMobile, setIsMobile] = React.useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Scroll-reveal
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('visible');
                        observer.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        const items = sectionRef.current?.querySelectorAll('.reveal');
        items?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="intro" ref={sectionRef} style={sectionStyle}>
            {/* Dot-grid overlay */}
            <div style={dotGridStyle} aria-hidden="true" />

            <div style={{ ...innerStyle, flexDirection: isMobile ? 'column-reverse' : 'row', gap: isMobile ? '2rem' : '4rem' }}>
                {/* ── Bio ───────────────────────────── */}
                <div style={bioColStyle}>
                    <div className="reveal" style={{ transitionDelay: '0.1s' }}>
                        <h1 style={nameStyle}>Pablo David Aranda Rodríguez</h1>
                        <p style={subtitleStyle}>
                            <em>Robotics engineer</em>
                        </p>
                    </div>

                    <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                        <p style={bioTextStyle}>
                            Originally from Zaragoza, a spanish mid-sized city, 1 hour away from the Pyrinees, I ended up
                            studying Industrial Engineering at the University of Zaragoza, then crossing half of
                            Europe to study as an exchange student and then pursue a Master's in Robotics at SDU in Odense — completed
                            with an exchange semester at Hochschule München and a thesis at the Technische Universität München.
                        </p>
                    </div>

                    {/* ── Interests + Books ─────────── */}
                    <div className="reveal" style={{ ...interestsRowStyle, transitionDelay: '0.3s' }}>
                        {/* Interests */}
                        <div style={interestBlockStyle}>
                            <h3 style={blockHeadStyle}>Interests</h3>
                            <ul style={listStyle}>
                                {interests.map((item) => (
                                    <li key={item.label} style={listItemStyle}>
                                        <span style={iconStyle}>{item.icon}</span>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Currently learning */}
                        <div style={interestBlockStyle}>
                            <h3 style={blockHeadStyle}>learning</h3>
                            <ul style={listStyle}>
                                {learning.map((item) => (
                                    <li key={item.label} style={listItemStyle}>
                                        <span style={iconStyle}>{item.icon}</span>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Reading */}
                        <div style={interestBlockStyle}>
                            <h3 style={blockHeadStyle}>Reading</h3>
                            <div style={bookSectionStyle}>
                                <span style={bookLabelStyle}>Last read</span>
                                <p style={bookStyle}>
                                    {reading.last.author}.{' '}
                                    <em style={{ color: 'var(--color-sub-dimm)' }}>{reading.last.title}</em>
                                </p>
                            </div>
                            <div style={bookSectionStyle}>
                                <span style={bookLabelStyle}>Currently reading</span>
                                {reading.current.filter((b) => b.title).map((book) => (
                                    <p key={book.title} style={bookStyle}>
                                        {book.author}.{' '}
                                        <em style={{ color: 'var(--color-sub-dimm)' }}>{book.title}</em>
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Photo ─────────────────────────── */}
                <div className="reveal" style={{ ...photoColStyle, width: isMobile ? '100%' : 'auto', alignItems: 'center' }}>
                    <div style={isMobile ? { ...photoWrapStyle, width: '100%', maxWidth: '320px', height: 'auto', margin: '0 auto' } : photoWrapStyle}>
                        <img
                            src="/profile.JPEG"
                            alt="Pablo David Aranda Rodríguez"
                            style={isMobile ? { ...photoStyle, width: '100%', height: 'auto', maxWidth: '320px' } : photoStyle}
                        />
                        {/* Decorative orbit ring */}
                        <div style={orbitRingStyle} aria-hidden="true" />
                    </div>
                </div>
            </div>
        </section>
    );
};

// ── Styles ────────────────────────────────────────────────────────
const sectionStyle = {
    position: 'relative',
    backgroundColor: 'var(--color-main)',
    overflow: 'hidden',
    padding: '5rem 0 4rem',
    scrollMarginTop: '60px',
};

const dotGridStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle, rgba(93,138,168,0.18) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    pointerEvents: 'none',
};

const innerStyle = {
    position: 'relative',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '4rem',
    flexWrap: 'wrap',
};

const photoColStyle = {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
};

const photoWrapStyle = {
    position: 'relative',
    width: '360px',
    height: '460px',
};

const photoStyle = {
    width: '360px',
    height: '460px',
    borderRadius: '16px',
    objectFit: 'cover',
    objectPosition: 'center top',
    border: '2px solid rgba(var(--color-strong-rgb), 0.4)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(var(--color-strong-rgb), 0.1)',
    display: 'block',
};

const orbitRingStyle = {
    position: 'absolute',
    inset: '-10px',
    borderRadius: '22px',
    border: '1px dashed rgba(232,130,63,0.25)',
    pointerEvents: 'none',
    animation: 'spin 40s linear infinite',
};

const bioColStyle = {
    flex: 1,
    minWidth: '280px',
    color: 'var(--color-sub-dimm)',
};

const nameStyle = {
    fontSize: 'var(--text-2xl)',
    fontWeight: 700,
    color: 'var(--color-sub-dimm)',
    margin: '0 0 0.2em',
    lineHeight: 1.15,
};

const subtitleStyle = {
    fontSize: 'var(--text-lg)',
    color: 'var(--color-sub)',
    margin: '0 0 1.25em',
};

const bioTextStyle = {
    fontSize: 'var(--text-base)',
    color: 'var(--color-sub)',
    textAlign: 'justify',
    lineHeight: 1.75,
    margin: '0 0 0.85em',
};

const interestsRowStyle = {
    display: 'flex',
    gap: '3rem',
    flexWrap: 'wrap',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid rgba(93,138,168,0.18)',
};

const interestBlockStyle = {
    flex: 1,
    minWidth: '220px',
};

const blockHeadStyle = {
    fontSize: '0.95rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-strong)',
    margin: '0 0 0.75em',
};

const listStyle = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4em',
};

const listItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6em',
    fontSize: '0.9rem',
    color: 'var(--color-sub)',
};

const iconStyle = {
    display: 'inline-block',
    width: '1.4em',
    textAlign: 'center',
    fontSize: '0.85em',
    color: 'var(--color-strong)',
    fontStyle: 'normal',
};

const bookSectionStyle = {
    marginBottom: '0.75em',
};

const bookLabelStyle = {
    display: 'block',
    fontSize: 'var(--text-xs)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: 'var(--color-strong)',
    marginBottom: '0.25em',
};

const bookStyle = {
    fontSize: '0.9rem',
    color: 'var(--color-sub)',
    margin: 0,
    lineHeight: 1.5,
};

export default ProfileComponent;
