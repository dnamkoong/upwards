import { useEffect, useState } from "react";

export const useGetTracklist = (id) => {
  const [tracklist, setTracklist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracklist = async (id) => {
      try {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
        const data = await response.json();
        const tracklist = data.results;
        const tracksOnly = tracklist.filter((track) => track.wrapperType === 'track');

        setTracklist(tracksOnly)
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTracklist(id);
  }, []);

  return {
    tracklist,
    loading,
    error
  }
}