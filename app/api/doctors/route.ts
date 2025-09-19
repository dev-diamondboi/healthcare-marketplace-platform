import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Doctor } from "@/lib/models/Doctor"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const location = searchParams.get("location")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minRating = searchParams.get("minRating")
    const languages = searchParams.get("languages")?.split(",")
    const availableToday = searchParams.get("availableToday") === "true"
    const acceptsInsurance = searchParams.get("acceptsInsurance") === "true"
    const gender = searchParams.get("gender")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "rating"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const db = await getDatabase()
    const doctorsCollection = db.collection<Doctor>("doctors")

    // Build filter query
    const filter: any = {}

    if (specialty && specialty !== "All Specialties") {
      filter.specialty = specialty
    }

    if (location && location !== "All Locations") {
      filter.location = location
    }

    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) filter.price.$lte = Number.parseInt(maxPrice)
    }

    if (minRating) {
      filter.rating = { $gte: Number.parseFloat(minRating) }
    }

    if (languages && languages.length > 0) {
      filter.languages = { $in: languages }
    }

    if (availableToday) {
      filter.availability = { $regex: "Available Today", $options: "i" }
    }

    if (acceptsInsurance) {
      filter.acceptsInsurance = true
    }

    if (gender && gender !== "All") {
      filter.gender = gender
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ]
    }

    // Build sort query
    let sort: any = {}
    switch (sortBy) {
      case "rating":
        sort = { rating: -1 }
        break
      case "price-low":
        sort = { price: 1 }
        break
      case "price-high":
        sort = { price: -1 }
        break
      case "experience":
        sort = { experience: -1 }
        break
      case "reviews":
        sort = { reviews: -1 }
        break
      default:
        sort = { rating: -1 }
    }

    const skip = (page - 1) * limit

    const doctors = await doctorsCollection.find(filter).sort(sort).skip(skip).limit(limit).toArray()

    const total = await doctorsCollection.countDocuments(filter)

    return NextResponse.json({
      doctors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const doctorData = await request.json()

    const db = await getDatabase()
    const doctorsCollection = db.collection<Doctor>("doctors")

    const newDoctor: Doctor = {
      ...doctorData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await doctorsCollection.insertOne(newDoctor)

    return NextResponse.json(
      {
        message: "Doctor created successfully",
        doctorId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating doctor:", error)
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 })
  }
}
