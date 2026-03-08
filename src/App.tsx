import { useState } from "react"
import Header from "./components/Header"
import NewServiceForm from "./components/NewServiceForm"
import ServiceCard from "./components/ServiceCard"

function App() {
  return (
    <>
      <div>
        <Header />
        <NewServiceForm />
        <ServiceCard />
      </div>
    </>
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
  )
}

export default App