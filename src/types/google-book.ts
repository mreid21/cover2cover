type IndustryIdentifier = {
    type: string;
    identifier: string;
};

type ReadingModes = {
    text: boolean;
    image: boolean;
};

type PanelizationSummary = {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
};

type ImageLinks = {
    smallThumbnail?: string;
    thumbnail?: string;
};

export type VolumeInfo = {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
};

export type GoogleBooksAPIResponse = {
    items: {id: string, volumeInfo: VolumeInfo}[]
}