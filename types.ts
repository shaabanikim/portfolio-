export interface Profile {
  name: string;
  title: string;
  bio: string;
  profileImage: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
}

export interface Contact {
  email: string;
  phone: string;
  website: string;
  instagram: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
}

export interface Portfolio {
  profile: Profile;
  projects: Project[];
  contact: Contact;
  resources: Resource[];
}
