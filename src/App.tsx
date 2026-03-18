import { useState } from "react"
import Header from "./components/Header"
import NewServiceForm from "./components/NewServiceForm"
import ServiceCard from "./components/ServiceCard"

interface ServiceOrder {
  cliente: string
  aparelho: string
  servico: string
  status: string
}

function App() {

  const [services, setServices] = useState<ServiceOrder[]>
  ([{
    cliente: "Maria Eduarda",
    aparelho: "TV",
    servico: "Conserto de tela",
    status: "Aberto"
  }])

  function addService(newService: ServiceOrder) {
    setServices([...services, newService])
  }

  return (
    <>
      <div className="max-w-3x1 mx-auto p-6 space-y-3 min-h-screen bg-gray-100 font-sans">
        <Header />
        <NewServiceForm addService={addService} />
        <div className="flex gap-4 flex-wrap">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              cliente={service.cliente}
              aparelho={service.aparelho}
              servico={service.servico}
              status={service.status}
            />
          ))}
          </div>
      </div>
    </>
  )
}

export default App
