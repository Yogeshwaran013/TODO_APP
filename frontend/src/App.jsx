import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [works, setWorks] = useState('');
  const [asswork, setAssWork] = useState([]);
  const [lim,setLim]=useState('');
  const assign = () => {
    if(asswork.length==5){
      setLim("can't be assign")
      return
    }
    if (works.trim() !== '') {
      const newItem = {
        id: Math.random().toString(36).substr(2, 9), // generate random ID
        text: works
      };
      setAssWork([...asswork, newItem]);
      setWorks('');
    }
  };
  useEffect(() => {

    const saved = localStorage.getItem('tasks');
    if (saved) {
      setAssWork(JSON.parse(saved));
    }

  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(asswork));

  }, [asswork]);
  // useEffect(() => {
  //   if(!asswork){
  //     setAssWork("No works are assigned")
  //   }
  //   fetch('http://localhost:3000/works')
  //     // it looks inside the public folder
  //     .then(res => { return res.json() })
  //     .then(data => {
  //       setAssWork(data)
  //     })
  //     .catch(err => console.error("Error loading dummydata.json", err));
  // }, []);
  const remove = (ind) => {
    const newarr = asswork.filter((_, index) => index !== ind

    );
    setAssWork(newarr)
  }

  return (
    <>
      <div className='work'>
        <h1> Enter todo works</h1>
        <input className="work" type="text" value={works} onChange={(e) => setWorks(e.target.value)}></input>
        <p>{asswork.length==5 && lim}</p>
        <button onClick={assign}>assign</button>
      </div>
      <div className='todo'>
        <h2>Assigned works !</h2>
        <p>{asswork.length == 0 && "No works Are Assigned"}</p>

        <ul>
          {asswork.map((item, index) => (
            <li key={item.id}>
              <span>{item.text}</span>
              <button onClick={() => remove(index)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
