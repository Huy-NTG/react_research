import { Check, Globe2 } from 'lucide-react'
import './Footer.scss'

const footerGroups = [
  {
    title: 'The Basics',
    links: ['Giới thiệu về TMDB', 'Contact Us', 'API Documentation', 'API for Business', 'System Status'],
  },
  {
    title: 'Get Involved',
    links: ['Contribution Bible', 'Thêm phim mới', 'Thêm chương trình TV mới'],
  },
  {
    title: 'Community',
    links: ['Guidelines', 'Discussions', 'Leaderboard', 'Support Forums'],
  },
  {
    title: 'Legal',
    links: ['Terms of Use', 'API Terms of Use', 'Privacy Policy', 'DMCA Policy'],
  },
]

function Footer() {
  return <footer className="site-footer">
    <div className="page-width footer-inner">
      <div className="footer-brand-column">
        <a className="footer-logo" href="/" aria-label="TMDB home">
          <span>The</span>
          <span>Movie</span>
          <span>Db</span>
        </a>
        <button className="community-button" type="button">Join the Community</button>
      </div>

      <div className="footer-links">
        {footerGroups.map((group) => <section className="footer-group" key={group.title}>
          <h2>{group.title}</h2>
          <ul>
            {group.links.map((link) => <li key={link}><a href="/">{link}</a></li>)}
          </ul>
        </section>)}
      </div>

      <div className="footer-tools">
        <button className="privacy-button" type="button">
          <span className="privacy-icon"><Check size={11} strokeWidth={3} /></span>
          Your Privacy Choices
        </button>
        <label className="language-picker">
          <Globe2 size={23} aria-hidden="true" />
          <select defaultValue="vi-VN" aria-label="Language">
            <option value="vi-VN">Tiếng Việt (vi-VN)</option>
            <option value="en-US">English (en-US)</option>
          </select>
        </label>
        <small>Build f4de19a (11209)</small>
      </div>
    </div>
  </footer>
}

export default Footer