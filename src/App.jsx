import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [role, setRole] = useState("Baron")
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const lanes = {
    2: "Baron lane",
    5: "Jungle",
    1: "Middle",
    3: "Duo",
    4: "Support",
  };
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/go/lgame_battle_info/hero_rank_list_v2');
        // const response = await fetch('https://mlol.qt.qq.com/go/lgame_battle_info/hero_rank_list_v2', {mode:'cors'});

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHeroData(data.data); 
        // HeroData[(rank??)][position]
        console.log(heroData);
      } catch (error) {
        setError(error); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading hero data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <>
      <div className="roles">
        <button onClick={() => setRole("Baron")}>
          Baron
        </button>
        <button onClick={() => setRole("Jungle")}>
          Jungle
        </button>
        <button onClick={() => setRole("Mid")}>
          Mid
        </button>
        <button onClick={() => setRole("Carry")}>
          Carry
        </button>
        <button onClick={() => setRole("Support")}>
          Support
        </button>
      </div>
      Role is {role}
    
      <table>

        <tr className="tableHeader">
          <th>Hero</th>
          <th>Number</th>
          <th>Position</th>
          <th>Winrate</th>
          <th>Banrate</th>
        </tr>

        <tr>
          <td>Sion</td>
          <td>1</td>
          <td>Baron</td>
          <td>100%</td>
          <td>0%</td>
        </tr>
      
      </table>

      <div>
      {heroData && ( 
        <ul>

          {Object.values(heroData[0][2]).map(hero => (
            <li key={hero.id}>
              <h2>{hero.hero_id}</h2> 
              <p>Win Rate: {hero.win_rate_percent}%</p> 
              <p>Pick Rate: {hero.appear_rate_percent}%</p>
              
            </li>
          ))}
        </ul>
      )}
      </div>  
      <div className="logos">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
