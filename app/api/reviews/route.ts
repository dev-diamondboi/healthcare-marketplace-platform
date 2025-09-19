import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { Review } from "@/lib/models/Doctor"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get("doctorId")
    const patientId = searchParams.get("patientId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const db = await getDatabase()
    const reviewsCollection = db.collection<Review>("reviews")

    const filter: any = {}

    if (doctorId && ObjectId.isValid(doctorId)) {
      filter.doctorId = new ObjectId(doctorId)
    }

    if (patientId && ObjectId.isValid(patientId)) {
      filter.patientId = new ObjectId(patientId)
    }

    const skip = (page - 1) * limit

    const reviews = await reviewsCollection
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "patients",
            localField: "patientId",
            foreignField: "_id",
            as: "patient",
          },
        },
        { $unwind: "$patient" },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            rating: 1,
            comment: 1,
            createdAt: 1,
            "patient.firstName": 1,
            "patient.lastName": 1,
          },
        },
      ])
      .toArray()

    const total = await reviewsCollection.countDocuments(filter)

    return NextResponse.json({
      reviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const reviewData = await request.json()

    const db = await getDatabase()
    const reviewsCollection = db.collection<Review>("reviews")

    const newReview: Review = {
      doctorId: new ObjectId(reviewData.doctorId),
      patientId: new ObjectId(reviewData.patientId),
      appointmentId: new ObjectId(reviewData.appointmentId),
      rating: reviewData.rating,
      comment: reviewData.comment,
      createdAt: new Date(),
    }

    const result = await reviewsCollection.insertOne(newReview)

    // Update doctor's average rating
    const doctorsCollection = db.collection("doctors")
    const reviews = await reviewsCollection
      .find({
        doctorId: new ObjectId(reviewData.doctorId),
      })
      .toArray()

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    const reviewCount = reviews.length

    await doctorsCollection.updateOne(
      { _id: new ObjectId(reviewData.doctorId) },
      {
        $set: {
          rating: Math.round(averageRating * 10) / 10,
          reviews: reviewCount,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json(
      {
        message: "Review created successfully",
        reviewId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
