import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `cover2cover_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  chaptersRead: many(chaptersReadBy),
  usersToClubs: many(usersToClubs)
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const moments = createTable("moments", {
  id: serial("id").primaryKey(),
  content: text('content').notNull(),
  createdById: varchar("createdById", { length: 255 }).references(
    () => users.id,
  ),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt"),
  chapterId: integer('chapter_id').references(() => chapters.id).notNull()
});

export const momentRelations = relations(moments, ({ one }) => ({
  chapter: one(chapters, {
    fields: [moments.chapterId],
    references: [chapters.id],
  }),
}));


export const chapters = createTable("chapter", {
  id: serial('id').primaryKey().notNull(),
  number: integer('number').notNull(),
  bookReadingId: integer("book_reading_id").notNull().references(() => bookReading.id)
})

export const chapterRelations = relations(chapters, ({ many }) => ({
  readBy: many(chaptersReadBy),
  moments: many(moments)
}));

export const chaptersReadBy = createTable("chapters_read_by", {
  chapterId: integer("chapter_id").notNull().references(() => chapters.id),
  userId: varchar("user_id", {length: 255}).notNull().references(() => users.id),
}, (table) => {
  return {
    pk: primaryKey({ columns: [table.chapterId, table.userId] }),
  };
});


export const clubs = createTable("club", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: varchar("ownerId", {length: 255}).notNull().references(() => users.id)
});

export const clubRelations = relations(clubs, ({many}) => ({
  readings: many(bookReading),
  usersToClubs: many(usersToClubs)
}))

export const bookReading = createTable("book_reading", {
  id: serial("id").primaryKey(),
  current: boolean("current").default(false),
  name: varchar("name", { length: 255 }).notNull(),
  bookId: varchar("book_id", {length: 255}),
  coverUrl: varchar("cover_url", {length: 255}),
  clubId: integer("club_id").notNull().references(() => clubs.id)
}, (table) => ({
  unq: unique('book-reading').on(table.name, table.clubId)
}))

export const bookReadingRelations = relations(bookReading, ({ many, one }) => ({
  chapters: many(chapters),
  club: one(clubs, {
    fields: [bookReading.clubId],
    references: [clubs.id]
  })
}));



export const usersToClubs = createTable('users_to_clubs', {
  clubId: integer('club_id').notNull().references(() => clubs.id),
  userId: varchar('user_id', {length: 255}).notNull().references(() => users.id),
  owner: boolean('owner').notNull().default(false)
}, (table) => ({
  pk: primaryKey({columns: [table.clubId, table.userId]})
}))

export const usersToClubsRelations = relations(usersToClubs, ({ one }) => ({
  club: one(clubs, {
    fields: [usersToClubs.clubId],
    references: [clubs.id],
  }),
  user: one(users, {
    fields: [usersToClubs.userId],
    references: [users.id],
  }),
}));