import "./Stories.css"

import { uploads } from "../../utils/config"
import { BsHeart, BsHeartFill } from "react-icons/bs"


//Hooks
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useTimeDeleteStorie } from "../../hooks/useTimeDeleteStorie"


//Redux
import { getUserDetails } from "../../slices/userSlice"
import { getUserStories, getAllStories, likeStorie } from "../../slices/storieSlice"



const Stories = () => {

  const {id} = useParams();

  const dispatch = useDispatch();

  const {user: userAuth} = useSelector((state) => state.auth)
  const {user, loading: loadingUser} = useSelector((state) => state.user);
  const {storiesOnly, storie, storieUser, like, stories, loading: loadingStories} = useSelector((state) => state.storie);

  const [indexImage, setIndexImage] = useState(0);

  //const [like, setLike] = useState(false);

  const [time, setTime] = useState([]);

  const storedMinutes = localStorage.getItem('minutesArray');
  const stored = JSON.parse(storedMinutes);
  


  useEffect(() => {
  
    dispatch(getUserDetails(id));
    dispatch(getUserStories(id));
    dispatch(getAllStories());

    if(stories) {
    
      useTimeDeleteStorie(dispatch, stories);
    }
    
  }, [id, dispatch])



  useEffect(() => {
    
    useTimeDeleteStorie(dispatch, stories);
  
    if(storedMinutes){
      setTime(JSON.parse(storedMinutes));
    }
    
  },[indexImage])
 


  const handleLike = (storieId) => {

   dispatch(likeStorie(storieId))

  }



  const nextImage = () => {
    if (indexImage < stories.length - 1) {
      setIndexImage((prevIndex) => prevIndex + 1);
  
    }
  };

  const previousImage = () => {
    if (indexImage > 0) {
      setIndexImage((prevIndex) => prevIndex - 1);
     
    }
  };




  return (
    
    <div className="container-stories-item">
        {user && (
          <>
            <div className="user-descripton">
              {user.profileImage ? (
                <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
              ):(
                <img src={`${uploads}/users/user.jpg`} alt={user.name} />        
              )}
              <div className="user-description-name">
                <span>{user.name}</span>
                
                {time[indexImage] === 0 && (
                  <span id="time">agora</span>
                )}
                {time[indexImage] != undefined && time[indexImage] != 0 &&(
                  <span id="time">{time[indexImage] + " min"}</span>
                )}

                {time[indexImage] === undefined && time[indexImage] != 0 && (
        
                  <span id="time">{stored[indexImage] + " min"}</span>
                )}
                
                
              </div>
            </div>

            {!loadingStories && (
              <img key={storiesOnly[indexImage]} src={`${uploads}/${storiesOnly[indexImage]}`} alt={user.name} />
            )}

            {storieUser.map((str) => (
              storiesOnly[indexImage] === str.image && (
    
                
                  <div key={str._id} className="like-svg">
                    
                    {str.likes.includes(userAuth._id) ? (
                      <BsHeartFill /> 
                      
                    ) : (
                      <BsHeart onClick={() => handleLike(str._id)}/>
                      
                    )}
                    <span id="numberLike">{str.likes.length}</span>
                  </div>  

              )
            ))}

          </>
        )}
        <button className="prev-btn" onClick={previousImage} disabled={indexImage === 0}>‹</button>
      <button className="next-btn" onClick={nextImage} disabled={indexImage === "stories.length" - 1}>›</button>
    </div>
    
  )
}

export default Stories