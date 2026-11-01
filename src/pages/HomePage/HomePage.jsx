import Header from '../../components/Header/Header'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import TrendingSection from '../../components/TrendingSection/TrendingSection'
import Footer from '../../components/Footer/Footer'

function HomePage() {
  // Nếu muốn lỗi thì tắt comment dòng dưới đây để kiểm tra ErrorBoundary
  // throw new Error("Lỗi giao diện !")
  return (
    <div className="app-shell">
      <Header />
      <main>
        <HeroBanner />
        <TrendingSection />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage