import "./Home.css"

//Components
import LikeContainer from "../../components/LikeContainer"
import PhotoItem from "../../components/PhotoItem"
import { Link } from "react-router-dom"
import StoriesContainer from "../../components/StoriesContainer"

//hooks
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage"
import { useTimeDeleteStorie } from "../../hooks/useTimeDeleteStorie"


//Redux
import { getPhotos, like} from "../../slices/photoSlice"
import { getAllUsers } from "../../slices/userSlice"
import { getAllStories } from "../../slices/storieSlice"




const Home = () => {

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch)

  const {user: userAuth} = useSelector((state) => state.auth)
  const {photos, loading} = useSelector((state) => state.photo)
  const {users} = useSelector((state) => state.user)
  const {stories} = useSelector((state) => state.storie)
  


  //Load all photos
  useEffect(() => {

    dispatch(getPhotos())
    dispatch(getAllUsers())
    dispatch(getAllStories())
 
  }, [dispatch])





  useEffect(() => {

    if(stories) {
      useTimeDeleteStorie(dispatch, stories);
    }
    
  },[])




  //Like a photo
  const handleLike = (photo) => {

    dispatch(like(photo._id))

    resetMessage();
  }

  if(loading) {
    return <p>Carregando...</p>
  }



  return (
    <>
      <StoriesContainer users={users}/>

      <div id="home">
        {photos && photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={userAuth} handleLike={handleLike} />
            <Link className="btn" to={`/photo/${photo._id}`}>Ver mais</Link>
          </div>))}
          {photos && photos.length === 0 && (
            <h2 className="no-photos">
              Ainda não há fotos publicas, <Link to={`/users/${userAuth._id}`}> Clique aqui</Link>
            </h2>
          )}
      </div>
    </>
  )
}

export default Home