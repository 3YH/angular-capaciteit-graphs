export interface ContactActivityAccessor {
  propertyName: string;
  propertyAccessor(contactActivity: ContactActivity): number;
}
