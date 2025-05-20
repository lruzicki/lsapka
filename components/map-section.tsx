export default function MapSection() {
  return (
    <section id="mapa" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Mapa drużyn</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">Znajdź nasze drużyny i kręgi instruktorskie w całej Polsce.</p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="aspect-w-16 aspect-h-9 w-full h-[400px] relative">
            {/* Tutaj będzie mapa - na razie placeholder */}
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Mapa lokalizacji naszych drużyn</p>
            </div>
          </div>
          <div className="p-8">
            <h3 className="text-xl font-bold mb-6">Nasze lokalizacje</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Gdańsk</h4>
                  <p className="text-gray-600">3 DH "Morskie Fale"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Gdynia</h4>
                  <p className="text-gray-600">5 DH "Bałtyckie Orły"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sopot</h4>
                  <p className="text-gray-600">7 DH "Nadmorskie Sokoły"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Warszawa</h4>
                  <p className="text-gray-600">1 DH "Leśne Wilki"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">5</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Kraków</h4>
                  <p className="text-gray-600">2 DH "Sokoły"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">6</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Poznań</h4>
                  <p className="text-gray-600">4 DH "Puszczyki"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">7</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Wrocław</h4>
                  <p className="text-gray-600">8 DH "Odrzańskie Bobry"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">8</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Łódź</h4>
                  <p className="text-gray-600">9 DH "Miejskie Jastrzębie"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">9</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Szczecin</h4>
                  <p className="text-gray-600">10 DH "Portowe Fregaty"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">10</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Katowice</h4>
                  <p className="text-gray-600">11 DH "Śląskie Orły"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-[rgb(var(--primary))] flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">11</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg">Lublin</h4>
                  <p className="text-gray-600">12 DH "Wschodni Tropiciele"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
