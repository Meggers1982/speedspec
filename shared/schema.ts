import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const mvpPlans = pgTable("mvp_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  title: text("title").notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMVPPlanSchema = createInsertSchema(mvpPlans).pick({
  title: true,
  data: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type MVPPlan = typeof mvpPlans.$inferSelect;
export type InsertMVPPlan = z.infer<typeof insertMVPPlanSchema>;
