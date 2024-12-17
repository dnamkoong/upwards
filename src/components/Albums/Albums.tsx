import { useAlbumsHook } from "../../hooks/useAlbums";

const Albums = () => {
  const { albums } = useAlbumsHook();

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li
            key={album.id.attributes['im:id']}
          >
            <p>title: {album.title.label}</p>
            <img src={album['im:image'][2].label} alt="album cover" />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Albums