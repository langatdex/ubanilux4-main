import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createBooking = mutation({
  args: {
    userId: v.string(),
    carId: v.id("cars"),
    startDate: v.string(),
    endDate: v.string(),
    status: v.union(
        v.literal("approved"),
        v.literal("denied"),
        v.literal("pending"),
        v.literal("cancelled"),
    ),
    paymentStatus: v.union(
        v.literal("paid"),
        v.literal("pending"),
        v.literal("failed"),
    ),
    paymentRef: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const newBookingId = await ctx.db.insert("bookings", 
    {
        userId:args.userId,
        carId:args.carId,
        startDate:args.startDate,
        endDate:args.endDate,
        status:args.status,
        paymentStatus:args.paymentStatus,
        paymentRef:args.paymentRef,
        
    });
    return newBookingId;
  },
});

export const fetchBookings = query({
  args: {

  },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
    .query("bookings")
    .order("desc")
    .collect()

    return Promise.all(
      bookings.map(async (booking) => {
        const car = await ctx.db.get(booking.carId);
        return {
          ...booking,
          car
        };
      })
    );
  },
});

export const fetchBookingId = query({
    args: {
        id:v.id("bookings")
    },
    handler: async (ctx, args) => {
      const bookings = await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("_id"),args.id))
      .first()
  
      return bookings
    },
});

export const fetchBookingUserId = query({
    args: {
      userId: v.string(),
    },
    handler: async (ctx, args) => {
      const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_userId",(q) => q.eq("userId",args.userId))
      .order("desc")
      .collect()
  
      
      return Promise.all(
        bookings.map(async (booking) => {
          const car = await ctx.db.get(booking.carId);
          return {
            ...booking,
            car
          };
        })
      );
    },
});

export const updateBooking = mutation({
  args: {
    id:v.id("bookings"),    
    status: v.union(
      v.literal("approved"),
      v.literal("denied"),
      v.literal("pending"),
      v.literal("cancelled"),
    ),    
  },
  handler: async (ctx, args) => {
    const {id,status} = args    
    await ctx.db.patch(id,{status})
  },
});

export const deleteBooking = mutation({
  args: {
    id:v.id("bookings"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
});