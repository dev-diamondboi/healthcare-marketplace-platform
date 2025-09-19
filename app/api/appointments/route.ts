import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getDatabase } from "@/lib/mongodb"
import type { Appointment, Patient } from "@/lib/models/Doctor"

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json()

    const db = await getDatabase()
    const appointmentsCollection = db.collection<Appointment>("appointments")
    const patientsCollection = db.collection<Patient>("patients")

    // Create or update patient
    const patientData: Patient = {
      firstName: appointmentData.patient.firstName,
      lastName: appointmentData.patient.lastName,
      email: appointmentData.patient.email,
      phone: appointmentData.patient.phone,
      dateOfBirth: appointmentData.patient.dateOfBirth,
      insuranceProvider: appointmentData.patient.insuranceProvider,
      insuranceId: appointmentData.patient.insuranceId,
      emergencyContact: appointmentData.patient.emergencyContact,
      emergencyPhone: appointmentData.patient.emergencyPhone,
      medicalHistory: {
        allergies: appointmentData.patient.allergies ? [appointmentData.patient.allergies] : [],
        medications: appointmentData.patient.medications ? [appointmentData.patient.medications] : [],
        conditions: [],
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Check if patient exists
    let patient = await patientsCollection.findOne({ email: patientData.email })

    if (!patient) {
      const patientResult = await patientsCollection.insertOne(patientData)
      patient = { ...patientData, _id: patientResult.insertedId }
    } else {
      // Update existing patient
      await patientsCollection.updateOne({ _id: patient._id }, { $set: { ...patientData, updatedAt: new Date() } })
    }

    // Create appointment
    const newAppointment: Appointment = {
      doctorId: new ObjectId(appointmentData.doctorId),
      patientId: patient._id!,
      date: new Date(appointmentData.date),
      time: appointmentData.time,
      type: appointmentData.type,
      status: "scheduled",
      reason: appointmentData.reason,
      symptoms: appointmentData.symptoms,
      price: appointmentData.price,
      paymentStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await appointmentsCollection.insertOne(newAppointment)

    return NextResponse.json(
      {
        message: "Appointment booked successfully",
        appointmentId: result.insertedId,
        patientId: patient._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error booking appointment:", error)
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get("doctorId")
    const patientId = searchParams.get("patientId")
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const db = await getDatabase()
    const appointmentsCollection = db.collection<Appointment>("appointments")

    const filter: any = {}

    if (doctorId && ObjectId.isValid(doctorId)) {
      filter.doctorId = new ObjectId(doctorId)
    }

    if (patientId && ObjectId.isValid(patientId)) {
      filter.patientId = new ObjectId(patientId)
    }

    if (status) {
      filter.status = status
    }

    const skip = (page - 1) * limit

    const appointments = await appointmentsCollection
      .aggregate([
        { $match: filter },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctor",
          },
        },
        {
          $lookup: {
            from: "patients",
            localField: "patientId",
            foreignField: "_id",
            as: "patient",
          },
        },
        { $unwind: "$doctor" },
        { $unwind: "$patient" },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray()

    const total = await appointmentsCollection.countDocuments(filter)

    return NextResponse.json({
      appointments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 })
  }
}
