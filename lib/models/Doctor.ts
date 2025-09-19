import type { ObjectId } from "mongodb"

export interface Doctor {
  _id?: ObjectId
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: string
  location: string
  availability: string
  image: string
  price: number
  languages: string[]
  education: string
  about: string
  acceptsInsurance: boolean
  gender: string
  specializations: string[]
  education_details: {
    degree: string
    school: string
    year: string
  }[]
  certifications: string[]
  availability_slots: {
    date: string
    time: string
    available: boolean
  }[]
  createdAt: Date
  updatedAt: Date
}

export interface Patient {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address?: string
  insuranceProvider?: string
  insuranceId?: string
  emergencyContact?: string
  emergencyPhone?: string
  medicalHistory?: {
    allergies: string[]
    medications: string[]
    conditions: string[]
  }
  createdAt: Date
  updatedAt: Date
}

export interface Appointment {
  _id?: ObjectId
  doctorId: ObjectId
  patientId: ObjectId
  date: Date
  time: string
  type: "video" | "in-person"
  status: "scheduled" | "completed" | "cancelled" | "no-show"
  reason: string
  symptoms?: string
  notes?: string
  price: number
  paymentStatus: "pending" | "paid" | "refunded"
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  _id?: ObjectId
  doctorId: ObjectId
  patientId: ObjectId
  appointmentId: ObjectId
  rating: number
  comment: string
  createdAt: Date
}
