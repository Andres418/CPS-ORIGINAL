export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  hasDiscount?: boolean;
  discountPrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CarouselImage {
  id: number;
  url: string;
  alt: string;
}

export interface DiscountSettings {
  minItems: number;
  discountedProducts: number[];
}

export interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
  watchLink: string;
  releaseDate: string;
  isNew: boolean;
}

export interface MovieSection {
  newReleases: Movie[];
  topMovies: Movie[];
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  url: string;
}

export interface StoreSettings {
  isOpen: boolean;
  welcomeVideo: {
    url: string;
    enabled: boolean;
  };
  businessHours: {
    start: string;
    end: string;
  };
  socialLinks: SocialLink[];
  tutorials: Tutorial[];
}