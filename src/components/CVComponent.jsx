import React, { useEffect, useRef } from 'react';
import '../index.css';

// ── Data ──────────────────────────────────────────────────────────
const cv = [
    {
        id: 'B.Ing',
        type: 'study',
        title: "Bachelor's in Industrial Engineering Technologies",
        institutions: [
            { name: 'University of Zaragoza', location: 'Zaragoza, Spain' },
        ],
        startDate: '2015-09-01',
        endDate: '2019-09-01',
        tags: ['Mechanics', 'Electrical Eng.', 'Control Systems', 'CAD'],
        highlights: [
            'Foundations in mechanical, electrical, and control systems engineering.',
        ],
    },
    {
        id: 'M.Ing',
        type: 'study',
        title: "Master's in Industrial Engineering",
        institutions: [
            { name: 'University of Zaragoza', location: 'Zaragoza, Spain' },
        ],
        startDate: '2019-09-01',
        endDate: '2021-06-01',
        tags: ['Automation', 'Control Theory', 'Manufacturing', 'PLCs'],
        highlights: [
            'Advanced studies in automation, control theory, and manufacturing systems.',
        ],
    },
    {
        id: 'M.Rob',
        type: 'study',
        title: "Master's in Robotics — Advanced Robotics Technologies",
        institutions: [
            { name: 'Syddansk Universitet (SDU)', location: 'Odense, Denmark' },
            { name: 'Hochschule München (HM)', location: 'Munich, Germany' },
            { name: 'Technische Universität München (TUM)', location: 'Munich, Germany' },
        ],
        startDate: '2021-09-01',
        endDate: '2023-10-01',
        tags: ['Perception', 'SLAM', 'ROS', 'Motion Planning', 'C++', 'Learning from Demonstration'],
        highlights: [
            'Specialisation in robot perception, planning, manipulation, and learning from demonstration.',
            'Exchange semester at Hochschule München.',
            "Master's thesis at TU München on imitation learning for robot manipulation.",
        ],
    },
    {
        id: 'ITA',
        type: 'work',
        title: 'Teaching & Research Assistant',
        institutions: [
            { name: 'University of Zaragoza', location: 'Remote' },
        ],
        startDate: '2021-09-01',
        endDate: '2022-06-01',
        tags: ['Teaching', 'Research', 'Python'],
        highlights: [
            "Teaching and research support in engineering courses during the master's programme.",
        ],
    },
    {
        id: 'SDU.job',
        type: 'work',
        title: 'Working Student — Robot Programmer',
        institutions: [
            { name: 'SDU Robotics', location: 'Odense, Denmark' },
        ],
        startDate: '2021-11-01',
        endDate: '2022-09-01',
        tags: ['UR Robots', 'Robot Programming', 'C++', 'ROS'],
        highlights: [
            'Development and testing of robotic manipulation programs.',
            'Hands-on work with industrial robot arms.',
        ],
    },
    {
        id: 'MAGAZINO',
        type: 'work',
        title: 'Working Student — Mechanical Engineer',
        institutions: [
            { name: 'Magazino GmbH', location: 'Munich, Germany' },
        ],
        startDate: '2022-08-17',
        endDate: '2023-06-01',
        tags: ['Mechanical Design', 'SolidWorks', 'Logistics Robotics'],
        highlights: [
            'Mechanical design and validation for warehouse logistics platforms.',
            'Iterative design cycles for a commercial AMR product.',
        ],
    },
    {
        id: 'ARRK',
        type: 'work',
        title: 'Software Developer — ADAS & Autonomous Driving',
        institutions: [
            { name: 'ARRK Engineering GmbH', location: 'Munich, Germany' },
        ],
        startDate: '2023-06-15',
        endDate: '2025-08-01',
        tags: ['C++', 'Python', 'ADAS', 'Autosar', 'ROS 2'],
        highlights: [
            'Software development for advanced driver-assistance and self-driving systems.',
        ],
    },
    {
        id: 'ImFusion',
        type: 'work',
        title: 'Software Engineer — Robotics',
        institutions: [
            { name: 'ImFusion GmbH', location: 'Munich, Germany' },
        ],
        startDate: '2025-09-01',
        endDate: null,
        tags: ['C++', 'Robot integration', 'Medical applications', 'ROS 2'],
        highlights: [
            'Integration of several robot models/brands into our suite, including, but not only, Franka, Universal Robots, ...',
            'Creating demos of the ImFusion Suite for Ultrasound Robotics applications',
            'Motion generation, ... modules',
        ],
    },
];

// ── Helpers ───────────────────────────────────────────────────────
function fmtDate(iso) {
    const [y, m] = iso.split('-');
    return new Date(y, m - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

// ── Card ──────────────────────────────────────────────────────────
const CVCard = ({ entry }) => {
    const isStudy  = entry.type === 'study';
    const isPresent = !entry.endDate;
    const accent   = isStudy ? '#5d8aa8' : 'var(--color-strong)';
    const accentMuted = isStudy ? 'rgba(93,138,168,0.35)' : 'rgba(var(--color-strong-rgb),0.35)';
    const cardBg   = isStudy
        ? 'rgba(93,138,168,0.07)'
        : 'rgba(var(--color-strong-rgb),0.06)';

    return (
        <div style={{
            backgroundColor: cardBg,
            border: `1px solid ${isStudy ? 'rgba(93,138,168,0.22)' : 'rgba(var(--color-strong-rgb),0.22)'}`,
            borderLeft: `4px solid ${isStudy ? '#5d8aa8' : 'var(--color-strong)'}`,
            borderRadius: '0 10px 10px 0',
            padding: '1.1rem 1.4rem',
        }}>
            {/* Date row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.65rem' }}>
                <span style={dateBadgeStyle}>{fmtDate(entry.startDate)}</span>
                <div style={{ flex: 1, height: '1px', background: accentMuted }} />
                {isPresent
                    ? <span style={{ ...dateBadgeStyle, color: accent, borderColor: accent, fontWeight: 700 }}>Present</span>
                    : <span style={dateBadgeStyle}>{fmtDate(entry.endDate)}</span>
                }
            </div>

            {/* Title */}
            <div style={cardTitleStyle}>{entry.title}</div>

            {/* Institutions + locations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15em', marginBottom: '0.75rem' }}>
                {entry.institutions.map(({ name, location }) => (
                    <div key={name} style={cardMetaStyle}>
                        <span style={{ color: accent }}>{name}</span>
                        <span style={{ opacity: 0.45, margin: '0 0.4em' }}>·</span>
                        <span>{location}</span>
                    </div>
                ))}
            </div>

            {/* Highlights */}
            {entry.highlights?.length > 0 && (
                <ul style={highlightListStyle}>
                    {entry.highlights.map((h) => (
                        <li key={h} style={highlightItemStyle}>
                            <span style={{ color: accent, flexShrink: 0 }}>▸</span>
                            <span>{h}</span>
                        </li>
                    ))}
                </ul>
            )}

            {/* Tags */}
            {entry.tags?.length > 0 && (
                <div style={tagsRowStyle}>
                    {entry.tags.map((tag) => (
                        <span key={tag} style={isStudy ? tagStudyStyle : tagWorkStyle}>{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

// ── Timeline row ──────────────────────────────────────────────────
const TimelineRow = ({ entry }) => {
    const isStudy = entry.type === 'study';
    return (
        <div style={rowWrapStyle}>
            <CVCard entry={entry} />
        </div>
    );
};

// ── Timeline block ────────────────────────────────────────────────
const TimelineBlock = ({ entries, delayOffset = 0 }) => {
    const sorted = [...entries].sort((a, b) => b.startDate.localeCompare(a.startDate));
    return (
        <div style={timelineContainerStyle}>
            {sorted.map((entry, i) => (
                <div
                    key={entry.id}
                    className="reveal"
                    style={{ transitionDelay: `${(delayOffset + i) * 0.07}s` }}
                >
                    <TimelineRow entry={entry} />
                </div>
            ))}
        </div>
    );
};

// ── Main component ────────────────────────────────────────────────
const CVComponent = () => {
    const sectionRef = useRef(null);

    const studyEntries = cv.filter((e) => e.type === 'study');
    const workEntries  = cv.filter((e) => e.type === 'work');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.08 }
        );
        const items = sectionRef.current?.querySelectorAll('.reveal');
        items?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} style={sectionStyle}>
            <div style={dotGridStyle} aria-hidden="true" />

            <div style={innerStyle}>
                {/* Work */}
                <div className="reveal" style={blockHeadingWrapStyle}>
                    <div style={blockHeadingStyle}>
                        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, transparent, rgba(var(--color-strong-rgb),0.5))' }} />
                        <span style={{ color: 'var(--color-strong)', whiteSpace: 'nowrap' }}>Work experience</span>
                        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to left, transparent, rgba(var(--color-strong-rgb),0.5))' }} />
                    </div>
                </div>
                <TimelineBlock entries={workEntries} delayOffset={1} />

                {/* Education */}
                <div className="reveal" style={{ ...blockHeadingWrapStyle, marginTop: '3rem' }}>
                    <div style={blockHeadingStyle}>
                        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to right, transparent, rgba(93,138,168,0.5))' }} />
                        <span style={{ color: '#5d8aa8', whiteSpace: 'nowrap' }}>Education</span>
                        <div style={{ flex: 1, height: '2px', background: 'linear-gradient(to left, transparent, rgba(93,138,168,0.5))' }} />
                    </div>
                </div>
                <TimelineBlock entries={studyEntries} delayOffset={1 + workEntries.length} />
            </div>
        </section>
    );
};

// ── Styles ────────────────────────────────────────────────────────
const sectionStyle = {
    position: 'relative',
    backgroundColor: 'var(--color-dimm)',
    overflow: 'visible',
    padding: '4rem 0',
};

const dotGridStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle, rgba(93,138,168,0.1) 1px, transparent 1px)',
    backgroundSize: '32px 32px',
    pointerEvents: 'none',
};

const innerStyle = {
    position: 'relative',
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

const blockHeadingWrapStyle = {
    marginBottom: '1rem',
    width: '580px',
};

const blockHeadingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.9em',
    fontSize: 'var(--text-2xl)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
};

const rowWrapStyle = {
    width: '780px',
    paddingBottom: '1.25rem',
};

const timelineContainerStyle = {};

const dateBadgeStyle = {
    fontSize: 'var(--text-xs)',
    fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
    color: 'var(--content-muted)',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
    border: '1px solid rgba(var(--color-sub-rgb), 0.25)',
    borderRadius: '4px',
    padding: '0.1em 0.45em',
};

const cardTitleStyle = {
    fontSize: 'var(--text-lg)',
    fontWeight: 600,
    color: 'var(--color-sub-dimm)',
    lineHeight: 1.3,
    marginBottom: '0.25em',
};

const cardMetaStyle = {
    fontSize: 'var(--text-sm)',
    color: 'var(--content-muted)',
};

const highlightListStyle = {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35em',
};

const highlightItemStyle = {
    display: 'flex',
    gap: '0.5em',
    fontSize: 'var(--text-sm)',
    color: 'var(--content-muted)',
    lineHeight: 1.5,
};

const tagsRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.35em',
    paddingTop: '0.6rem',
    borderTop: '1px solid rgba(var(--color-sub-rgb), 0.12)',
};

const tagStudyStyle = {
    fontSize: 'var(--text-xs)',
    padding: '0.15em 0.55em',
    borderRadius: '20px',
    background: 'rgba(93,138,168,0.12)',
    border: '1px solid rgba(93,138,168,0.28)',
    color: '#5d8aa8',
    fontWeight: 500,
    letterSpacing: '0.02em',
};

const tagWorkStyle = {
    fontSize: 'var(--text-xs)',
    padding: '0.15em 0.55em',
    borderRadius: '20px',
    background: 'rgba(var(--color-strong-rgb), 0.1)',
    border: '1px solid rgba(var(--color-strong-rgb), 0.28)',
    color: 'var(--color-strong)',
    fontWeight: 500,
    letterSpacing: '0.02em',
};

export default CVComponent;
