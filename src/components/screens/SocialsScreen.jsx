const CONTACT = [
  { label: 'Email', value: 'xayasakvincent@gmail.com', href: 'mailto:xayasakvincent@gmail.com' },
  { label: 'Phone', value: '650-457-7009', href: 'tel:+16504577009' },
];

const LINKS = [
  {
    name: 'GitHub',
    handle: 'vincentxayasak',
    url: 'https://github.com/vincentxayasak',
    color: '#c9d1d9',
  },
  {
    name: 'LinkedIn',
    handle: 'vincentxayasak',
    url: 'https://linkedin.com/in/vincentxayasak',
    color: '#0a66c2',
  },
  {
    name: 'OpenReview',
    handle: 'research papers',
    url: 'https://openreview.net/profile?id=%7EVincent_Xayasak1',
    color: '#8c1515',
  },
  {
    name: 'Resume',
    handle: 'PDF download',
    url: '/resume/Vincent_Xayasak_Resume.pdf',
    color: '#ffd89a',
  },
];

export default function SocialsScreen() {
  return (
    <div className="screen screen--socials">
      <h1 className="screen__title">SOCIALS</h1>
      <p className="screen__subtitle">reach out &amp; connect</p>
      <div className="screen__panel">
        <div className="socials">
          <div className="socials__location">
            <span className="socials__location-icon" aria-hidden="true">
              ◎
            </span>
            <div>
              <span className="socials__location-label">Based in</span>
              <span className="socials__location-value">San Jose, California</span>
            </div>
          </div>

          <section className="socials__section">
            <h2 className="socials__section-title">Contact</h2>
            {CONTACT.map((item) => (
              <a key={item.label} href={item.href} className="socials__row socials__row--contact">
                <span className="socials__row-label">{item.label}</span>
                <span className="socials__row-value">{item.value}</span>
              </a>
            ))}
          </section>

          <section className="socials__section">
            <h2 className="socials__section-title">Links</h2>
            {LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="socials__row socials__row--link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className="list-row__dot"
                  style={{ background: link.color, boxShadow: `0 0 8px ${link.color}` }}
                />
                <span className="socials__row-label">{link.name}</span>
                <span className="socials__row-value">{link.handle}</span>
                <span className="socials__row-icon" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
