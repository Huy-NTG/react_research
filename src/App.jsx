import Header from './components/Header/Header'
import HeroBanner from './components/HeroBanner/HeroBanner'
import TrendingSection from './components/TrendingSection/TrendingSection'

function App() {
  return <div className="app-shell">
    <Header />
    <main>
      <HeroBanner />
      <TrendingSection />
    </main>
    </div>
}

export default App