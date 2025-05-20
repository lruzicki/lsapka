export default function SupportSection() {
  return (
    <section id="wsparcie" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Wsparcie - 1,5%</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Możesz wesprzeć naszą działalność przekazując 1,5% swojego podatku. Dzięki Twojemu wsparciu możemy
            organizować więcej wydarzeń i lepiej realizować naszą misję.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-6 text-[rgb(var(--primary))]">Jak przekazać 1,5% podatku?</h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-700">
                <li>
                  <span className="font-medium">Wypełnij swój PIT</span> - rozlicz się z urzędem skarbowym jak co roku.
                </li>
                <li>
                  <span className="font-medium">Znajdź rubrykę</span> - w swoim zeznaniu podatkowym znajdź rubrykę
                  "Wniosek o przekazanie 1,5% podatku należnego na rzecz organizacji pożytku publicznego (OPP)".
                </li>
                <li>
                  <span className="font-medium">Wpisz numer KRS</span> - w odpowiednie pole wpisz numer KRS naszej
                  organizacji: <span className="font-bold">0000111988</span>.
                </li>
                <li>
                  <span className="font-medium">Wpisz kwotę</span> - oblicz 1,5% swojego podatku i wpisz obliczoną kwotę
                  (lub program do rozliczeń zrobi to za Ciebie).
                </li>
                <li>
                  <span className="font-medium">Wyraź zgodę na przekazanie danych</span> - jeśli chcesz, możesz wyrazić
                  zgodę na przekazanie nam swoich danych, dzięki czemu będziemy mogli Ci podziękować.
                </li>
              </ol>
            </div>
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="text-center mb-6">
                <span className="text-6xl font-bold text-[rgb(var(--accent))]">1,5%</span>
                <p className="text-xl mt-2">Twojego podatku</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg w-full">
                <h4 className="font-bold text-lg mb-4">Dane do przekazania 1,5%</h4>
                <div className="space-y-2">
                  <div className="grid grid-cols-[120px_1fr] items-center">
                    <span className="font-medium">Numer KRS:</span>
                    <span className="font-bold">0000111988</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] items-center">
                    <span className="font-medium">Nazwa:</span>
                    <span>Niezależny Krąg Instruktorów Harcerskich „Leśna Szkółka"</span>
                  </div>
                  <div className="grid grid-cols-[120px_1fr] items-center">
                    <span className="font-medium">Cel szczegółowy:</span>
                    <span>Wsparcie działalności statutowej</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
