import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Clock, Star, Users, Shield, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">HealthConnect</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/doctors" className="text-muted-foreground hover:text-primary transition-colors">
                Find Doctors
              </Link>
              <Link href="/specialties" className="text-muted-foreground hover:text-primary transition-colors">
                Specialties
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-balance mb-6">
            Find the Right Doctor for Your Health Journey
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Connect with trusted healthcare professionals in your area. Book appointments, read reviews, and take
            control of your health with confidence.
          </p>

          {/* Search Bar */}
          <div className="bg-card p-6 rounded-lg shadow-sm border max-w-2xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search doctors, specialties, or conditions..." className="pl-10" />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Enter your location" className="pl-10" />
              </div>
              <Button size="lg" className="md:px-8">
                Search
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Verified Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>10,000+ Patients Served</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <span>4.9/5 Average Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Specialties */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Popular Specialties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find specialists across various medical fields to address your specific health needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cardiology", count: "45 doctors", icon: "❤️" },
              { name: "Dermatology", count: "32 doctors", icon: "🧴" },
              { name: "Pediatrics", count: "28 doctors", icon: "👶" },
              { name: "Orthopedics", count: "38 doctors", icon: "🦴" },
              { name: "Neurology", count: "22 doctors", icon: "🧠" },
              { name: "Gynecology", count: "35 doctors", icon: "👩‍⚕️" },
              { name: "Psychiatry", count: "18 doctors", icon: "🧘" },
              { name: "General Practice", count: "67 doctors", icon: "🩺" },
            ].map((specialty) => (
              <Card key={specialty.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{specialty.icon}</div>
                  <h3 className="font-semibold mb-2">{specialty.name}</h3>
                  <p className="text-sm text-muted-foreground">{specialty.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Top-Rated Doctors</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet some of our highly-rated healthcare professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Cardiologist",
                rating: 4.9,
                reviews: 127,
                experience: "15 years",
                location: "New York, NY",
                image: "/professional-female-doctor.png",
              },
              {
                name: "Dr. Michael Chen",
                specialty: "Dermatologist",
                rating: 4.8,
                reviews: 89,
                experience: "12 years",
                location: "Los Angeles, CA",
                image: "/professional-male-doctor.png",
              },
              {
                name: "Dr. Emily Rodriguez",
                specialty: "Pediatrician",
                rating: 5.0,
                reviews: 156,
                experience: "18 years",
                location: "Chicago, IL",
                image: "/professional-female-pediatrician.png",
              },
            ].map((doctor) => (
              <Card key={doctor.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{doctor.name}</h3>
                      <p className="text-primary font-medium mb-2">{doctor.specialty}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">({doctor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{doctor.experience}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>
                      <Button className="w-full" size="sm">
                        Book Appointment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting the healthcare you need is simple with our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Search & Browse",
                description: "Find doctors by specialty, location, or insurance. Read reviews and compare profiles.",
              },
              {
                step: "2",
                title: "Book Appointment",
                description: "Choose a convenient time slot and book your appointment instantly online.",
              },
              {
                step: "3",
                title: "Get Care",
                description: "Attend your appointment and receive quality healthcare from verified professionals.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">HealthConnect</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Connecting patients with trusted healthcare professionals for better health outcomes.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Patients</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/find-doctors" className="hover:text-primary">
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link href="/book-appointment" className="hover:text-primary">
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link href="/patient-portal" className="hover:text-primary">
                    Patient Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Doctors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/doctor-signup" className="hover:text-primary">
                    Join Our Network
                  </Link>
                </li>
                <li>
                  <Link href="/doctor-portal" className="hover:text-primary">
                    Doctor Portal
                  </Link>
                </li>
                <li>
                  <Link href="/practice-management" className="hover:text-primary">
                    Practice Management
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HealthConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
