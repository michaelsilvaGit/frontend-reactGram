import "./Profile.css"

import {uploads} from "../../utils/config";

import { ClipLoader } from 'react-spinners';



//Componnents
import Message from "../../components/Message";
import {Link} from "react-router-dom";
import {BsFillEyeFill, BsPencilFill, BsXLg} from "react-icons/bs";
import Modal from "../../components/Modal";

//Hooks
import { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch} from "react-redux"
import {useParams} from "react-router-dom";
import {useResetComponentMessage} from "../../hooks/useResetComponentMessage"
import { useTimeDeleteStorie } from "../../hooks/useTimeDeleteStorie";

//Redux
import { getUserDetails, insertStorie } from "../../slices/userSlice";
import { publisPhoto, getUserPhotos, deletePhoto, updatePhoto} from "../../slices/photoSlice";
import { publishStorie, getAllStories } from "../../slices/storieSlice";






const Profile = () => {


  const {id} = useParams()

  const dispatch = useDispatch()

  const resetMessage = useResetComponentMessage(dispatch);

  const {user, loading} = useSelector((state) => state.user)
  const {user: userAuth}  = useSelector((state) => state.auth)
  const {photos, loading: loadingPhoto, message: messagePhoto, error: errorPhoto} = useSelector((state) => state.photo);
  const {storie, message: messageStorie} = useSelector((state) => state.storie)


  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");


  const [storePublish, setStorePublish] = useState(false);

  const [editId, setEditId] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editTitle, setEditTitle] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [deleteTimer, setDeleteTimer] = useState(null);

  //New form and edit form ref
  const newPhotoForm = useRef()
  const editPhotoForm = useRef()




  //Load user data
  useEffect(() => {
  
    dispatch(getUserDetails(id))
    dispatch(getUserPhotos(id))

  },[dispatch, id])




  //Get imagem the in form
  const handleFile = (e) => {

    const image = e.target.files[0]

    setImage(image);
}





  //Show modal to confirm
  const confirmSubmit = (e) => {

    e.preventDefault();

    setShowModal(true);
  }


  //Delete a photo
  const handleDelete = (id) =>{

    dispatch(deletePhoto(id));

    resetMessage();

  }



  //Show or hide forms
  const hideOrShowForms = () => {
    newPhotoForm.current.classList.toggle("hide");
    editPhotoForm.current.classList.toggle("hide");
  }

  //Updatae a photo
  const handleUpdate = (e) => {

    e.preventDefault();

    const photoData = {
      title: editTitle,
      id: editId
    }

    dispatch(updatePhoto(photoData))

    resetMessage();

  };


  const handleEdit = (photo) => {
    if(editPhotoForm.current.classList.contains("hide")){
      hideOrShowForms();
    }

    setEditId(photo._id);
    setEditTitle(photo.title);
    setEditImage(photo.image);
  }

  const handleCancelEdit = () => {
    hideOrShowForms();
  }




  //Insert a publish
  const submitHandleFeed = () => {

    const photoData = {
      title,
      image
    };

    //build form data
    const formData = new FormData();

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData)

    dispatch(publisPhoto(formData));

    setTitle("");

    resetMessage();

    setShowModal(false);
  }


  
  //Insert a Storie
  const submitHandleStorie = () => {

    const storieData = {
      image
    }


    //build form data
    const formData = new FormData();

    const photoFormData = Object.keys(storieData).forEach((key) =>
      formData.append(key, storieData[key])
    );

    formData.append("storie", photoFormData)


    if(image) {
      dispatch(publishStorie(formData));
      dispatch(insertStorie(formData));
    }

    setTitle("");

    resetMessage();

    setShowModal(false);

  }

  


  const onClose = () => {
    setShowModal(false);
  }



  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage ? (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        ):(
          <img src={`${uploads}/users/user.jpg`} alt={user.userName} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>

            <h3>Compartilhe algum momento seu:</h3>
            <form onSubmit={confirmSubmit}>
              <label>
                <span>Título para a foto:</span>
                <input type="text" placeholder="Insira um título" onChange={(e) => setTitle(e.target.value)} value={title || ""}/>
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile}/>
              </label>
              {!loadingPhoto && <button type="submit">Postar</button>}
              {loadingPhoto && (

                <button type="submit">
                  <>
                    <ClipLoader className="gif" size={13}/>
                  </>
                </button>
              )}
            </form>
            {showModal && <Modal storieConfirm={submitHandleStorie} feedConfirm={submitHandleFeed} onClose={onClose}/>}
          </div>

          <div className="edit-photo hide" ref={editPhotoForm}> 
            <p>Editando:</p>
            {editImage && (
              <img src={`${uploads}/photos/${editImage}`} alt={editTitle} />
            )}

            <form onSubmit={handleUpdate}>
              <input type="text" placeholder="Insira um título" onChange={(e) => setEditTitle(e.target.value)} value={editTitle || ""}/>
              <input type="submit" value="Editar" />
            </form>
            <button className="cancel-btn" onClick={handleCancelEdit}>Cancelar edição</button>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
          {messageStorie && <Message msg={messageStorie} type="success" />}
        </>
      )}


      <div className="user-photos">
        <h2>Fotos publicadas:</h2>
        <div className="photos-container">
          {photos ? (photos.map((photo) => (
            <div className="photo" key={photo._id}>
              {photo.image && (<img src={`${uploads}/photos/${photo.image}`} alt={photo.title}/>)}
              {id === userAuth._id ? (
                 <div className="actions">
                  <Link to={`/photo/${photo._id}`}><BsFillEyeFill/></Link>
                  <BsPencilFill onClick={() => handleEdit(photo)}/>
                  <BsXLg onClick={() => handleDelete(photo._id)}/>
                 </div>
              ) : (
                <div className="container-btn-profile">
                  <Link className="btn" to={`/photo/${photo._id}`}>Ver</Link>
                </div>
                
              )}
            </div>
          ))) : (
            <p>Ainda não tem fotos publicadas.</p>
          )}
          {loading && <p>Carregando fotos...</p>}
        </div>
      </div>
    </div>
  )

  
}

export default Profile