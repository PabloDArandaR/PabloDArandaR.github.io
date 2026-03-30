import React, { useEffect, useRef, useState } from 'react';
import '../index.css';

// ── Data ──────────────────────────────────────────────────────────
const portfolioData = [
    {
        name: 'Planetary System Simulation',
        repo: 'https://github.com/pablodarandar/planetary_system',
        tags: ['Physics', 'Simulation', 'Python'],
        description:
            'N-body gravitational simulator — models orbital mechanics and collisions between celestial bodies using numerical integration methods.',
        details: [
            'Visualises trajectories over time.',
            'Configurable initial conditions: mass, velocity, position.',
        ],
        prio: 1,
        icon: '🪐',
    },
    {
        name: 'Chaos Theory Attractors',
        repo: 'https://github.com/PabloDArandaR/ChaosTheory',
        tags: ['Mathematics', 'Visualisation', 'Python'],
        description:
            'Interactive implementation of several chaotic attractors (Lorenz, Rössler, Halvorsen) with 3D trajectory visualisation.',
        details: [
            'Covers Aizawa, Rössler, Chen-Lee, and Arneodo attractors.',
            'Demonstrates sensitivity to initial conditions (butterfly effect).',
        ],
        prio: 2,
        icon: '∿',
    },
    {
        name: 'Mapping Methods for Robotic Platforms',
        repo: 'https://github.com/PabloDArandaR/mapping-methods',
        tags: ['Robotics', 'SLAM', 'ROS'],
        description:
            'Implementation and benchmarking of occupancy-grid mapping algorithms for mobile robotic platforms.',
        details: [
        ],
        prio: 3,
        icon: '◎',
    },
    {
        name: 'Encode task impedance from demonstration',
        repo: 'https://github.com/PabloDArandaR/encode-task-impedance-from-demonstration',
        tags: ['Robotics', 'ML', 'Manipulation'],
        description:
            'Robot arm learns manipulation controller from human demonstrations using imitation learning techniques.',
        details: [
            'Kinesthetic teaching interface for human demonstration collection.',
            'Gaussian Mixture Regression for generalisation across task variations.',
            'Evaluated on a UR robot arm at SDU.',
        ],
        prio: 4,
        icon: '⟳',
    },
];

// ── GitHub icon ───────────────────────────────────────────────────
const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

// ── Modal ─────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div style={backdropStyle} onClick={onClose}>
            <div className="project-modal" style={modalStyle} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                {/* Close */}
                <button
                    style={closeButtonStyle}
                    onClick={onClose}
                    aria-label="Close"
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#e8f2ff'; e.currentTarget.style.background = 'rgba(93,138,168,0.15)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(93,138,168,0.5)'; e.currentTarget.style.background = 'transparent'; }}
                >
                    ✕
                </button>

                {/* Header */}
                <div style={modalHeaderStyle}>
                    <div style={modalIconStyle} aria-hidden="true">{project.icon}</div>
                    <h2 style={modalTitleStyle}>{project.name}</h2>
                </div>

                {/* Tags */}
                <div style={tagsStyle}>
                    {project.tags.map((tag) => (
                        <span key={tag} style={tagStyle}>{tag}</span>
                    ))}
                </div>

                {/* Description */}
                <p style={modalDescStyle}>{project.description}</p>

                {/* Details */}
                {project.details && (
                    <ul style={detailsListStyle}>
                        {project.details.map((point) => (
                            <li key={point} style={detailsItemStyle}>
                                <span style={detailsBulletStyle}>▸</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Footer */}
                <div style={modalFooterStyle}>
                    {project.repo ? (
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={repoLinkStyle}
                            onMouseEnter={(e) => { e.currentTarget.style.color = '#e8823f'; e.currentTarget.style.borderColor = '#e8823f'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(93,138,168,0.65)'; e.currentTarget.style.borderColor = 'rgba(93,138,168,0.22)'; }}
                        >
                            <GitHubIcon />
                            <span>View on GitHub</span>
                        </a>
                    ) : (
                        <span style={wipBadgeStyle}>Work in progress</span>
                    )}
                </div>
            </div>
        </div>
    );
};

// ── Card ──────────────────────────────────────────────────────────
const ProjectCard = ({ project, onClick }) => {
    return (
        <div
            style={cardStyle}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(var(--color-sub-rgb),0.45)';
                e.currentTarget.style.cursor = 'pointer';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--card-border)';
            }}
        >
            {/* Icon + Title */}
            <div style={cardHeaderStyle}>
                <div style={cardIconWrapStyle} aria-hidden="true">
                    <span style={cardIconStyle}>{project.icon}</span>
                </div>
                <h3 style={cardTitleStyle}>{project.name}</h3>
            </div>

            {/* Tags */}
            <div style={tagsStyle}>
                {project.tags.map((tag) => (
                    <span key={tag} style={tagStyle}>{tag}</span>
                ))}
            </div>

            {/* Footer */}
            <div style={cardFooterStyle}>
                {project.repo ? (
                    <span style={cardHintStyle}>
                        <GitHubIcon /> View on GitHub
                    </span>
                ) : (
                    <span style={wipBadgeStyle}>Work in progress</span>
                )}
                <span style={cardHintStyle}>Click for details ›</span>
            </div>
        </div>
    );
};

// ── Per-card scatter offsets (deterministic) ──────────────────────
const cardScatter = [
    'rotate(-1.5deg) translateY(0px)',
    'rotate(1.0deg)  translateY(16px)',
    'rotate(-0.6deg) translateY(8px)',
    'rotate(2.0deg)  translateY(-10px)',
];

// ── Main component ────────────────────────────────────────────────
const PortfolioComponent = () => {
    const sectionRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);
    const [gridCols, setGridCols] = useState(portfolioData.length);

    const sorted = [...portfolioData].sort((a, b) => a.prio - b.prio);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setGridCols(w < 640 ? 1 : w < 1024 ? 2 : sorted.length);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [sorted.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.07 }
        );
        const items = sectionRef.current?.querySelectorAll('.reveal');
        items?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" ref={sectionRef} style={sectionStyle}>
            <div style={dotGridStyle} aria-hidden="true" />

            <div style={innerStyle}>
                <div className="reveal" style={headingWrapStyle}>
                    <h2 style={sectionTitleStyle}>
                        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, transparent, rgba(var(--color-strong-rgb),0.5))' }} />
                        <span style={{ color: 'var(--color-strong)', whiteSpace: 'nowrap' }}>Selected projects</span>
                        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to left, transparent, rgba(var(--color-strong-rgb),0.5))' }} />
                    </h2>
                </div>

                <div style={{ ...gridStyle, gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}>
                    {sorted.map((project, i) => (
                        <div
                            key={project.name}
                            className="reveal"
                            style={{
                                transitionDelay: `${i * 0.18}s`,
                                transform: gridCols === 1 ? 'none' : cardScatter[i % cardScatter.length],
                                transition: 'transform 0.35s ease, opacity 0.6s ease',
                            }}
                            onMouseEnter={(e) => { if (gridCols > 1) e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px)'; }}
                            onMouseLeave={(e) => { if (gridCols > 1) e.currentTarget.style.transform = cardScatter[i % cardScatter.length]; }}
                        >
                            <ProjectCard project={project} onClick={() => setActiveProject(project)} />
                        </div>
                    ))}
                </div>
            </div>

            {activeProject && (
                <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
            )}
        </section>
    );
};

// ── Styles ────────────────────────────────────────────────────────
const sectionStyle = {
    position: 'relative',
    backgroundColor: 'var(--color-main)',
    overflow: 'hidden',
    padding: '4rem 0',
    scrollMarginTop: '60px',
};

const dotGridStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle, rgba(232,130,63,0.07) 1px, transparent 1px)',
    backgroundSize: '28px 28px',
    pointerEvents: 'none',
};

const innerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '100%',
    padding: '0 2rem',
    boxSizing: 'border-box',
};

const headingWrapStyle = {
    marginBottom: '2.5rem',
};

const sectionTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.9em',
    fontSize: 'var(--text-2xl)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    margin: '0 0 0.4em',
};

const sectionSubtitleStyle = {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-sub)',
    margin: 0,
    opacity: 0.75,
};

const gridStyle = {
    display: 'grid',
    gap: '1.5rem',
    alignItems: 'start',
    width: '100%',
};

const cardStyle = {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--card-border)',
    borderRadius: '10px',
    padding: '1.4rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    transition: 'border-color 0.2s, transform 0.2s, background-color 0.2s',
};

const cardHeaderStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '0.6em',
};

const cardIconWrapStyle = {
    width: '2.2rem',
    height: '2.2rem',
    borderRadius: '8px',
    background: 'rgba(var(--color-strong-rgb), 0.1)',
    border: '1px solid rgba(var(--color-strong-rgb), 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
};

const cardIconStyle = {
    fontSize: '1.1rem',
    lineHeight: 1,
    display: 'block',
};

const cardTitleStyle = {
    fontSize: 'var(--text-base)',
    fontWeight: 600,
    color: 'var(--color-sub-dimm)',
    margin: 0,
    lineHeight: 1.3,
};

const cardDescStyle = {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-sub)',
    lineHeight: 1.65,
    margin: 0,
    flex: 1,
};

const tagsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4em',
};

const tagStyle = {
    fontSize: 'var(--text-xs)',
    padding: '0.2em 0.6em',
    borderRadius: '20px',
    background: 'rgba(var(--color-strong-rgb), 0.12)',
    border: '1px solid rgba(var(--color-strong-rgb), 0.3)',
    color: 'var(--color-strong)',
    letterSpacing: '0.03em',
    fontWeight: 600,
};

const cardFooterStyle = {
    paddingTop: '0.5rem',
    borderTop: '1px solid var(--card-border)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const cardHintStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4em',
    fontSize: 'var(--text-xs)',
    color: 'var(--content-muted)',
    opacity: 0.7,
};

const repoLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4em',
    fontSize: 'var(--text-sm)',
    color: 'var(--content-muted)',
    border: '1px solid rgba(var(--color-sub-rgb),0.25)',
    borderRadius: '6px',
    padding: '0.3em 0.7em',
    textDecoration: 'none',
    transition: 'color 0.2s, border-color 0.2s',
};

const wipBadgeStyle = {
    fontSize: 'var(--text-xs)',
    color: 'var(--content-muted)',
    opacity: 0.6,
    fontStyle: 'italic',
};

// ── Modal styles ──────────────────────────────────────────────────
const backdropStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(10, 18, 30, 0.75)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1.5rem',
};

const modalStyle = {
    position: 'relative',
    backgroundColor: 'var(--color-dimm)',
    border: '1px solid rgba(93,138,168,0.25)',
    borderRadius: '12px',
    padding: '2.5rem',
    maxWidth: '780px',
    width: '100%',
    maxHeight: '80vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    color: 'rgba(93,138,168,0.5)',
    fontSize: '1rem',
    cursor: 'pointer',
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s, background 0.2s',
};

const modalHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75em',
    paddingRight: '2rem',
};

const modalIconStyle = {
    width: '2.8rem',
    height: '2.8rem',
    borderRadius: '10px',
    background: 'rgba(var(--color-strong-rgb), 0.1)',
    border: '1px solid rgba(var(--color-strong-rgb), 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    lineHeight: 1,
    flexShrink: 0,
};

const modalTitleStyle = {
    fontSize: 'var(--text-lg)',
    fontWeight: 700,
    color: 'var(--color-sub-dimm)',
    margin: 0,
    lineHeight: 1.25,
};

const modalDescStyle = {
    fontSize: 'var(--text-sm)',
    color: 'var(--color-sub)',
    lineHeight: 1.7,
    margin: 0,
    paddingTop: '0.25rem',
    borderTop: '1px solid rgba(93,138,168,0.12)',
};

const detailsListStyle = {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
};

const detailsItemStyle = {
    display: 'flex',
    gap: '0.6em',
    fontSize: 'var(--text-sm)',
    color: 'var(--content-muted)',
    lineHeight: 1.5,
};

const detailsBulletStyle = {
    color: 'var(--color-strong)',
    flexShrink: 0,
    marginTop: '0.05em',
};

const modalFooterStyle = {
    paddingTop: '0.5rem',
    borderTop: '1px solid rgba(93,138,168,0.12)',
};

export default PortfolioComponent;
