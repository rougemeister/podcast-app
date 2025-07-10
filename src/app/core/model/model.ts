//Authentication and User Management Models
export interface LoginCredentials {
  email: string;
  password: string;
}


export interface RegisterCredentials {
  name: string;
  email: string; 
  password: string; 
  password_confirmation: string;
  role: string; 
}

export interface AuthResponse {
  status: string;
  data: any;
  token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

export interface Episode {
  id: number;
  title: string;
  description: string;
  img_url: string;
  audio_url: string;
  duration: string;
  posted_on: string;
  season: string;
  episode: string;
  spotify_url: string;
  apple_podcasts_url: string;
  archive: string;
  featured: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface EpisodeResponse {
  status: string;
  data: Episode[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

export interface SocialMediaLink {
  platform: string;
  url: string;
}

export interface Team {
  name: string;
  role: string;
  bio: string;
  profile_image: string;
  social_media_links: SocialMediaLink[];
}

export interface TeamResponse {
  status: string;
  data: Team[];
  meta?: {
    total: number;
    page: number;
    last_page: number;
  };
}

