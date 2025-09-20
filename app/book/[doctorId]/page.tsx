"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, MapPin, CreditCard, Shield, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"

// Mock data - in real app, this would come from database
const doctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  rating: 4.9,
  reviews: 127,
  location: "New York, NY",
  image: "/professional-female-doctor.png",
  price: 200,
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
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
]

export default function BookAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState("")
  const [appointmentType, setAppointmentType] = useState("video")
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    reason: "",
    symptoms: "",
    medications: "",
    allergies: "",
    insuranceProvider: "",
    insuranceId: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleBooking = () => {
    // In real app, this would submit to API
    console.log("Booking appointment:", {
      doctor: doctor.id,
      date: selectedDate,
      time: selectedTime,
      type: appointmentType,
      patient: formData,
    })
    alert("Appointment booked successfully!")
  }

  const getAvailableSlots = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return timeSlots.filter((time) => {
      const slot = doctor.availability_slots.find((s) => s.date === dateStr && s.time === time)
      return slot?.available !== false
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/doctors"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Doctors
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground mt-2">Schedule your consultation with {doctor.name}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Info Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <Image
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{doctor.name}</h3>
                    <p className="text-primary">{doctor.specialty}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">({doctor.reviews})</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Consultation Fee:</span>
                      <span className="font-semibold">${doctor.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee:</span>
                      <span className="font-semibold">$10</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-3">
                      <span>Total:</span>
                      <span>${doctor.price + 10}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure & Protected</span>
                  </div>
                  <p className="text-sm text-emerald-600 mt-1">
                    Your payment and personal information are encrypted and secure.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Step {step} of 3</CardTitle>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>

                      {/* Appointment Type */}
                      <div className="mb-6">
                        <Label className="text-base font-medium">Appointment Type</Label>
                        <RadioGroup value={appointmentType} onValueChange={setAppointmentType} className="mt-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="video" id="video" />
                            <Label htmlFor="video">Video Consultation ($200)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <Label htmlFor="in-person">In-Person Visit ($200)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {/* Date Selection */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label className="text-base font-medium">Select Date</Label>
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            disabled={(date) => date < new Date()}
                            className="rounded-md border mt-2"
                          />
                        </div>

                        {/* Time Selection */}
                        <div>
                          <Label className="text-base font-medium">Available Times</Label>
                          {selectedDate ? (
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              {getAvailableSlots(selectedDate).map((time) => (
                                <Button
                                  key={time}
                                  variant={selectedTime === time ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => setSelectedTime(time)}
                                  className="justify-center"
                                >
                                  {time}
                                </Button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground mt-2">Please select a date first</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Patient Information</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="reason">Reason for Visit *</Label>
                      <Textarea
                        id="reason"
                        placeholder="Please describe the reason for your appointment..."
                        value={formData.reason}
                        onChange={(e) => handleInputChange("reason", e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="symptoms">Current Symptoms</Label>
                      <Textarea
                        id="symptoms"
                        placeholder="Describe any symptoms you're experiencing..."
                        value={formData.symptoms}
                        onChange={(e) => handleInputChange("symptoms", e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="medications">Current Medications</Label>
                        <Textarea
                          id="medications"
                          placeholder="List any medications you're taking..."
                          value={formData.medications}
                          onChange={(e) => handleInputChange("medications", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="allergies">Allergies</Label>
                        <Textarea
                          id="allergies"
                          placeholder="List any known allergies..."
                          value={formData.allergies}
                          onChange={(e) => handleInputChange("allergies", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Payment & Insurance</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                        <Select onValueChange={(value) => handleInputChange("insuranceProvider", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select insurance provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="aetna">Aetna</SelectItem>
                            <SelectItem value="bluecross">Blue Cross Blue Shield</SelectItem>
                            <SelectItem value="cigna">Cigna</SelectItem>
                            <SelectItem value="humana">Humana</SelectItem>
                            <SelectItem value="united">United Healthcare</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="none">No Insurance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="insuranceId">Insurance ID</Label>
                        <Input
                          id="insuranceId"
                          value={formData.insuranceId}
                          onChange={(e) => handleInputChange("insuranceId", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Appointment Summary */}
                    <div className="bg-muted p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Appointment Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Doctor:</span>
                          <span>{doctor.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Date:</span>
                          <span>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time:</span>
                          <span>{selectedTime || "Not selected"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="capitalize">{appointmentType.replace("-", " ")}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-2">
                          <span>Total:</span>
                          <span>${doctor.price + 10}</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the Terms of Service and Privacy Policy. I understand that this platform facilitates
                        appointments but does not provide medical advice.
                      </Label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button variant="outline" onClick={handleBack} disabled={step === 1}>
                    Back
                  </Button>

                  {step < 3 ? (
                    <Button
                      onClick={handleNext}
                      disabled={
                        (step === 1 && (!selectedDate || !selectedTime)) ||
                        (step === 2 &&
                          (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
                      }
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleBooking}
                      className="flex items-center gap-2"
                      disabled={!formData.firstName || !formData.lastName || !formData.email}
                    >
                      <CreditCard className="h-4 w-4" />
                      Book & Pay ${doctor.price + 10}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
