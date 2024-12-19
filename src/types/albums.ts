export interface AlbumInterface {
  category: {
    attributes: {
      'im:id': string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  id: {
    attributes: {
      'im:id': string;
    };
    label: string;
  };
  'im:artist': {
    attributes: {
      href: string;
    };
    label: string;
  };
  'im:contentType': {
    attributes: {
      label: 'Album' | 'Music';
      term: 'Album' | 'Music';
    };
    'im:contentType': {
      attributes: {
        label: 'Album' | 'Music';
        term: 'Album' | 'Music';
      };
    };
  };
  'im:image': Array<{
    attributes: {
      height: string;
    };
    label: string;
  }>;
  'im:itemCount': {
    label: string;
  };
  'im:name': {
    label: string;
  };
  'im:price': {
    attributes: {
      amount: string;
      currency: string;
    };
    label: string;
  };
  'im:releaseDate': {
    attributes: {
      label: string;
    };
    label: string;
  };
  link: {
    attributes: {
      href: string;
      rel: string;
      type: string;
    };
  };
  rights: {
    label: string;
  };
  title: {
    label: string;
  };
}

export interface AlbumsInterface {
  albums: AlbumInterface[];
  loading: boolean;
  error: string | null;
}

export interface FeedInterface {
  feed: {
    author: {
      name: {
        label: string;
      };
      uri: {
        label: string;
      };
    };
    entry: AlbumInterface[];
    icon: {
      label: string;
    };
    id: {
      label: string;
    };
    link: Array<{
      attributes: {
        rel: 'alternate' | 'self';
        type?: 'text/html';
        href: string;
      };
    }>;
    rights: {
      label: string;
    };
    title: {
      label: string;
    };
    updated: {
      label: string;
    };
  };
}