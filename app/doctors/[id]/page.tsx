import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Calendar, MessageCircle, Award, GraduationCap, Languages } from "lucide-react"
import Image from "next/image"

// Mock data - in real app, this would come from database
const doctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  rating: 4.9,
  reviews: 127,
  experience: "15+ years",
  location: "New York, NY",
  availability: "Available Today",
  image: "/professional-female-doctor.png",
  price: "$200",
  languages: ["English", "Spanish"],
  education: "Harvard Medical School",
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in preventive cardiology and heart disease management. She specializes in treating complex cardiovascular conditions and has published numerous research papers in leading medical journals.",
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
    { date: "Today", time: "2:00 PM", available: true },
    { date: "Today", time: "4:30 PM", available: true },
    { date: "Tomorrow", time: "9:00 AM", available: true },
    { date: "Tomorrow", time: "11:30 AM", available: false },
    { date: "Tomorrow", time: "3:00 PM", available: true },
  ],
}

const reviews = [
  {
    id: 1,
    patient: "John D.",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Dr. Johnson is exceptional. She took the time to explain my condition thoroughly and created a comprehensive treatment plan. Highly recommend!",
  },
  {
    id: 2,
    patient: "Maria S.",
    rating: 5,
    date: "1 month ago",
    comment:
      "Very professional and knowledgeable. The appointment was on time and she answered all my questions patiently.",
  },
  {
    id: 3,
    patient: "Robert K.",
    rating: 4,
    date: "2 months ago",
    comment:
      "Great experience overall. Dr. Johnson helped me understand my heart condition and provided excellent care.",
  },
]

export default function DoctorProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Doctor Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Doctor Image */}
              <div className="flex-shrink-0">
                <div className="relative w-48 h-48 mx-auto lg:mx-0">
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">{doctor.name}</h1>
                  <p className="text-xl text-primary font-medium mb-4">{doctor.specialty}</p>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium text-lg">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {doctor.experience}
                    </Badge>
                  </div>

                  {/* Location and Availability */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{doctor.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-600 font-medium">{doctor.availability}</span>
                    </div>
                  </div>

                  {/* Price and Booking */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div>
                      <p className="text-3xl font-bold text-foreground">{doctor.price}</p>
                      <p className="text-sm text-muted-foreground">per consultation</p>
                    </div>
                    <div className="flex gap-3">
                      <Button size="lg" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Book Appointment
                      </Button>
                      <Button variant="outline" size="lg" className="flex items-center gap-2 bg-transparent">
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About Dr. {doctor.name.split(" ")[1]}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">{doctor.about}</p>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Specializations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Languages className="h-4 w-4" />
                    Languages Spoken
                  </h3>
                  <div className="flex gap-2">
                    {doctor.languages.map((lang, index) => (
                      <Badge key={index} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Time Slots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {doctor.availability_slots.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{slot.date}</p>
                        <p className="text-muted-foreground">{slot.time}</p>
                      </div>
                      <Button variant={slot.available ? "default" : "secondary"} disabled={!slot.available}>
                        {slot.available ? "Book Now" : "Unavailable"}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Reviews ({doctor.reviews})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.patient}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {doctor.education_details.map((edu, index) => (
                    <div key={index} className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-muted-foreground">{edu.school}</p>
                      </div>
                      <Badge variant="outline">{edu.year}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {doctor.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
