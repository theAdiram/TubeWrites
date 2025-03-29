
export interface PaperSection {
  heading: string;
  content: string;
}

export interface PaperContent {
  title: string;
  author: string;
  abstract: string;
  sections: PaperSection[];
  keyPoints: string[];
  references?: string[];
}
