import {React,useState} from 'react'
import './Home.css'
import Header from '../../components/Header/Header';
import ExplorerMenu from '../../components/ExplorerMenu/ExplorerMenu';
import Display from '../../components/FoodDisplay/Display';


const HomePage = () => {
  const [category,setCategory]=useState("All");
  return (
    <div>
      
        <Header/>
        <ExplorerMenu category={category} setCategory={setCategory}/>
        <Display category={category}/>
    </div>
  )
}

export default HomePage;
