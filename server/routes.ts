import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMVPPlanSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // MVP Plans routes
  app.get("/api/mvp-plans", async (req, res) => {
    try {
      const userId = req.query.userId as string;
      const plans = userId 
        ? await storage.getMVPPlansByUser(userId)
        : [];
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch MVP plans" });
    }
  });

  app.get("/api/mvp-plans/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const plan = await storage.getMVPPlan(id);
      if (!plan) {
        return res.status(404).json({ message: "MVP plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch MVP plan" });
    }
  });

  app.post("/api/mvp-plans", async (req, res) => {
    try {
      const validationResult = insertMVPPlanSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid plan data",
          errors: validationResult.error.issues 
        });
      }

      const plan = await storage.createMVPPlan({
        ...validationResult.data,
        userId: req.body.userId,
      });
      res.status(201).json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to create MVP plan" });
    }
  });

  app.put("/api/mvp-plans/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validationResult = insertMVPPlanSchema.partial().safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid plan data",
          errors: validationResult.error.issues 
        });
      }

      const plan = await storage.updateMVPPlan(id, validationResult.data);
      if (!plan) {
        return res.status(404).json({ message: "MVP plan not found" });
      }
      res.json(plan);
    } catch (error) {
      res.status(500).json({ message: "Failed to update MVP plan" });
    }
  });

  app.delete("/api/mvp-plans/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteMVPPlan(id);
      if (!deleted) {
        return res.status(404).json({ message: "MVP plan not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete MVP plan" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
