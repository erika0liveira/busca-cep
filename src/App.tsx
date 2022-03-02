import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './main.scss';

import api from './services/api'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function searchCEP() {
    if (!input) {
      alert("Não deixe o campo de pesquisa vazio!")
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("");

    } catch (error) {
      alert("Houve erro ao buscar, tente novamente com um CEP válido.")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input type="text" className="textInput" placeholder="Digite um CEP. Ex: 01234-567" value={input} onChange={(event) => setInput(event.target.value)} />

        <button className="btnSearch" onClick={searchCEP}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="results">
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>Cidade: {cep.localidade} - {cep.uf}</span>
        </main>
      )}

    </div>
  )
}

export default App
