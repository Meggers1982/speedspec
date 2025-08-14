import { type User, type InsertUser, type MVPPlan, type InsertMVPPlan } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getMVPPlan(id: string): Promise<MVPPlan | undefined>;
  getMVPPlansByUser(userId: string): Promise<MVPPlan[]>;
  createMVPPlan(plan: InsertMVPPlan & { userId?: string }): Promise<MVPPlan>;
  updateMVPPlan(id: string, plan: Partial<InsertMVPPlan>): Promise<MVPPlan | undefined>;
  deleteMVPPlan(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private mvpPlans: Map<string, MVPPlan>;

  constructor() {
    this.users = new Map();
    this.mvpPlans = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMVPPlan(id: string): Promise<MVPPlan | undefined> {
    return this.mvpPlans.get(id);
  }

  async getMVPPlansByUser(userId: string): Promise<MVPPlan[]> {
    return Array.from(this.mvpPlans.values()).filter(
      (plan) => plan.userId === userId
    );
  }

  async createMVPPlan(planData: InsertMVPPlan & { userId?: string }): Promise<MVPPlan> {
    const id = randomUUID();
    const plan: MVPPlan = {
      id,
      userId: planData.userId || null,
      title: planData.title,
      data: planData.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.mvpPlans.set(id, plan);
    return plan;
  }

  async updateMVPPlan(id: string, updateData: Partial<InsertMVPPlan>): Promise<MVPPlan | undefined> {
    const existing = this.mvpPlans.get(id);
    if (!existing) return undefined;

    const updated: MVPPlan = {
      ...existing,
      ...updateData,
      updatedAt: new Date(),
    };
    this.mvpPlans.set(id, updated);
    return updated;
  }

  async deleteMVPPlan(id: string): Promise<boolean> {
    return this.mvpPlans.delete(id);
  }
}

export const storage = new MemStorage();
