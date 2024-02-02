import "./StoriesContainer.css"

import { uploads } from "../utils/config"
import { Link } from "react-router-dom"


//Hooks
import { useState, useEffect } from "react"
import { useSelector, useDispatch} from "react-redux"
import { useTimeDeleteStorie } from "../hooks/useTimeDeleteStorie"

//Redux
import { getUserStories } from "../slices/storieSlice"



const StoriesContainer = ({users}) => {

    const [currentIndex, setCurrentIndex] = useState(0);


    const showSlide = (index) => {
        const carousel = document.querySelector('.stories');
        const totalSlides = document.querySelectorAll('.stories-item').length;
        const minIndex = 0;
        const maxIndex = totalSlides - 1;

        if (index >= minIndex && index <= maxIndex) {
            setCurrentIndex(index);
            const translateValue = -index * 60; 

            carousel.style.transform = `translateX(${translateValue}px)`;
        }
    };

    const prevSlide = () => {
        showSlide(currentIndex - 1);
    };

    const nextSlide = () => {
        showSlide(currentIndex + 1);
    };



    return (
        <> 
    
        <div className="container-stories"> 
                <div className="stories">
                    {users && users.map((user) => (
                        (user.storieImage > 0 && (
                            <div key={user._id} className="stories-item">
                                {user.profileImage ? (
                                    <Link to={`/stories/${user._id}`}><img className="profile-image-stories" src={`${uploads}/users/${user.profileImage}`} alt={user.name} /></Link>
                                ):(
                                    <Link to={`/stories/${user._id}`}><img className="profile-image-stories" src={`${uploads}/users/user.jpg`} alt={user.name} /></Link>
                                )}
                                <p id="names-stories">{user.name}</p>

                            </div>
                        ))
                    ))}
                </div>
            <button className="prev-btn" onClick={prevSlide}>‹</button>
            <button className="next-btn" onClick={nextSlide}>›</button>
        </div>

        
        </>
    );

}

export default StoriesContainer