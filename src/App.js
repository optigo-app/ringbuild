import { useCallback, useEffect, useState } from 'react';
import Details from './components/DetailsPage/Details';
import Home from './components/HomePage/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
// import Cookies from "js-cookie";


function App() {

  const[mode,setMode]=useState("master")
  const[pdStore,setPdStore]=useState([])
  const[masterDetailed,setMasterDetailed]=useState([])
  const[parentList,setParentList]=useState([])
  const[imageData,setImageData]=useState([])
  const[priceData,setPriceData]=useState([])
  const[selectedItem,setSelectedItem]=useState([]);
  const[similarband,setSimilarband]=useState([]);
  const[designList,setDesignList]=useState([]);
  const[searchValue,setSearchValue]=useState('');

  const DataAccordingToMode = useCallback(async(mode,data) =>{
    switch (mode) {
      case "master":
        setPdStore(data?.pdstore[0])
        setMasterDetailed(data)
        break;

      case "parentlist":
        setParentList(data)
        break;
        
      case "colorimage":
        setImageData(data)
        break;

      case "storeprice_1_az5vc8n61mvnwrvf_6":
        setPriceData(data?.ProductList_Combination_Json_min)
        break;

      case "similarband":
        setSimilarband(data?.pdstore)
        break;

      case "designlist":
        setDesignList(data?.pdstore)
        break;
    
      default:
        break;
    }
  },[])

  const fetchData= useCallback(async() =>{
    let data = JSON.stringify({
      "con": `{\"id\":\"\",\"mode\":\"${mode}\",\"appuserid\":\"\"}`, //eslint-disable-line
      "p": "eyJ1a2V5IjoicmluZ2J1aWxkbUFWMVUyM1JPWU5UUURIWlBDIiwiZm9sZGVyIjoicGRzdG9yZWpzb24iLCJGcm9udEVuZF9SZWdObyI6ImF6NXZjOG42MW12bndydmYifQ==",
      "f": `formname (${mode==='parentlist'?'parentlistt':mode})`
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.optigoapps.com/V18/',
      headers: { 
        'Authorization': 'Bearer optigo_json_api', 
        'YearCode':'e3tsaXZlLm9wdGlnb2FwcHMuY29tfX17ezIwfX17e3JpbmdidWlsZG19fXt7cmluZ2J1aWxkbX19', 
        'version': 'V1', 
        'Content-Type': 'application/json', 
      },
      data : data
    };
    
    await axios.request(config)
    .then((response) => {
      let data=response.data
      mode==="master" && setMode('parentlist');
      mode==="parentlist" && setMode('colorimage')
      mode==="colorimage" && setMode('storeprice_1_az5vc8n61mvnwrvf_6')
      mode==="storeprice_1_az5vc8n61mvnwrvf_6" && setMode('similarband')
      mode==="similarband" && setMode('designlist')
      DataAccordingToMode(mode,data)
    },
    )
    .catch((error) => {
      console.log(error);
    });
  },[mode,DataAccordingToMode])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  // console.log("path...............",window);
  // useEffect(()=>{
  // },[window.location.pathname])

  return (
    <>
    <ToastContainer/>
      <Router>
        <Routes>
          <Route
            element={
              <Home
                pdStore={pdStore}
                parentList={parentList}
                imageData={imageData}
                priceData={priceData}
                setSelectedItem={setSelectedItem}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                designList={designList}
              />
            }
            path="/*"
          />
          <Route
            element={
              <Details
                imageData={imageData}
                masterDetailed={masterDetailed}
                pdStore={pdStore}
                similarband={similarband}
                priceData={priceData}
                searchValue={searchValue}
                designList={designList}
                setSearchValue={setSearchValue}
              />
            }
            path="/details/*"
          />
        </Routes>
      </Router>
      
    </>
  );
}

export default App;
