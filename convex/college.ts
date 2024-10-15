import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const registerCollege = mutation({
  args: {
    collegeName: v.string(),
    collegeGroupName: v.optional(v.string()),
    establishedYear: v.string(),
    affiliatedWith: v.optional(v.string()),
    collegeBoard: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Login to register college.");
    }

    const getUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", user.email as string))
      .unique();

    const college = await ctx.db.insert("colleges", {
      collegeName: args.collegeName,
      collegeGroupName: args.collegeGroupName,
      establishedYear: args.establishedYear,
      affiliatedWith: args.affiliatedWith,
      collegeBoard: args.collegeBoard,
      registeredBy: getUser?._id as Id<"users">,
    });
    return college;
  },
});

export const getColleges = query({
  handler: async (ctx) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("Login to view colleges.");
    }

    const getUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", user.email as string))
      .unique();

    const colleges = await ctx.db
      .query("colleges")
      .withIndex("by_registered_by", (q) =>
        q.eq("registeredBy", getUser?._id as Id<"users">)
      )
      .collect();
    return colleges;
  },
});
