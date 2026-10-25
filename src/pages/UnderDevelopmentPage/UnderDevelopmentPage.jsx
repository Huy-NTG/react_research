import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './UnderDevelopmentPage.scss'

function UnderDevelopmentPage() {
  return <div className="app-shell">
    <Header />
    <main className="route-state">
      <h1>Trang này đang tiếp tục được phát triển</h1>
      <p>Chúng tôi sẽ sớm cập nhật thêm nội dung cho trang này.</p>
      <Link to="/">Về trang chủ</Link>
    </main>
    <Footer />
  </div>
}

export default UnderDevelopmentPage
