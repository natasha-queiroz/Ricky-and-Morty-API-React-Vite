import React, { useState, useRef, useEffect } from 'react'

function App() {

  const [pagina, setPagina] = useState(1)
  const campoRef = useRef("")
  const imageRef = useRef("")
  const nomeRef = useRef("")
  const statusRef = useRef("")
  const speciesRef = useRef("")
  const genderRef = useRef("")
  const originRef = useRef("")
  const locRef = useRef("")
  const createdRef = useRef("")
  const episodeRef = useRef("")

  useEffect(() => {
    informacao(pagina)
  }, [pagina])

  const fetchApi = async (value) => {
    const response = await fetch(`https://rickandmortyapi.com/api/character/${value}`)
    const data = await response.json()
    return data
  }

  const informacao = async (id) => {
    const result = await fetchApi(id)
    if (imageRef.current) imageRef.current.src = result.image
    if (nomeRef.current) nomeRef.current.innerHTML = result.name
    if (statusRef.current) statusRef.current.innerHTML = result.status
    if (speciesRef.current) speciesRef.current.innerHTML = result.species
    if (genderRef.current) genderRef.current.innerHTML = result.gender
    if (originRef.current) originRef.current.innerHTML = result.origin.name
    if (locRef.current) locRef.current.innerHTML = result.location.name
    if (createdRef.current) createdRef.current.innerHTML = result.created

    const numeroepisodios = result.episode.map(episodeUrl => episodeUrl.split('/').pop())
    if (episodeRef.current) episodeRef.current.innerHTML = numeroepisodios.join(', ')
  }

  const verificar = async () => {   
    const campo = campoRef.current.value
    if (campo >= 1 && campo <= 826) {
      await informacao(campo)
    } else {
      alert('[ ERRO ]...Este personagem nao existe!')
    }
  }

  const paginaanterior = async () => {    
    if (pagina > 1) {                   
      setPagina(Pagina_anterio => Pagina_anterio - 1)
    } 
  }
 
  const paginaproxima = async () => {
    setPagina(proxima_Pagina => proxima_Pagina + 1)
  }
  
  return (
    <>
     <main>
        <h2 class="rick1">Rick and Morty</h2>
        <form action="" method="get">
          <input class="input1" type="text" placeholder="ID do personagem" disabled/>
          <input class="input2" type="number" ref={campoRef} />
          <input class="input3" type="button" value="Buscar" onClick={verificar}/>
        </form>

        <div class="containerbotao">
          <input class="botao" type="button" value="Anterior" onClick={paginaanterior}/>
          <div class="fundoimg">
            <img src="" ref={imageRef} alt="character" />
          </div>
          <input class="botao" type="button" value="Proximo" onClick={paginaproxima}/>
        </div>

        <div class="containerinfo">
          <article> <h1>Nome:</h1>       <h2 ref={nomeRef}></h2>    </article>
          <article> <h1>Status:</h1>     <h2 ref={statusRef}></h2>  </article>
          <article> <h1>Espécies:</h1>   <h2 ref={speciesRef}></h2> </article>
          <article> <h1>Gênero:</h1>     <h2 ref={genderRef}></h2>  </article>
          <article> <h1>Origem:</h1>     <h2 ref={originRef}></h2>  </article>
          <article> <h1>Localidade:</h1> <h2 ref={locRef}></h2>     </article>
          <article> <h1>Criada:</h1>     <h2 ref={createdRef}></h2> </article>
        </div>
        <article class="episodio">
          <h1 class="tituloepi">Episodios:</h1>
          <h2 ref={episodeRef}></h2>
        </article>
      </main>
    </>
  )
}
export default App
