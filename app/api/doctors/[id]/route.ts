import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { Doctor } from "@/lib/models/Doctor"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const doctorsCollection = db.collection<Doctor>("doctors")

    const doctor = await doctorsCollection.findOne({
      _id: new ObjectId(id),
    })

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    return NextResponse.json(doctor)
  } catch (error) {
    console.error("Error fetching doctor:", error)
    return NextResponse.json({ error: "Failed to fetch doctor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const updateData = await request.json()

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const doctorsCollection = db.collection<Doctor>("doctors")

    const result = await doctorsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Doctor updated successfully",
    })
  } catch (error) {
    console.error("Error updating doctor:", error)
    return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 })
    }

    const db = await getDatabase()
    const doctorsCollection = db.collection<Doctor>("doctors")

    const result = await doctorsCollection.deleteOne({
      _id: new ObjectId(id),
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Doctor deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting doctor:", error)
    return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 })
  }
}
