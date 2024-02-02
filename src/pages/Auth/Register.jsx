import "./Auth.css"

import {Link} from "react-router-dom";


//components
import Message from "../../components/Message";

//Hooks
import {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useResetComponentMessage} from "../../hooks/useResetComponentMessage"

//Redux
import {register} from "../../slices/authSlice";



const Register = () => {

  const [name, setName] = useState("");
  const [email, setEemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const dispatch = useDispatch();

  const resetMessage = useResetComponentMessage(dispatch);

  const {loading, error} = useSelector((state) => state.auth);


  const handleSubmit = (e) => {
    e.preventDefault()


    const user = {
      name,
      email,
      password,
      confirmPassword,
    }


    //Execute funciton to register
    dispatch(register(user))


    resetMessage();

  }


  return (
    <div id="register">
      <h2>ReactGram</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" onChange={(e) => setName(e.target.value)} value = {name || ""}/>
        <input type="email" placeholder="E-mail" onChange={(e) => setEemail(e.target.value)} value = {email || ""}/>
        <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value = {password || ""}/>
        <input type="password" placeholder="Confrime a senha" onChange={(e) => setConfirmPassword(e.target.value)} value = {confirmPassword || ""}/>
        
        {!loading && <input type="submit"  value="Cadastrar"/>}
        {loading && <input type="submit" value="Aguarde" disabled/>}
        {error && <Message msg={error} type={"error"}/>}
        
      </form>
      <p>Ja tem conta? <Link to="/login">Clique aqui.</Link></p>
    </div>
  )
}

export default Register