import '../css/home.css'
import backgroundVideo from '../css/media/videofile.mp4'



const Home = () => {
    return(
        
        <div>
        <div><h1 className='top'>RandomStop Your One & Only Stop </h1>
           </div>
        <video autoPlay muted loop id="video">
        <source src={backgroundVideo} type="video/mp4"></source>
    </video>
    
        
    </div> 
    )
}

export default Home;