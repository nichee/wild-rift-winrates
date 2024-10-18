import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import championsData from './Data/Champions.json'



function App() {
  const [role, setRole] = useState(2);
  const [rankBracket, setRankBracket] = useState(1);
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const lanes = {
    2: "Baron",
    5: "Jungle",
    1: "Middle",
    3: "Carry",
    4: "Support",
  };
  const ranks = {
    1: "Diamond",
    2: "Master",
    3: "Challenger",
    4: "Sovereign"
  }
  
  const getHeroNameById = (heroId) => {
    const hero = championsData.champions_data.find((champion) => champion.heroId === Number(heroId));
    return hero ? hero.name : "Unknown";
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
        // HeroData[(rank)][position]
        //console.log(heroData);
        const lastModified = response.headers.get('Last-Modified');
        const date = response.headers.get('Date');
        // console.log(lastModified)
        // console.log(date)
      } catch (error) {
        setError(error); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    console.log(championsData)
  }, []);

  if (isLoading) {
    return <div>Loading hero data...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  return (
    <>
    <div className="ranks">
        <button 
          className={rankBracket === 1 ? "selected" : ""}
          onClick={() => setRankBracket(1)}>
          Diamond
        </button>
        <button 
          className={rankBracket === 2 ? "selected" : ""}
          onClick={() => setRankBracket(2)}>
          Master
        </button>
        <button 
          className={rankBracket === 3 ? "selected" : ""}
          onClick={() => setRankBracket(3)}>
          Challenger
        </button>
        <button 
          className={rankBracket === 4 ? "selected" : ""}
          onClick={() => setRankBracket(4)}>
          Sovereign
        </button>
        
      </div>
      <div className="roles">
        <button 
          className={role === 2 ? "selected" : ""}
          onClick={() => setRole(2)}>
          Baron
        </button>
        <button 
          className={role === 5 ? "selected" : ""}
          onClick={() => setRole(5)}>
          Jungle
        </button>
        <button 
          className={role === 1 ? "selected" : ""}
          onClick={() => setRole(1)}>
          Mid
        </button>
        <button 
          className={role === 3 ? "selected" : ""}
          onClick={() => setRole(3)}>
          Carry
        </button>
        <button 
          className={role === 4 ? "selected" : ""}
          onClick={() => setRole(4)}>
          Support
        </button>
      </div>
    
      <table style={{ width: '1000px' }}>
        <thead>
          <tr className="tableHeader">
            <th style={{ width: '5em' }}>Rank</th>
            <th style={{ width: '15em' }}>Hero</th>
            <th style={{ width: '10em' }}>Position</th>
            <th style={{ width: '8em' }}>Winrate</th>
            <th style={{ width: '8em' }}>Pickrate</th>
            <th style={{ width: '8em' }}>Banrate</th>
          </tr>
        </thead>
        
        <tbody>
          {heroData && (
            Object.values(heroData[rankBracket][role]).map((hero, index) => (
              <tr key={hero.hero_id}>
                <td>{index + 1}</td>
                <td style={{ wordBreak: 'break-all' }}>{getHeroNameById(hero.hero_id)}</td>  {/* Assuming hero_name or fallback to hero_id */}
                <td>{lanes[role]}</td>  
                <td>{hero.win_rate_percent}%</td>
                <td>{hero.appear_rate_percent}%</td>
                <td>{hero.forbid_rate_percent}%</td>
              </tr>
            ))
          )}
        </tbody>

      
      </table>

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
