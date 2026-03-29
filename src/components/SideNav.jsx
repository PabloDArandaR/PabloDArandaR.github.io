import React, { useEffect, useState } from 'react';

const sections = [
    { id: 'intro',     label: 'Intro' },
    { id: 'work',      label: 'Work experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects',  label: 'Projects' },
];

const SideNav = () => {
    const [active, setActive] = useState('intro');

    useEffect(() => {
        const OFFSET = window.innerHeight * 0.45; // trigger when section is near mid-viewport

        const update = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;

            if (nearBottom) {
                setActive(sections[sections.length - 1].id);
                return;
            }

            let current = sections[0].id;
            for (const { id } of sections) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= OFFSET) {
                    current = id;
                }
            }
            setActive(current);
        };

        window.addEventListener('scroll', update, { passive: true });
        update(); // set correct state on mount
        return () => window.removeEventListener('scroll', update);
    }, []);

    return (
        <nav style={navStyle} aria-label="Page sections">
            {sections.map(({ id, label }) => {
                const isActive = active === id;
                return (
                    <a
                        key={id}
                        href={`#${id}`}
                        style={linkStyle}
                        aria-current={isActive ? 'location' : undefined}
                        className={`sidenav-item${isActive ? ' sidenav-active' : ''}`}
                    >
                        <span className="sidenav-label" style={labelStyle}>{label}</span>
                        <span className="sidenav-dot" style={isActive ? activeDotStyle : dotStyle} />
                    </a>
                );
            })}
        </nav>
    );
};

const navStyle = {
    position: 'fixed',
    right: '1.25rem',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
    zIndex: 50,
};

const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    textDecoration: 'none',
    cursor: 'pointer',
};

const labelStyle = {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: 'var(--content-muted)',
    opacity: 0,
    transform: 'translateX(4px)',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
};

const dotStyle = {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--content-muted)',
    opacity: 0.35,
    flexShrink: 0,
    transition: 'all 0.25s ease',
};

const activeDotStyle = {
    ...dotStyle,
    width: '10px',
    height: '10px',
    background: 'var(--color-strong)',
    opacity: 1,
    boxShadow: '0 0 6px rgba(var(--color-strong-rgb), 0.5)',
};

export default SideNav;
