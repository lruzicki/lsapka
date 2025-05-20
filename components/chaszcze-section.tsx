import Image from "next/image"

export default function ChaszczeSection() {
  return (
    <section id="chaszcze" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Chaszcze</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            "Chaszcze" to nasz program edukacyjny dla młodzieży, który uczy samodzielności, pracy zespołowej i
            umiejętności przetrwania w lesie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary))]">O programie</h3>
            <p className="text-gray-700 mb-4">
              Program "Chaszcze" powstał z myślą o młodzieży w wieku 14-18 lat, która chce rozwijać swoje umiejętności
              survivalowe, poznawać przyrodę i uczyć się współpracy w zespole.
            </p>
            <p className="text-gray-700 mb-4">
              Zajęcia odbywają się w naturalnym środowisku leśnym, gdzie uczestnicy uczą się budować schronienia,
              rozpalać ogień, zdobywać i przygotowywać pożywienie, orientować się w terenie oraz udzielać pierwszej
              pomocy.
            </p>
            <p className="text-gray-700">
              Program kładzie duży nacisk na odpowiedzialność za środowisko naturalne i zrównoważone korzystanie z
              zasobów przyrody.
            </p>
          </div>

          <div className="relative h-64 lg:h-auto rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Program Chaszcze" fill className="object-cover" />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-tent"
              >
                <path d="M19 20 8 8l-5 6 9 9c.7.7 1.8.7 2.5 0H19c2.2 0 4-1.8 4-4s-1.8-4-4-4" />
                <path d="m3 14 7 7" />
                <path d="M5 9.3 2 7l3-3 2.3 3" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Umiejętności survivalowe</h3>
            <p className="text-gray-600">
              Nauka budowy schronień, rozpalania ognia, zdobywania wody i pożywienia w warunkach leśnych.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-compass"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Orientacja w terenie</h3>
            <p className="text-gray-600">
              Nauka posługiwania się mapą, kompasem i naturalnymi wskazówkami do orientacji w terenie.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="w-12 h-12 bg-[rgba(var(--primary),0.1)] rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart-pulse"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M3.22 12H9.5l.5-1 2 4 .5-1h6.78" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Pierwsza pomoc</h3>
            <p className="text-gray-600">
              Nauka udzielania pierwszej pomocy w warunkach terenowych, z wykorzystaniem dostępnych materiałów.
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <a
            href="#zapisy-chaszcze"
            className="bg-[rgb(var(--primary))] hover:bg-[rgb(var(--primary-dark))] text-white px-6 py-3 rounded-md transition-colors inline-block"
          >
            Zapisz się na program
          </a>
        </div>
      </div>
    </section>
  )
}
