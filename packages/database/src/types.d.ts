import { conferencesTable, leaguesTable, teamsTable } from '$lib/server/database/tables';
import type { InferSelectModel } from 'drizzle-orm';

export type League = InferSelectModel<typeof leaguesTable>;
export type Conference = InferSelectModel<typeof conferencesTable>;
export type Team = InferSelectModel<typeof teamsTable>;

export type TeamWithLeagueConference = Omit<Team, 'league'> & {
  league: League;
  conferences: { conference: Conference }[];
};
