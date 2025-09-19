import { type NextRequest, NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import type { Patient } from "@/lib/models/Doctor"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const db = await getDatabase()
    const patientsCollection = db.collection<Patient>("patients")

    const filter: any = {}
    if (email) {
      filter.email = email
    }

    const skip = (page - 1) * limit

    const patients = await patientsCollection.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()

    const total = await patientsCollection.countDocuments(filter)

    return NextResponse.json({
      patients,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching patients:", error)
    return NextResponse.json({ error: "Failed to fetch patients" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json()

    const db = await getDatabase()
    const patientsCollection = db.collection<Patient>("patients")

    // Check if patient already exists
    const existingPatient = await patientsCollection.findOne({
      email: patientData.email,
    })

    if (existingPatient) {
      return NextResponse.json({ error: "Patient with this email already exists" }, { status: 409 })
    }

    const newPatient: Patient = {
      ...patientData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await patientsCollection.insertOne(newPatient)

    return NextResponse.json(
      {
        message: "Patient created successfully",
        patientId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating patient:", error)
    return NextResponse.json({ error: "Failed to create patient" }, { status: 500 })
  }
}
