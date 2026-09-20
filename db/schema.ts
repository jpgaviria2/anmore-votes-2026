import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const communityQuestions = sqliteTable("community_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  question: text("question").notNull(),
  name: text("name"),
  email: text("email"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const candidateSubmissions = sqliteTable("candidate_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  candidateName: text("candidate_name").notNull(),
  verificationEmail: text("verification_email").notNull(),
  phone: text("phone"),
  biography: text("biography").notNull(),
  occupation: text("occupation"),
  communityService: text("community_service"),
  website: text("website"),
  linkedIn: text("linkedin"),
  portraitUrl: text("portrait_url"),
  answers: text("answers", { mode: "json" }).$type<string[]>().notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
