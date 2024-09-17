import { relations } from 'drizzle-orm';
import { SQLiteAsyncDialect, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const leaguesTable = sqliteTable('leagues', {
  id: text('id').notNull().primaryKey().unique(),
  abbreviation: text('abbreviation').notNull(),
  displayName: text('display_name').notNull(),
  shortDisplayName: text('short_display_name').notNull(),
  colorPrimary: text('color_primary').notNull(),
  colorSecondary: text('color_secondary'),
  logoPrimary: text('logo_primary'),
  logoDark: text('logo_dark'),
  logoLight: text('logo_light')
});

export const conferencesTable = sqliteTable('conferences', {
  id: text('id').notNull().primaryKey().unique(),
  league: text('league')
    .notNull()
    .references(() => leaguesTable.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  abbreviation: text('abbreviation').notNull(),
  displayName: text('display_name').notNull(),
  shortDisplayName: text('short_display_name').notNull(),
  colorPrimary: text('color_primary').notNull(),
  colorSecondary: text('color_secondary'),
  logoPrimary: text('logo_primary'),
  logoDark: text('logo_dark'),
  logoLight: text('logo_light')
});

export const teamsTable = sqliteTable('teams', {
  id: text('id').notNull().primaryKey().unique(),
  league: text('league')
    .notNull()
    .references(() => leaguesTable.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  // conferencesTable: text('conf')
  // 	.notNull()
  // 	.references(() => leaguesTable.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  location: text('location').notNull(),
  nickname: text('nickname'),
  abbreviation: text('abbreviation').notNull(),
  displayName: text('display_name').notNull(),
  shortDisplayName: text('short_display_name').notNull(),
  colorPrimary: text('color_primary').notNull(),
  colorSecondary: text('color_secondary'),
  logoPrimary: text('logo_primary'),
  logoDark: text('logo_dark'),
  logoLight: text('logo_light')
});

export const teamsToConferencesTable = sqliteTable(
  'teamsToConferences',
  {
    teamId: text('team_id')
      .notNull()
      .references(() => teamsTable.id),
    conferenceId: text('conference_id')
      .notNull()
      .references(() => conferencesTable.id)
  },
  (t) => ({ pk: primaryKey({ columns: [t.teamId, t.conferenceId] }) })
);

export const teamRelations = relations(teamsTable, ({ many, one }) => ({
  conferences: many(teamsToConferencesTable),
  league: one(leaguesTable, {
    fields: [teamsTable.id],
    references: [leaguesTable.id]
  })
}));

export const conferenceRelations = relations(conferencesTable, ({ one, many }) => ({
  league: one(leaguesTable, {
    fields: [conferencesTable.id],
    references: [leaguesTable.id]
  }),
  teams: many(teamsToConferencesTable)
}));

export const teamsToConferencesRelations = relations(teamsToConferencesTable, ({ one }) => ({
  team: one(teamsTable, {
    fields: [teamsToConferencesTable.teamId],
    references: [teamsTable.id]
  }),
  conference: one(conferencesTable, {
    fields: [teamsToConferencesTable.teamId],
    references: [conferencesTable.id]
  })
}));

export const sqliteDialect = new SQLiteAsyncDialect();
