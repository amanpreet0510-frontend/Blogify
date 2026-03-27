import type { PortableTextBlock } from "@portabletext/types";

// Category type
export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

// Blog type for listing
export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  featuredImage?: SanityImage | null;
  publishedAt: string;
  author: string;
  categories?: Category[];
  showSearch?: boolean;
}

// Full blog type with content
export interface BlogPostFull extends BlogPost {
  content: PortableTextBlock[];
}

// Sanity image type
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// Blog slug type for static generation
export interface BlogSlug {
  slug: string;
}

//About page type
export interface About {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  description?: string;
  featuredImage?: SanityImage;
  content: PortableTextBlock[];
}

//Travel page type
export interface Travel {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  blogs?: BlogPost[];
}

//Eat page type
export interface Eat {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  blogs?: BlogPost[];
}

//Header type
export interface Header {
  title: string;
  logoUrl: string;
  navigation: {
    label: string;
    link: string;
    openInNewTab: boolean;
  }[];
  cta: {
    label: string;
    link: string;
  };
  socialIcons: {
    iconUrl: string;
    link: string;
    openInNewTab: boolean;
  }[];
}

//Hero Section type
export interface Herosection {
  _type: "heroSection";
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  description?: string;
  backgroundImage: SanityImage;
  blogs?: BlogPost[];
}

//Brands section type

export interface Brands {
  _type: "brands";
  title: string;
  brandLogos: {
    iconUrl: string;
    link: string;
    openInNewTab: boolean;
  }[];
}

//Social section type

export interface Socials {
  _type: "socials";
  title: string;
  socialIcons: {
    title:string;
    iconUrl: string;
    link: string;
    openInNewTab: boolean;
  }[];
  featuredImages: {
    imageUrl: string;
    link: string;
    openInNewTab: boolean;
  }[];
}


//page type

export type Section = Herosection | Brands | Socials;

export interface Page {
  _id: string;
  title: string;
  sections: Section[];
}

//Footer type
export interface Footer {
  title: string;
  featuredImage: string;
  description: string;
  linkColumns: {
    title: string;
    links: {
      label: string;
      url: string;
    }[];
  }[];
  newsletter: {
    title: string;
    emailLabel: string;
    placeholder: string;
    checkboxText: string;
    isCheckboxRequired: boolean;
    buttonText: string;
  };
  socialIcons: {
    iconUrl: string;
    link: string;
    openInNewTab: boolean;
  }[];
  copyright: string;
}

// Video type
export interface Video {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  thumbnail: string;
  videoUrl: string;
  category: string;
}

// Video Page type
export interface VideoPage {
  _id: string;
  title: string;
  description: string;
  featuredVideo: Video;
}

