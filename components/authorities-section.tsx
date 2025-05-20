import Image from "next/image"

export default function AuthoritiesSection() {
  return (
    <section id="wladze" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Władze</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Poznaj władze Niezależnego Kręgu Instruktorów Harcerskich „Leśna Szkółka".
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm text-center">
            <div className="relative h-64 w-full">
              <Image src="/placeholder.svg?height=400&width=400" alt="Komendant Kręgu" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">hm. Jan Kowalski</h3>
              <p className="text-[rgb(var(--primary))] font-medium mb-4">Komendant Kręgu</p>
              <p className="text-gray-600 mb-4">
                Instruktor z 20-letnim stażem, specjalista w zakresie metodyki harcerskiej i organizacji obozów.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:komendant@lesnaszkolka.pl" className="text-gray-600 hover:text-[rgb(var(--primary))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a href="tel:+48123456789" className="text-gray-600 hover:text-[rgb(var(--primary))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm text-center">
            <div className="relative h-64 w-full">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Zastępca Komendanta"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">hm. Anna Nowak</h3>
              <p className="text-[rgb(var(--primary))] font-medium mb-4">Zastępca Komendanta</p>
              <p className="text-gray-600 mb-4">
                Instruktorka z 15-letnim stażem, specjalistka w zakresie pracy z kadrą i kształcenia instruktorów.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:zastepca@lesnaszkolka.pl" className="text-gray-600 hover:text-[rgb(var(--primary))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a href="tel:+48123456789" className="text-gray-600 hover:text-[rgb(var(--primary))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm text-center">
            <div className="relative h-64 w-full">
              <Image src="/placeholder.svg?height=400&width=400" alt="Skarbnik" fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">phm. Piotr Wiśniewski</h3>
              <p className="text-[rgb(var(--primary))] font-medium mb-4">Skarbnik</p>
              <p className="text-gray-600 mb-4">
                Instruktor z 10-letnim stażem, odpowiedzialny za finanse i sprawy organizacyjne Kręgu.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="mailto:skarbnik@lesnaszkolka.pl" className="text-gray-600 hover:text-[rgb(var(--primary))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
                <a href="tel:+48123456789" className="text-gray-600 hover:text-[rgb(var(--primary))]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Komisja Rewizyjna</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 relative">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Przewodniczący KR"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="text-lg font-bold mb-1">hm. Marek Zieliński</h4>
              <p className="text-[rgb(var(--primary))] font-medium">Przewodniczący KR</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 relative">
                <Image src="/placeholder.svg?height=200&width=200" alt="Członek KR" fill className="object-cover" />
              </div>
              <h4 className="text-lg font-bold mb-1">phm. Katarzyna Dąbrowska</h4>
              <p className="text-[rgb(var(--primary))] font-medium">Członek KR</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 relative">
                <Image src="/placeholder.svg?height=200&width=200" alt="Członek KR" fill className="object-cover" />
              </div>
              <h4 className="text-lg font-bold mb-1">pwd. Tomasz Lewandowski</h4>
              <p className="text-[rgb(var(--primary))] font-medium">Członek KR</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
