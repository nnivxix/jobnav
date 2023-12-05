export interface Job {
  uuid: string;
  company_id: number;
  title: string;
  posted_at: string;
  location: string;
  is_remote: boolean;
  salary: number;
  is_applied_by_user: boolean;
  description: string;
  company: Company;
}

export interface Company {
  name: string;
  slug: string;
  avatar: string;
  cover: string;
  owner: Owner;
  about: string;
  location: string;
  address: string;
  website: string;
}

export interface Owner {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  cover: string;
  user_skills: string[];
}

export type Jobs = Job[];
