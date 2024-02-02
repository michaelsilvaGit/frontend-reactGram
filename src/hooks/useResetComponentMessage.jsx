    //Redux
import { resetMessagePhoto } from "../slices/photoSlice";
import { resetMessageUser } from "../slices/userSlice";
import { resetMessageStorie } from "../slices/storieSlice";
import { reset } from "../slices/authSlice";



export const useResetComponentMessage = (dispatch) => {
    return () => {
        setTimeout(() => {
            dispatch(resetMessagePhoto());
            dispatch(resetMessageUser());
            dispatch(resetMessageStorie());
            dispatch(reset());
        }, 2000)
    }
}