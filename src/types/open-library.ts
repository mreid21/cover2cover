export type OpenLibraryWork = {
  author_name: string[];
  cover_i?: number;
  key: string;
  title: string;
};

export type OpenLibrarySearchResponse = {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  docs: OpenLibraryWork[];
  num_found: number;
  q: string;
  offset: null;
};


