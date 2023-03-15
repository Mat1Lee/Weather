import React, { useEffect, useMemo, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBContainer,
  MDBInputGroup,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBAlert,
  MDBRow,
} from "mdb-react-ui-kit";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


export default function Main() {
  const [data, setData] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [temp, setTemp] = useState(undefined);
  const [input,setInput] = useState('Đà nẵng')
  const [pressure, setPressure] = useState(undefined);
  const [humidity, setHumidity] = useState(undefined);
  const [bgGif, setBGGif] = useState(undefined);
  const [search,setSearch] = useState(false)
  const [err, setErr] = useState();
  const {
  
    listening,
    
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  // const microphoneRef = useRef(null);
  // 
  const { transcript, resetTranscript } = useSpeechRecognition('');
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true); 
    resetTranscript();
    // microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
      language: "vi-VI",
    });
    
    
  };

  const stopHandle = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();  
    
   
   
    const handleText = transcript
    if(handleText.includes('thời tiết tại')){
      const location = handleText.split('tại')[1].trim();
      
    setTimeout(() => {
      console.log(location) 
      setInput(location);
      setSearch(!search);
      resetTranscript();
    }, 500);
    
    
    // resetTranscript();
    // }
  //  resetTranscript();
  };
}
 const API_ID = "cf26e7b2c25b5acd18ed5c3e836fb235";

const NAME = input
const TIME_NOW = new Date().getHours();
// console.log()


// Icons
let iconBaseUrl = "http://openweathermap.org/img/wn/";
let iconFormat = ".png";
 

  https://api.openweathermap.org/data/2.5/onecall?lat=44.34&lon=10.99&units=paris&exclude=minutely,alerts&appid=cf26e7b2c25b5acd18ed5c3e836fb235
    
     useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${transcript||NAME}&appid=${API_ID}&units=metric&lang=vi`)
        .then(async res =>{
          const data = await res.json();
          console.log('data',data);
        setData(data);
        setDescription(data?.weather[0].description);
        setTemp(Math.round(data?.main.temp));
        setPressure(data?.main.pressure);
        setHumidity(data?.main.humidity);
        const main = data?.weather[0].main;    
        switch (main) {
          case "Snow":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')"
            );
            break;
          case "Clouds":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')"
            );
            break;
          case "Fog":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')"
            );
            break;
          case "Rain":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')"
            );
            break;
          case "Clear":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
            );
            break;
          case "Thunderstorm":
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')"
            );
            break;
          default:
            setBGGif(
              "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')"
            );
            break;
        }
        setErr(false)
      })
      .catch(err =>{
        console.log(err);
        setErr(true)
        
      });
  },[search]);
  const handleSearch =()=>{
    setSearch(!search);
    console.log(search);
  }
   const handleKey =(e)=>{
    // e.key === 'Enter' && handleSearch()
    console.log('object', e.key);
    console.log('text',NAME);
   }
 

  return (
    <section  style={{width:'100%'}}>
      <MDBContainer className="h-100" tyle={{height:'100%'}}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="9" lg="7" xl="5">
       
            <MDBCard
              className="text-white bg-image shadow-4-strong"
              style={{
                backgroundImage: bgGif ?? "url(https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif)"
              }}
            > 
      <MDBInputGroup style={{maxWidth:'100%',marginTop:'10px',color:'red'}}>
        <MDBInput label='Search' 
        value={input}
        onChange={(e) => setInput((e.target.value))}
        
        className='search'
        >
         <span><MDBIcon className="icon" style={{color:'dark'}} fas icon="microphone" 
        
         onClick={handleListing} 
          onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}/></span>
         
        </MDBInput>
        
        <MDBBtn  rippleColor='dark'>
        
          <MDBIcon
            // onKeyDown ={()=>handleKey}
           onClick={
            handleSearch
          } icon='search'/>
        </MDBBtn>
        <MDBBtn
        onClick={stopHandle}
        >Stop</MDBBtn>
       
      </MDBInputGroup>
      {err && <span>The city not found!</span>}
      {data && (
        <div>
          <MDBCardHeader className="p-4 border-0">
                <div className="text-center mb-3">
                  {/* <p>{transcript}</p> */}
                  <p className="h2 mb-1">{input||transcript}</p>
                  <p className="mb-1">{description}</p>
                  <p className="display-1 mb-1">{temp}°C</p>
                  <span className="">Pressure: {pressure}</span>
                  <span className="mx-2">|</span>
                  <span className="">Humidity: {humidity}%</span>
                </div>
              </MDBCardHeader>
              <MDBCardBody className="px-5">
                <MDBRow className="align-items-center">
                  <MDBCol lg="6">
                    <strong>Today</strong>
                  </MDBCol>

                  <MDBCol lg="2" className="text-center">
                    {/* <img className="w-100" src={iconsFullyUrl.today} alt="" /> */}
                  </MDBCol>

                  <MDBCol lg="4" className="text-end">
                    {temp}°
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center">
                  <MDBCol lg="6">
                    <strong>Tomorrow</strong>
                  </MDBCol>

                  <MDBCol lg="2" className="text-center">
                    <img
                      className="w-100"
                      // src={iconsFullyUrl.tomorrow}
                      alt=""
                    />
                  </MDBCol>

                  <MDBCol lg="4" className="text-end">
                    {/* {Math.round(data?.daily[0].temp.day) ?? undefined}° */}
                  </MDBCol>
                </MDBRow>

                <MDBRow className="align-items-center">
                  <MDBCol lg="6">
                    <strong>Day after tommorow</strong>
                  </MDBCol>

                  <MDBCol lg="2" className="text-center">
                    {/* <img className="w-100" src={iconsFullyUrl.dAT} alt="" /> */}
                  </MDBCol>

                  <MDBCol lg="4" className="text-end">
                    {/* {Math.round(data?.daily[1].temp.day) ?? undefined}° */}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
        </div>
        
            
      )}
  </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}