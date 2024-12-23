import { useEffect, useState } from 'react';
import { AlbumInterface } from '../../types/albums';
import { ResultsInterface, TracklistInterface } from '../../types/tracklist';
import { msToTime } from '../../utils/time';
import styles from './Modal.module.scss'
import Loading from '../Loading/Loading';

interface ModalProps {
  album: AlbumInterface;
  onClose: () => void;
  hookRef: React.Ref<HTMLDivElement>;
}

const Modal = ({ album, onClose, hookRef }: ModalProps) => {
  const [tracklist, setTracklist] = useState<TracklistInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get tracks from selected album
    const fetchTracklist = async () => {
      try {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${album.id.attributes['im:id']}&entity=song`);
        const data = await response.json() as ResultsInterface;
        const tracklist = data.results;
        const tracksOnly = tracklist.filter((track) => track.wrapperType === 'track');

        setTracklist(tracksOnly)
      } catch (error: any) {
        console.log(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTracklist();
  }, [album.id.attributes]);

  return (
    <div
      className={styles.modal}
      ref={hookRef}
    >
      <div className={styles.backgroundImg}>
        <img
          src={album['im:image'][2].label}
          alt={`${album['im:name'].label}`}
        />
      </div>

      <button onClick={onClose}>X</button>

      <div className={styles.column}>
        <img
          src={album['im:image'][2].label}
          alt={`${album['im:name'].label}`}
          className={styles.albumImage}
        />

        <div className={styles.content}>
          <h2 className={styles.albumName}>{album['im:name'].label}</h2>
          <h3 className={styles.albumArtist}>{album['im:artist'].label}</h3>
          <p className={styles.albumCategory}>{album.category.attributes.label}</p>
          <p className={styles.albumItemCount}>{album['im:itemCount'].label} songs</p>
          <p className={styles.albumReleaseDate}>{album['im:releaseDate'].label.split('-')[0]}</p>
          <p className={styles.rights}>{album.rights.label}</p>
        </div>
      </div>

      <div className={styles.column}>
        {!loading ? (
          <>
            <h2 className={styles.tracksHeader}>Tracks</h2>

            <ul className={styles.tracklist}>
              {tracklist.map(({
                trackName,
                trackNumber,
                artistName,
                trackExplicitness,
                trackTimeMillis
              }, i) => (
                <li key={i}>
                  <div className={styles.row}>
                    <p className={styles.trackNumber}>{trackNumber}</p>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.column}>
                      <p className={styles.trackName}>
                        {trackName}
                        {trackExplicitness !== 'notExplicit' ? <span className={styles.trackExplicitness}>E</span> : ''}
                      </p>
                    </div>
                    <div className={styles.column}>
                      <p className={styles.trackArtistName}>{artistName}</p>
                    </div>
                  </div>
                  <div className={styles.row}>
                    <p className={styles.trackTime}>{msToTime(trackTimeMillis)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        ): <Loading />}
      </div>
    </div>
  )
};

export default Modal;