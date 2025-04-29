import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const createCar = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    price: v.number(),
    status: v.union(
        v.literal("available"),
        v.literal("rented"),
        v.literal("maintenance"),
    ),
    image: v.optional(v.union(v.id("_storage"),v.string())),
    year: v.number(),
    mileage: v.number(),
    fuelType: v.string(),
    transmission: v.string(),
    seats: v.optional(v.number()),
    doors: v.optional(v.number()),
    features: v.optional(v.array(v.string())),
    description: v.string(),
    images: v.array(v.union(v.id("_storage"),v.string())),
  },
  handler: async (ctx, args) => {
    const newCarId = await ctx.db.insert("cars", 
    {
        name:args.name,
        category:args.category,
        price:args.price,
        status:args.status,
        image:args.image,
        year:args.year,
        mileage:args.mileage,
        fuelType:args.fuelType,
        transmission:args.transmission,
        seats:args.seats,
        doors:args.doors,
        features:args.features,
        description:args.description,
        images:args.images,
    });
    return newCarId;
  },
});

export const fetchCars = query({
  args: {},
  handler: async (ctx, args) => {
    const cars = await ctx.db
    .query("cars")
    .order("desc")
    .collect()

    return Promise.all(
      cars.map(async (car) => ({
        ...car,
        image: car.image && typeof car.image === 'string' && car.image.includes('https') 
          ? car.image 
          : car.image ? await ctx.storage.getUrl(car.image) : null,        
      }))
    )
  },
});

export const fetchCarId = query({
    args: {
        id:v.id("cars")
    },
    handler: async (ctx, args) => {
      const cars = await ctx.db
      .query("cars")
      .filter((q) => q.eq(q.field("_id"),args.id))
      .first()
      
      // const carFound = async () => ({
      //   ...cars,
      //   image:cars?.image.includes('https') ? cars.image : await ctx.storage.getUrl(cars?.image),        
      //   images:cars?.images.map(async (d) => d.includes('https') ? d : await ctx.storage.getUrl(d))
      // })      
      
      return new Promise((resolve, reject) => {
        try {
          if (!cars) {
            resolve(null);
            return;
          }

          const getImageUrl = cars.image && typeof cars.image === 'string' && cars.image.includes('https')
            ? Promise.resolve(cars.image)
            : cars.image ? ctx.storage.getUrl(cars.image) : Promise.resolve(null);
    
          const imagesPromise = Promise.all(
            (cars.images || []).map(d =>
              typeof d === 'string' && d.includes('https') ? Promise.resolve(d) : ctx.storage.getUrl(d)
            )
          );
    
          Promise.all([getImageUrl, imagesPromise])
            .then(([imageUrl, resolvedImages]) => {
              resolve({
                ...cars,
                image: imageUrl,
                images: resolvedImages
              });
            })
            .catch(reject);
    
        } catch (err) {
          reject(err);
        }
      });

    },
});

export const updateCar = mutation({
  args: {
    id:v.id("cars"),
    name: v.string(),
    category: v.string(),
    price: v.number(),
    status: v.union(
        v.literal("available"),
        v.literal("rented"),
        v.literal("maintenance"),
    ),
    image: v.optional(v.union(v.id("_storage"),v.string())),
    year: v.number(),
    mileage: v.number(),
    fuelType: v.string(),
    transmission: v.string(),
    seats: v.optional(v.number()),
    doors: v.optional(v.number()),
    features: v.optional(v.array(v.string())),
    description: v.string(),
    images: v.optional(v.array(v.union(v.id("_storage"),v.string()))),
  },
  handler: async (ctx, args) => {
    const {id} = args
    
    await ctx.db.replace(id,{
      name:args.name,
      category:args.category,
      price:args.price,
      status:args.status,
      image:args.image,
      year:args.year,
      mileage:args.mileage,
      fuelType:args.fuelType,
      transmission:args.transmission,
      seats:args.seats,
      doors:args.doors,
      features:args.features,
      description:args.description,
      images:args.images,
    })
  },
});

export const deleteCar = mutation({
  args: {
    id:v.id("cars"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});