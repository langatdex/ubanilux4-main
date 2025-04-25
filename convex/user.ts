import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const newUserId = await ctx.db.insert("users", 
    {
        name:args.name,
        email:args.email,
        phone:args.phone,
        image:args.image,
        
    });
    return newUserId;
  },
});

export const fetchUsers = query({
  args: {},
  handler: async (ctx, args) => {
    const users = await ctx.db
    .query("users")
    .collect()

    return users
  },
});

export const fetchUserId = mutation({
    args: {
        id:v.id("users")
    },
    handler: async (ctx, args) => {
      const users = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"),args.id))
      .first()
  
      return users
    },
});

export const updateUser = mutation({
  args: {
    id:v.id("users"),
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const {id} = args
    const userFound = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"),id))
      .first()
    await ctx.db.patch(id,{...userFound,...args})
  },
});

export const deleteUser = mutation({
  args: {
    id:v.id("users"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
});