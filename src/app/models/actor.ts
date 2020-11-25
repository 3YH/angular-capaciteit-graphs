import { Company } from './company';

export abstract class Actor {
  public company: Company;
  public actorId: string;
  public contactActivities: ContactActivity[];
}
