import { useAlbums } from './hooks/useAlbums';
import Albums from './components/Albums/Albums';
import Loading from './components/Loading/Loading';
import './styles/main.scss';

function App() {
  const {
    loading,
    error
  } = useAlbums();

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <h2>Error: {error}</h2>
  }

  return (
    <>
      <Albums />
    </>
  )
}

export default App
