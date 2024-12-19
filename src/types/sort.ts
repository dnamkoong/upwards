export interface SortOptionsInterface {
  name: 'artist' | 'title' | 'releaseDate' | 'itemCount';
  label: string;
  type: 'asc' | 'desc';
}

export interface SortKeysInterface {
  [key: string]: string;
}

export interface SortedAlbumsInterface {
  [key: string]: any;
}