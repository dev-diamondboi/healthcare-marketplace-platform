import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  Heart,
  Activity,
  Bell,
  Settings,
  User,
  Plus,
} from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
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
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's an overview of your health journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-secondary/10 rounded-full">
                      <FileText className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Medical Records</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-full">
                      <Activity className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">98%</p>
                      <p className="text-sm text-muted-foreground">Health Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Appointments */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Upcoming Appointments</CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Book New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      doctor: "Dr. Sarah Johnson",
                      specialty: "Cardiologist",
                      date: "Tomorrow",
                      time: "10:30 AM",
                      type: "Follow-up",
                      location: "Heart Center, Room 205",
                      avatar: "/professional-female-doctor.png",
                    },
                    {
                      doctor: "Dr. Michael Chen",
                      specialty: "Dermatologist",
                      date: "March 25",
                      time: "2:15 PM",
                      type: "Consultation",
                      location: "Skin Clinic, Room 102",
                      avatar: "/professional-male-doctor.png",
                    },
                    {
                      doctor: "Dr. Emily Rodriguez",
                      specialty: "General Practice",
                      date: "March 28",
                      time: "9:00 AM",
                      type: "Annual Checkup",
                      location: "Main Clinic, Room 301",
                      avatar: "/professional-female-pediatrician.png",
                    },
                  ].map((appointment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <Avatar>
                        <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {appointment.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{appointment.doctor}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {appointment.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{appointment.specialty}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">Join Call</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Medical Records */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Medical Records</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/records">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: "Blood Test Results",
                      doctor: "Dr. Sarah Johnson",
                      date: "March 15, 2024",
                      type: "Lab Report",
                    },
                    {
                      title: "Cardiology Consultation",
                      doctor: "Dr. Sarah Johnson",
                      date: "March 10, 2024",
                      type: "Visit Summary",
                    },
                    {
                      title: "Prescription Refill",
                      doctor: "Dr. Emily Rodriguez",
                      date: "March 8, 2024",
                      type: "Prescription",
                    },
                  ].map((record, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{record.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {record.doctor} • {record.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{record.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <Avatar className="w-20 h-20 mx-auto mb-3">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Patient ID: #12345</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>john.doe@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Born: Jan 15, 1985</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline" size="sm">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Health Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Health Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Health</span>
                      <span className="text-sm text-primary font-semibold">Excellent</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "98%" }}></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Blood Pressure</span>
                      <span className="text-primary">120/80</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Heart Rate</span>
                      <span className="text-primary">72 bpm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>BMI</span>
                      <span className="text-primary">22.5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/book-appointment">
                      <Plus className="h-4 w-4 mr-2" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/find-doctors">
                      <User className="h-4 w-4 mr-2" />
                      Find Doctors
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/prescriptions">
                      <FileText className="h-4 w-4 mr-2" />
                      View Prescriptions
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="ghost" asChild>
                    <Link href="/test-results">
                      <Activity className="h-4 w-4 mr-2" />
                      Test Results
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
