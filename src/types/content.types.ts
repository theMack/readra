export interface AuthorType {
    id: string;
    name: string;
    avatar: string;
  }
  
  export interface ContentType {
    id: string;
    title: string;
    description: string;
    author: AuthorType;
    coverImage: string;
    publicationDate: string;
    readingTime: number;
    category: string;
  }
  
  