"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Landmark, Sun, Palette, Utensils, Book } from "lucide-react"
import { useRouter } from "next/navigation"
export default function Home() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <header className="bg-gradient-to-r from-amber-600 to-red-600 text-white py-4 px-6 flex items-center justify-between sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <Landmark className="h-8 w-8" />
          <span className="text-2xl font-bold">HeriTech</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#festivals" className="text-sm font-medium hover:text-amber-200 transition-colors">
            Festivals
          </Link>
          <Link href="#art" className="text-sm font-medium hover:text-amber-200 transition-colors">
            Art
          </Link>
          <Link href="#cuisine" className="text-sm font-medium hover:text-amber-200 transition-colors">
            Cuisine
          </Link>
          <Link href="#history" className="text-sm font-medium hover:text-amber-200 transition-colors">
            History
          </Link>
        </nav>
        <div className="flex items-center gap-4">
        <Button onClick={() => router.push("/explor")} variant="outline" className="bg-white text-amber-600 hover:bg-amber-100">Explore</Button>
        <Button onClick={() => router.push("/login")} variant="outline" className="bg-white text-amber-600 hover:bg-amber-100">Login</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative h-[80vh]">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Taj Mahal"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-600/70 to-red-800/70 flex items-center justify-center">
            <div className="text-center text-white space-y-6 max-w-4xl px-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">Discover the Vibrant Heritage of India</h1>
              <p className="text-xl md:text-2xl">
                Embark on a digital journey through centuries of tradition, art, and cultural marvels
              </p>
              <Button size="lg" className="bg-white text-amber-600 hover:bg-amber-100">Start Your Journey</Button>
            </div>
          </div>
        </section>
        <section id="festivals" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-amber-800">Vibrant Festivals</h2>
                <p className="text-xl text-amber-600 mt-2">Celebrate the colors of Indian culture</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Diwali",
                    description: "The Festival of Lights, illuminating homes and hearts.",
                    image: "https://images.unsplash.com/photo-1636226942649-ee15d2a7ce04?q=80&w=2802&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  },
                  {
                    title: "Holi",
                    description: "A vibrant celebration of colors and spring's arrival.",
                    image: "https://images.unsplash.com/photo-1616884950055-861aeb5eb380?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  },
                  {
                    title: "Durga Puja",
                    description: "A grand celebration of divine feminine power.",
                    image: "https://images.unsplash.com/photo-1626094305702-3d81bec477a3?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                ].map((festival, index) => (
                  <div key={index} className="bg-amber-100 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                    <img src={festival.image} alt={festival.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-amber-800 mb-2">{festival.title}</h3>
                      <p className="text-amber-700">{festival.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="art" className="py-16 md:py-24 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-amber-800">Artistic Traditions</h2>
                <p className="text-xl text-amber-600 mt-2">Explore the rich tapestry of Indian art forms</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Madhubani",
                    description: "Intricate folk art from Bihar, depicting nature and mythology.",
                    image: "https://images.unsplash.com/photo-1629561918009-339e516be72f?q=80&w=2741&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  },
                  {
                    title: "Bharatanatyam",
                    description: "A classical dance form originating from Tamil Nadu.",
                    image: "https://images.unsplash.com/photo-1722440044211-e5ec891a2822?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  },
                  {
                    title: "Meenakari",
                    description: "The art of enameling, adorning jewelry and decorative items.",
                    image: "https://plus.unsplash.com/premium_photo-1664117187580-c48528437e04?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  }
                ].map((art, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                    <img src={art.image} alt={art.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-amber-800 mb-2">{art.title}</h3>
                      <p className="text-amber-700">{art.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="cuisine" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-amber-800">Culinary Delights</h2>
                <p className="text-xl text-amber-600 mt-2">Savor the flavors of India's diverse cuisine</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Butter Chicken",
                    description: "A creamy, tomato-based curry with tender chicken pieces.",
                    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  },
                  {
                    title: "Masala Dosa",
                    description: "A crispy crepe filled with spiced potatoes, served with chutneys.",
                    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  },
                  {
                    title: "Biryani",
                    description: "Fragrant rice dish with meat or vegetables, aromatic spices.",
                    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  }
                ].map((dish, index) => (
                  <div key={index} className="bg-amber-100 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                    <img src={dish.image} alt={dish.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-amber-800 mb-2">{dish.title}</h3>
                      <p className="text-amber-700">{dish.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="history" className="py-16 md:py-24 bg-amber-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-amber-800">Rich History</h2>
                <p className="text-xl text-amber-600 mt-2">Journey through the annals of Indian civilization</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Indus Valley Civilization",
                    description: "One of the world's oldest urban civilizations, known for advanced city planning.",
                    image: "https://images.unsplash.com/photo-1707928930919-2b479a4999cb?q=80&w=2724&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  },
                  {
                    title: "Maurya Empire",
                    description: "Ancient India's largest empire, known for Emperor Ashoka's reign.",
                    image: "https://images.unsplash.com/photo-1532664189809-02133fee698d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  },
                  {
                    title: "Mughal Era",
                    description: "Period of great cultural synthesis, art, and architectural marvels.",
                    image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  }
                ].map((era, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                    <img src={era.image} alt={era.title} className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-amber-800 mb-2">{era.title}</h3>
                      <p className="text-amber-700">{era.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-amber-600 to-red-600 text-white py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Landmark className="h-8 w-8" />
            <span className="text-2xl font-bold">HeriTech</span>
          </div>
          <nav className="flex gap-6">
            <Link href="#" className="text-sm hover:text-amber-200 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm hover:text-amber-200 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm hover:text-amber-200 transition-colors">Contact Us</Link>
          </nav>
        </div>
        <div className="container mx-auto mt-4 text-center text-sm">
          <p>&copy; 2024 HeriTech. All rights reserved. Celebrating Indian Heritage and Culture.</p>
        </div>
      </footer>
    </div>
  )
}