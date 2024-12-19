import { useEffect, useState } from "react";
import { ResultsInterface, TracklistInterface } from "../types/tracklist";

export const useGetTracklist = (id: string) => {
  const [tracklist, setTracklist] = useState<TracklistInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracklist = async (id: string) => {
      try {
        const response = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
        const data = await response.json() as ResultsInterface;
        const tracklist = data.results;
        const tracksOnly = tracklist.filter((track) => track.wrapperType === 'track');

        setTracklist(tracksOnly)
      } catch (error: any) {
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