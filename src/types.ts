export interface Club {
  id: string;
  name: string;
  category: string;
  description: string;
  memberCount: number;
  growth: number;
  icon: string;
  matchScore?: number;
  tags: string[];
  image: string;
  isTrending?: boolean;
}

export interface Candidate {
  id: string;
  name: string;
  englishName: string;
  school: string;
  major: string;
  year: string;
  skills: string[];
  score: number;
  image: string;
  isTopMatch?: boolean;
  status?: 'pending' | 'interview' | 'admitted' | 'rejected';
}

export interface Application {
  id: string;
  clubName: string;
  clubIcon: string;
  clubCategory: string;
  position: string;
  status: 'applied' | 'screening' | 'interview' | 'admitted' | 'rejected';
  lastUpdated: string;
}
