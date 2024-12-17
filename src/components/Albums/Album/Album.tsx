import styles from './Album.module.scss';

const Album = ({ album }) => {
  return (
    <li className={styles.album}>
      <div className={styles.imageContainer}>
        <img
          src={album['im:image'][2].label}
          alt="album cover"
          className={styles.mainImage}
        />

        <img
          src={album['im:image'][2].label}
          alt="album cover"
          className={styles.hoverImage}
        />
      </div>
      <h3>{album['im:name'].label}</h3>
      <p>{album['im:artist'].label}</p>
    </li>
  )
}

export default Album;