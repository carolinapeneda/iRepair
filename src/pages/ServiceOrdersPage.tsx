import { useState } from "react"

export function ServiceOrdersPage() {

  const [cliente, setCliente] = useState("")
  const [aparelho, setAparelho] = useState("")
  const [servico, setServico] = useState("")
  const [status, setStatus] = useState("aberto")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log("Dados para enviar para a API:", {
      cliente,
      aparelho,
      servico,
      status
    })

    //limpar os campos após enviar
    setCliente("");
    setAparelho("");
    setServico("");
  }



    return (
      <div>
        <h1>Nova ordem de serviço</h1>
        <form onSubmit={handleSubmit} className="flex gap-3 items-end mb-8">
          <div className="flex flex-col">
            <label>Solicitante: </label>
            <input type="text" placeholder="Solicitante" 
            value={cliente} onChange={(e) => setCliente(e.target.value)} className="border p-2 rounded"/>
          </div>
          
          <div className="flex flex-col">
            <label>Aparelho: </label>
            <input type="text" placeholder="Aparelho" 
            value={aparelho} onChange={(e) => setAparelho(e.target.value)} className="border p-2 rounded"/>
          </div>
          
          <div className="flex flex-col">
            <label>Serviço: </label>
            <input type="text" placeholder="Serviço" 
            value={servico} onChange={(e) => setServico(e.target.value)} className="border p-2 rounded"/>
          </div>

          <div className="flex flex-col">
            <label>Status: </label>
            <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Selecione o status</option>
            <option value="Aberto">Aberto</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Finalizado">Finalizado</option>
          </select>
          </div>


          <button className="bg-blue-500 text-white border p-2 
          rounded hover:bg-blue-600">Adicionar OS</button>
        </form>
      </div>
    )
}
