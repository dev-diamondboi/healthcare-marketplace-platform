"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Star, MapPin, Clock, Search, SlidersHorizontal, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const doctors = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Neurology",
    rating: 4.7,
    reviews: 203,
    experience: "20+ years",
    location: "Boston, MA",
    availability: "Available Today",
    image: "/professional-male-doctor.png",
    price: 250,
    languages: ["English"],
    education: "Mayo Clinic College of Medicine",
    about: "Neurologist specializing in stroke prevention, epilepsy, and neurodegenerative diseases.",
    acceptsInsurance: true,
    gender: "Male",
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    specialty: "Psychiatry",
    rating: 4.8,
    reviews: 94,
    experience: "8+ years",
    location: "Seattle, WA",
    availability: "Next Available: Tomorrow",
    image: "/professional-female-doctor.png",
    price: 220,
    languages: ["English", "Korean"],
    education: "University of Washington School of Medicine",
    about: "Psychiatrist focusing on anxiety, depression, and cognitive behavioral therapy.",
    acceptsInsurance: true,
    gender: "Female",
  },
]

const specialties = [
  "All Specialties",
  "Cardiology",
  "Dermatology",
  "Pediatrics",
  "Neurology",
  "Orthopedics",
  "Psychiatry",
  "Internal Medicine",
]

const locations = ["All Locations", "New York, NY", "Los Angeles, CA", "Chicago, IL", "Boston, MA", "Seattle, WA"]

const languages = ["English", "Spanish", "Mandarin", "Korean", "French", "German"]

export default function DoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [minRating, setMinRating] = useState(0)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])
  const [availableToday, setAvailableToday] = useState(false)
  const [acceptsInsurance, setAcceptsInsurance] = useState(false)
  const [selectedGender, setSelectedGender] = useState("All")
  const [sortBy, setSortBy] = useState("rating")

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      searchQuery === "" ||
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSpecialty = selectedSpecialty === "All Specialties" || doctor.specialty === selectedSpecialty
    const matchesLocation = selectedLocation === "All Locations" || doctor.location === selectedLocation
    const matchesPrice = doctor.price >= priceRange[0] && doctor.price <= priceRange[1]
    const matchesRating = doctor.rating >= minRating
    const matchesLanguages =
      selectedLanguages.length === 0 || selectedLanguages.some((lang) => doctor.languages.includes(lang))
    const matchesAvailability = !availableToday || doctor.availability.includes("Available Today")
    const matchesInsurance = !acceptsInsurance || doctor.acceptsInsurance
    const matchesGender = selectedGender === "All" || doctor.gender === selectedGender

    return (
      matchesSearch &&
      matchesSpecialty &&
      matchesLocation &&
      matchesPrice &&
      matchesRating &&
      matchesLanguages &&
      matchesAvailability &&
      matchesInsurance &&
      matchesGender
    )
  })

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "experience":
        return Number.parseInt(b.experience) - Number.parseInt(a.experience)
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  const handleLanguageChange = (language: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, language])
    } else {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== language))
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSpecialty("All Specialties")
    setSelectedLocation("All Locations")
    setPriceRange([0, 300])
    setMinRating(0)
    setSelectedLanguages([])
    setAvailableToday(false)
    setAcceptsInsurance(false)
    setSelectedGender("All")
    setSortBy("rating")
  }

  const activeFiltersCount = [
    selectedSpecialty !== "All Specialties",
    selectedLocation !== "All Locations",
    priceRange[0] > 0 || priceRange[1] < 300,
    minRating > 0,
    selectedLanguages.length > 0,
    availableToday,
    acceptsInsurance,
    selectedGender !== "All",
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Find Your Doctor</h1>
              <p className="text-muted-foreground mt-2">Browse our network of qualified healthcare professionals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Quick Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by doctor name, specialty, or location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Advanced Filters Sheet */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                  <SheetTitle>Advanced Filters</SheetTitle>
                  <SheetDescription>Refine your search to find the perfect doctor for your needs.</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <Label className="text-base font-medium">Price Range</Label>
                    <div className="mt-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={300}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <Label className="text-base font-medium">Minimum Rating</Label>
                    <div className="mt-2">
                      <Slider
                        value={[minRating]}
                        onValueChange={(value) => setMinRating(value[0])}
                        max={5}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>0</span>
                        <span>{minRating.toFixed(1)} stars</span>
                        <span>5</span>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <Label className="text-base font-medium">Languages</Label>
                    <div className="mt-2 space-y-2">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={selectedLanguages.includes(language)}
                            onCheckedChange={(checked) => handleLanguageChange(language, checked as boolean)}
                          />
                          <Label htmlFor={language}>{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <Label className="text-base font-medium">Doctor Gender</Label>
                    <Select value={selectedGender} onValueChange={setSelectedGender}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="available-today" checked={availableToday} onCheckedChange={setAvailableToday} />
                    <Label htmlFor="available-today">Available Today</Label>
                  </div>

                  {/* Insurance */}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="accepts-insurance" checked={acceptsInsurance} onCheckedChange={setAcceptsInsurance} />
                    <Label htmlFor="accepts-insurance">Accepts Insurance</Label>
                  </div>

                  {/* Clear Filters */}
                  <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                    <X className="h-4 w-4 mr-2" />
                    Clear All Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results Header with Sort */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-muted-foreground">
            Showing {sortedDoctors.length} of {doctors.length} doctors
            {activeFiltersCount > 0 && ` (${activeFiltersCount} filters applied)`}
          </p>
          <div className="flex items-center gap-2">
            <Label htmlFor="sort-by" className="text-sm">
              Sort by:
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="experience">Most Experienced</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {selectedSpecialty !== "All Specialties" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedSpecialty}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedSpecialty("All Specialties")} />
              </Badge>
            )}
            {selectedLocation !== "All Locations" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedLocation}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedLocation("All Locations")} />
              </Badge>
            )}
            {(priceRange[0] > 0 || priceRange[1] < 300) && (
              <Badge variant="secondary" className="flex items-center gap-1">
                ${priceRange[0]} - ${priceRange[1]}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 300])} />
              </Badge>
            )}
            {minRating > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {minRating.toFixed(1)}+ stars
                <X className="h-3 w-3 cursor-pointer" onClick={() => setMinRating(0)} />
              </Badge>
            )}
            {selectedLanguages.map((language) => (
              <Badge key={language} variant="secondary" className="flex items-center gap-1">
                {language}
                <X className="h-3 w-3 cursor-pointer" onClick={() => handleLanguageChange(language, false)} />
              </Badge>
            ))}
            {availableToday && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Available Today
                <X className="h-3 w-3 cursor-pointer" onClick={() => setAvailableToday(false)} />
              </Badge>
            )}
            {acceptsInsurance && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Accepts Insurance
                <X className="h-3 w-3 cursor-pointer" onClick={() => setAcceptsInsurance(false)} />
              </Badge>
            )}
            {selectedGender !== "All" && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {selectedGender}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedGender("All")} />
              </Badge>
            )}
          </div>
        )}

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {sortedDoctors.length > 0 ? (
            sortedDoctors.map((doctor) => (
              <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Doctor Image */}
                    <div className="flex-shrink-0">
                      <div className="relative w-32 h-32 mx-auto lg:mx-0">
                        <Image
                          src={doctor.image || "/placeholder.svg"}
                          alt={doctor.name}
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
                            <p className="text-primary font-medium">{doctor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">${doctor.price}</p>
                            <p className="text-sm text-muted-foreground">per consultation</p>
                          </div>
                        </div>
                      </div>

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span className="text-muted-foreground">({doctor.reviews} reviews)</span>
                        </div>
                        <Badge variant="secondary">{doctor.experience}</Badge>
                        {doctor.acceptsInsurance && (
                          <Badge variant="outline" className="text-emerald-600 border-emerald-600">
                            Insurance
                          </Badge>
                        )}
                      </div>

                      {/* Location and Availability */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{doctor.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">{doctor.availability}</span>
                        </div>
                      </div>

                      {/* About */}
                      <p className="text-muted-foreground text-sm">{doctor.about}</p>

                      {/* Education and Languages */}
                      <div className="flex flex-col sm:flex-row gap-4 text-sm">
                        <div>
                          <span className="font-medium">Education: </span>
                          <span className="text-muted-foreground">{doctor.education}</span>
                        </div>
                        <div>
                          <span className="font-medium">Languages: </span>
                          <span className="text-muted-foreground">{doctor.languages.join(", ")}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link href={`/book/${doctor.id}`} className="flex-1">
                          <Button className="w-full">Book Appointment</Button>
                        </Link>
                        <Link href={`/doctors/${doctor.id}`} className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">
                            View Profile
                          </Button>
                        </Link>
                        <Button variant="outline">Message</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No doctors found matching your criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Load More */}
        {sortedDoctors.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Doctors
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
