export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  color?: string;
  isPinned?: boolean;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}