import { useAlbums } from './hooks/useAlbums';
// import Header from './components/Header/Header'
import Albums from './components/Albums/Albums';

function App() {
  const {
    loading,
    error
  } = useAlbums();

  if (loading) {
    return <h2>Loading: {loading}</h2>
  }
  if (error) {
    return <h2>Error: {error}</h2>
  }

  return (
    <>
      {/* <Header /> */}
      <Albums />
    </>
  )
}

export default App
