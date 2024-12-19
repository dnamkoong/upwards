import { SortOptionsInterface } from "../types/sort";

export const sortOptions: SortOptionsInterface[] = [
  { name: 'artist', label: 'Artist (A-Z)', type: 'asc' },
  { name: 'artist', label: 'Artist (Z-A)', type: 'desc' },
  { name: 'title', label: 'Album (A-Z)', type: 'asc' },
  { name: 'title', label: 'Album (Z-A)', type: 'desc' },
  { name: 'releaseDate', label: 'Release Date (Newest)', type: 'desc' },
  { name: 'releaseDate', label: 'Release Date (Oldest)', type: 'asc' },
  { name: 'itemCount', label: 'Track Count (^)', type: 'asc' },
  { name: 'itemCount', label: 'Tracks (v)', type: 'desc' }
];
