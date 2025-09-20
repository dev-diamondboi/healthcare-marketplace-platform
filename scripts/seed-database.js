const { MongoClient } = require("mongodb")

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = "healthconnect"

const sampleDoctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.9,
    reviews: 127,
    experience: "15+ years",
    location: "New York, NY",
    availability: "Available Today",
    image: "/professional-female-doctor.png",
    price: 200,
    languages: ["English", "Spanish"],
    education: "Harvard Medical School",
    about: "Specialized in preventive cardiology and heart disease management with over 15 years of experience.",
    acceptsInsurance: true,
    gender: "Female",
    specializations: [
      "Preventive Cardiology",
      "Heart Disease Management",
      "Cardiac Rehabilitation",
      "Hypertension Treatment",
    ],
    education_details: [
      {
        degree: "MD",
        school: "Harvard Medical School",
        year: "2008",
      },
      {
        degree: "Residency in Internal Medicine",
        school: "Massachusetts General Hospital",
        year: "2011",
      },
      {
        degree: "Fellowship in Cardiology",
        school: "Brigham and Women's Hospital",
        year: "2014",
      },
    ],
    certifications: [
      "Board Certified in Cardiology",
      "Board Certified in Internal Medicine",
      "Advanced Cardiac Life Support (ACLS)",
      "Nuclear Cardiology Certification",
    ],
    availability_slots: [
      { date: "2024-01-15", time: "09:00", available: true },
      { date: "2024-01-15", time: "10:30", available: true },
      { date: "2024-01-15", time: "14:00", available: true },
      { date: "2024-01-15", time: "15:30", available: false },
      { date: "2024-01-16", time: "09:00", available: true },
      { date: "2024-01-16", time: "11:00", available: true },
      { date: "2024-01-16", time: "13:30", available: true },
      { date: "2024-01-16", time: "16:00", available: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Dermatology",
    rating: 4.8,
    reviews: 89,
    experience: "12+ years",
    location: "Los Angeles, CA",
    availability: "Next Available: Tomorrow",
    image: "/professional-male-doctor.png",
    price: 180,
    languages: ["English", "Mandarin"],
    education: "Stanford University School of Medicine",
    about: "Expert in cosmetic and medical dermatology, focusing on skin cancer prevention and treatment.",
    acceptsInsurance: true,
    gender: "Male",
    specializations: ["Medical Dermatology", "Cosmetic Dermatology", "Skin Cancer Treatment", "Mohs Surgery"],
    education_details: [
      {
        degree: "MD",
        school: "Stanford University School of Medicine",
        year: "2011",
      },
      {
        degree: "Residency in Dermatology",
        school: "UCSF Medical Center",
        year: "2015",
      },
    ],
    certifications: [
      "Board Certified in Dermatology",
      "Mohs Surgery Certification",
      "Cosmetic Dermatology Certification",
    ],
    availability_slots: [
      { date: "2024-01-16", time: "10:00", available: true },
      { date: "2024-01-16", time: "14:30", available: true },
      { date: "2024-01-17", time: "09:30", available: true },
      { date: "2024-01-17", time: "15:00", available: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    rating: 4.9,
    reviews: 156,
    experience: "10+ years",
    location: "Chicago, IL",
    availability: "Available Today",
    image: "/professional-female-pediatrician.png",
    price: 150,
    languages: ["English", "Spanish"],
    education: "Johns Hopkins School of Medicine",
    about: "Dedicated pediatrician specializing in child development and preventive care for infants to adolescents.",
    acceptsInsurance: false,
    gender: "Female",
    specializations: ["Child Development", "Preventive Care", "Adolescent Medicine", "Pediatric Immunizations"],
    education_details: [
      {
        degree: "MD",
        school: "Johns Hopkins School of Medicine",
        year: "2013",
      },
      {
        degree: "Residency in Pediatrics",
        school: "Children's Hospital of Philadelphia",
        year: "2016",
      },
    ],
    certifications: [
      "Board Certified in Pediatrics",
      "Pediatric Advanced Life Support (PALS)",
      "Child Development Specialist",
    ],
    availability_slots: [
      { date: "2024-01-15", time: "08:00", available: true },
      { date: "2024-01-15", time: "11:30", available: true },
      { date: "2024-01-15", time: "16:30", available: true },
      { date: "2024-01-16", time: "09:00", available: true },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // Clear existing data
    await db.collection("doctors").deleteMany({})
    await db.collection("patients").deleteMany({})
    await db.collection("appointments").deleteMany({})
    await db.collection("reviews").deleteMany({})

    console.log("Cleared existing data")

    // Insert sample doctors
    const doctorsResult = await db.collection("doctors").insertMany(sampleDoctors)
    console.log(`Inserted ${doctorsResult.insertedCount} doctors`)

    // Create indexes for better performance
    await db.collection("doctors").createIndex({ specialty: 1 })
    await db.collection("doctors").createIndex({ location: 1 })
    await db.collection("doctors").createIndex({ rating: -1 })
    await db.collection("doctors").createIndex({ price: 1 })
    await db.collection("doctors").createIndex({ languages: 1 })

    await db.collection("appointments").createIndex({ doctorId: 1 })
    await db.collection("appointments").createIndex({ patientId: 1 })
    await db.collection("appointments").createIndex({ date: 1 })
    await db.collection("appointments").createIndex({ status: 1 })

    await db.collection("patients").createIndex({ email: 1 }, { unique: true })

    console.log("Created database indexes")
    console.log("Database seeded successfully!")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
