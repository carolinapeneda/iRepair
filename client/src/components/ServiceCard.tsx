interface ServiceCardProps {
  cliente: string;
  aparelho: string
  servico: string
  status:string
}

function ServiceCard(props: ServiceCardProps) {
  return (
    <div className="border rounded p-4 shadow w-80 h-80 bg-white text-center 
    space-y-4 flex flex-col justify-center">

      <p className={`text-white text-sm px-10 py-1 rounded w-fit mx-auto ${
      props.status === "Aberto"
        ? "bg-green-500"
        : props.status === "Em andamento"
        ? "bg-yellow-500"
        : props.status === "Finalizado"
        ? "bg-gray-500"
        : "bg-blue-500"
    }`}>
      {props.status}
      </p>
      <div className="mt-3 space-y-3">
        <div>
          <p className="font-semibold">Solicitante:</p>
          <p>{props.cliente}</p>
        </div>

        <div>
          <p className="font-semibold">Aparelho:</p> 
          <p>{props.aparelho}</p>
        </div>

        <div>
          <p className="font-semibold">Serviço:</p>
          <p>{props.servico}</p> 
        </div>
      </div>
    </div>
  )
}

export default ServiceCard