import { mutation } from "./_generated/server";

export const createUser = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", identity?.email as string))
      .unique();

    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity?.name) {
        await ctx.db.patch(user._id, { name: identity?.name });
      }
      return user._id;
    } else {
      const newUser = await ctx.db.insert("users", {
        name: identity?.name as string,
        email: identity?.email?.toLowerCase() as string,
        isEmailVerified: identity?.emailVerified as boolean,
        clerkUserId: identity?.subject as string,
        avatarUrl: identity?.pictureUrl as string,
        tokenIdentifier: identity?.tokenIdentifier as string,
        isActive: true,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return newUser;
    }
  },
});
