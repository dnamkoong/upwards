import styles from './Album.module.scss';

const Album = ({ album }) => {
  return (
    <li className={styles.album}>
      <img src={album['im:image'][2].label} alt="album cover" />
      <p>title: {album.title.label}</p>
      <p>artist: {album['im:artist'].label}</p>
    </li>
  )
}

export default Album;