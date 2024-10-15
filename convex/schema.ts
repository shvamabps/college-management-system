import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    isEmailVerified: v.boolean(),
    clerkUserId: v.string(),
    tokenIdentifier: v.string(),
    avatarUrl: v.optional(v.string()),
    isActive: v.boolean(),
    isDeleted: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_clerk_user_id", ["clerkUserId"])
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),

  colleges: defineTable({
    collegeName: v.string(),
    collegeGroupName: v.optional(v.string()),
    establishedYear: v.string(),
    affiliatedWith: v.optional(v.string()),
    collegeBoard: v.string(),
    registeredBy: v.id("users"),
  })
    .index("by_registered_by", ["registeredBy"])
    .index("by_college_name", ["collegeName"])
    .index("by_established_year", ["establishedYear"]),
});
