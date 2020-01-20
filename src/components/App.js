/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import '../styles/App.scss';
import '../styles/global.scss'
import DevService from '../services/devService';
import Dev from '../entitites/dev'
import Card from '../components/Card'
/*
    React é consiste em 3 conceitos:
    Components: conjunto de código isolado
    States: Informação mantida pelo componente
    Properties: parametros e valores passados entre componentes
*/
function App() 
{
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [latitudeTrim, setLatitudeTrim] = useState('');
  const [longitudeTrim, setLongitudeTrim] = useState('');

  const [github_username, setGitHubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [devs, setDevs] = useState([]);
  const [isLoading = false, setIsLoading] = useState('');

  
  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((pos)=>
    {
      const {latitude, longitude} = pos.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      setLatitudeTrim(trimNumber(10,latitude));
      setLongitudeTrim(trimNumber(10,longitude));
    },
    (err)=>
    {
      console.error(err);
    },
    {
      timeout:30000
    });
  },[]);
  useEffect(
    ()=>
    {
      const response = listDevs();
      response.then(e => {setDevs(e.data); setIsLoading(true)}).catch(e => console.log(e));
    },
    [

    ]);
  function trimNumber(size, number)
  {
    const numberStr = number.toString();
    return Number(numberStr.slice(0, size));
  }
  async function formSubmit(e)
  {
    let developer = new Dev("",github_username,"","",techs,{coordinates:[latitude,longitude]});
    let resp = await DevService.prototype.saveDev(developer,github_username);
    setDevs([...devs,resp.data])
  }
  async function listDevs()
  {
    const result = await DevService.prototype.listDev();
    return result;
  }

  return (
    <div id="app">
      <aside className="cadastro">
        <strong className="">Cadastrar</strong>
        <form onSubmit={formSubmit}>

          <div className="input-block">
            <label htmlFor="">Usuário do GitHub</label>
            <input name="github_username" value={github_username} id="github_username" onChange={e=>{setGitHubUsername(e.target.value)}} required></input>
          </div>
          
          <div className="input-block">
            <label htmlFor="">Tecnologias</label>
            <input name="techs" id="techs" value={techs} onChange={e=>{setTechs(e.target.value)}}  required></input>
          </div>

          <div className="input-group">

            <div className="input-block cursor-block">
              <label htmlFor="">Latitude</label>
              {/* 
                onChange={e=>{setLatitude(e.target.valueAsNumber)}} 
                o evento acima mostra alteração do state conforme mudança no input
              */}
              <input readOnly type="number" maxLength={8} name="latitude" id="latitude" value={latitudeTrim} required></input>
            </div>
            
            <div className="input-block cursor-block">
              <label htmlFor="">Longitude</label>
              <input readOnly type="number" maxLength={8}  name="longitude" id="longitude" value={longitudeTrim} required></input>
            </div>

          </div>
            <button type="submit">Salvar</button>
        </form>
      </aside>
      <main className="main">
        <ul>
          {devs.map((e,index)=>(<Card idList={index} dev={e}/>))}
        </ul>
      </main>
    </div>
  );
}

export default App;
