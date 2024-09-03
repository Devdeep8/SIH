/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k8mkzfJfsTM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <NotebookIcon className="h-6 w-6" />
          <span className="text-xl font-bold">Indian Culture</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Festivals
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Art
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            Cuisine
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            History
          </Link>
        </nav>
        <Button variant="secondary">Explore</Button>
      </header>
      <main className="flex-1">
        <section className="relative h-[60vh] md:h-[80vh]">
          <img src="/placeholder.svg" alt="Indian Culture"  className="object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">Discover the Vibrant Culture of India</h1>
              <p className="text-lg md:text-xl">
                Explore the rich traditions, art, and history of this diverse nation.
              </p>
            </div>
          </div>
        </section>
        <section id="festivals" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 md:space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold">Festivals</h2>
                <p className="text-muted-foreground text-lg md:text-xl">Celebrate the vibrant festivals of India</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Diwali"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Diwali</h3>
                  <p className="text-muted-foreground">
                    The Festival of Lights, celebrated with vibrant colors and delicious sweets.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Holi"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Holi</h3>
                  <p className="text-muted-foreground">
                    The Festival of Colors, where people come together to play with vibrant powders.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Pongal"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Pongal</h3>
                  <p className="text-muted-foreground">
                    A harvest festival celebrated in South India, marked by delicious traditional dishes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="art" className="py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 md:space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold">Art</h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Explore the rich artistic traditions of India
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Rangoli"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Rangoli</h3>
                  <p className="text-muted-foreground">
                    Intricate and colorful floor designs, often created during festivals.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Miniature Painting"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Miniature Painting</h3>
                  <p className="text-muted-foreground">
                    Delicate and intricate paintings, often depicting scenes from Indian history and mythology.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Kathakali"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Kathakali</h3>
                  <p className="text-muted-foreground">
                    A traditional form of dance-drama from the state of Kerala, known for its elaborate costumes and
                    makeup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="cuisine" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 md:space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold">Cuisine</h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Savor the diverse and flavorful dishes of India
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Biryani"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Biryani</h3>
                  <p className="text-muted-foreground">
                    A fragrant and flavorful rice dish, often made with meat, vegetables, or seafood.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Dosa"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Dosa</h3>
                  <p className="text-muted-foreground">
                    A thin, crispy crepe-like dish, often served with a variety of chutneys and sambar.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Thali"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Thali</h3>
                  <p className="text-muted-foreground">
                    A platter featuring a variety of dishes, offering a comprehensive sampling of Indian cuisine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="history" className="py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 md:space-y-8">
              <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold">History</h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Discover the rich and diverse history of India
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Taj Mahal"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Taj Mahal</h3>
                  <p className="text-muted-foreground">
                    A magnificent mausoleum, built in the 17th century as a symbol of love and architectural marvel.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Red Fort"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Red Fort</h3>
                  <p className="text-muted-foreground">
                    A historic fort in Delhi, built in the 17th century and serving as the seat of the Mughal Empire.
                  </p>
                </div>
                <div className="bg-card p-4 rounded-lg shadow-md">
                  <img
                    src="/placeholder.svg"
                    alt="Khajuraho Temples"
                    width={400}
                    height={250}
                    className="rounded-lg mb-4 object-cover"
                    style={{ aspectRatio: "400/250", objectFit: "cover" }}
                  />
                  <h3 className="text-xl font-bold">Khajuraho Temples</h3>
                  <p className="text-muted-foreground">
                    A group of Hindu and Jain temples, known for their intricate and erotic carvings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground py-6 px-4 md:px-6">
        <div className="container flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">&copy; 2024 Indian Culture. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
              Privacy
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
              Terms
            </Link>
            <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NotebookIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M16 2v20" />
    </svg>
  )
}