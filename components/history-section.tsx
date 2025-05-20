import Image from "next/image"

export default function HistorySection() {
  return (
    <section id="historia" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Historia</h2>
          <div className="w-20 h-1 bg-[rgb(var(--primary))] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700">
            Poznaj historię Niezależnego Kręgu Instruktorów Harcerskich „Leśna Szkółka" od jego powstania do dnia
            dzisiejszego.
          </p>
        </div>

        <div className="space-y-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Początki (1981)</h3>
              <p className="text-gray-700 mb-4">
                Początków Kręgu można upatrywać w kursie instruktorskim Leśna Szkółka, prowadzonym przez hm. Jerzego
                Gacha w dniach 25 czerwca-16 lipca 1981, w ramach obozu ZHP w Wygoninie.
              </p>
              <p className="text-gray-700">
                Nazwa kursu był dosłownym tłumaczeniem kryptonimiu czeskich leśnych kursów instruktorskich - Lesní
                Škola. Kurs był prowadzony metodą puszczańską, kładł nacisk na samodzielność uczestników i ich
                zaangażowanie w proces kształcenia.
              </p>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-80">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Zdjęcie historyczne - początek Leśnej Szkółki"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Lata 80. i 90.</h3>
              <p className="text-gray-700 mb-4">
                W latach 80. i 90. Krąg rozwijał swoją działalność, organizując kolejne kursy instruktorskie i
                specjalistyczne. W tym okresie wypracowano charakterystyczny styl pracy, łączący tradycyjne wartości
                harcerskie z nowoczesnymi metodami wychowawczymi.
              </p>
              <p className="text-gray-700">
                Instruktorzy Kręgu aktywnie uczestniczyli w przemianach polskiego harcerstwa po 1989 roku, wnosząc swój
                wkład w odnowę ruchu harcerskiego w wolnej Polsce.
              </p>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-80">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Zdjęcie historyczne - lata 80. i 90."
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold mb-4">Współczesność</h3>
              <p className="text-gray-700 mb-4">
                Obecnie Niezależny Krąg Instruktorów Harcerskich „Leśna Szkółka" kontynuuje swoją misję kształcenia
                instruktorów harcerskich i wspierania rozwoju drużyn. Organizujemy kursy, warsztaty, obozy i inne
                wydarzenia, które pomagają w rozwoju metodycznym i osobistym harcerzy i instruktorów.
              </p>
              <p className="text-gray-700">
                Naszym celem jest wychowanie młodych ludzi na świadomych, odpowiedzialnych i aktywnych obywateli,
                kierujących się w życiu wartościami harcerskimi.
              </p>
            </div>
            <div className="md:w-1/2 relative h-64 md:h-80">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Współczesna działalność Leśnej Szkółki"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
