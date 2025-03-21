export interface Snippet {
  id?: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
  healthScore?: number;
  userId?: string;
}

export interface SnippetHealth {
  score: number;
  issues: HealthIssue[];
}

export interface HealthIssue {
  type: 'complexity' | 'length' | 'formatting' | 'performance';
  severity: 'low' | 'medium' | 'high';
  message: string;
  suggestion?: string;
}