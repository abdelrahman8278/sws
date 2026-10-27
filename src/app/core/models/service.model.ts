export interface AgencyService {
  readonly id: string;
  readonly discipline: string;
  readonly disciplineKey: string;
  readonly discipline_en?: string;
  readonly discipline_ar?: string;
  readonly title: string;
  readonly titleKey: string;
  readonly title_en?: string;
  readonly title_ar?: string;
  readonly description: string;
  readonly descKey: string;
  readonly desc_en?: string;
  readonly desc_ar?: string;
  readonly footerTag: string;
  readonly tagKey: string;
  readonly tag_en?: string;
  readonly tag_ar?: string;
  readonly icon: string;
}
