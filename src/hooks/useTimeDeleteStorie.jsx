
import { deleteStorie } from "../slices/storieSlice";
import { removeInsertStorie } from "../slices/userSlice";



export const useTimeDeleteStorie = (dispatch, stories) => {

  if (stories) {

    const minutesArray = stories.map((stor) => {
      const createdAt = stor.createdAt;
      const idStore = stor._id;
      const idUser = stor.userId;

      const now = new Date();
      const createdDate = new Date(createdAt);

      const differenceInMilliseconds = now - createdDate;
      const differenceInMinutes = differenceInMilliseconds / (1000 * 60);

      const minutes = Math.floor(differenceInMinutes);

      if (differenceInMinutes >= 60) {
        console.log("id: " + idStore + " 5 minutos");
        dispatch(deleteStorie(idStore));
        dispatch(removeInsertStorie(idUser));
      }

      return minutes;

    });

    localStorage.setItem('minutesArray', JSON.stringify(minutesArray));

    return  minutesArray;
  }

  return []; 

};