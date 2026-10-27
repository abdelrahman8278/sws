export interface Briefing {
  readonly id: string;
  readonly entity_name: string;
  readonly representative_name: string;
  readonly official_email: string;
  readonly mandate_scope: string;
  readonly message: string;
  readonly status: 'new' | 'in_review' | 'completed';
  readonly created_at: string;
}

export interface CreateBriefingDto {
  entity_name: string;
  representative_name: string;
  official_email: string;
  mandate_scope: string;
  message: string;
}
