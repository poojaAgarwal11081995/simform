import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useCookies } from "react-cookie"
import DragAndDrop from '../dragAndDrop'
import { ItemStyle, ListStyle } from "../dragAndDrop/style"
import { LIST, REGEX } from "../../constant";
import { PROFILE_PATH, LOGIN_PATH } from "../../path";

function Profile() {
  let userData;
  const [cookie, setCookie] = useCookies(['userDetails'])
  const [list, setList] = useState(LIST);
  const [inputValue, setInputvalue] = useState({
    name: userData ? userData.name : "",
    age: userData ? userData.age : "",
    gender: userData ? userData.gender : ""
  })
  const hist = useHistory()
  const handleLogout = () => {
      setCookie("userDetails", "");
        localStorage.setItem("profileData", "");   
      hist.push(LOGIN_PATH);
  }
  useEffect(() => {
    userData = JSON.parse(localStorage.getItem('profileData'));
    if (userData) {
      setInputvalue(userData)
      setList(userData.skills)
    }
  }, [])
  useEffect(() => {
    const { name, age, gender } = inputValue
    const data = {
      name: name,
      age: age,
      gender: gender,
      skills: list
    }
    localStorage.setItem("profileData", JSON.stringify(data))
  }, [inputValue, list])

  // useEffect(() => {
  //   const datas = cookie.userDetails
  //   if (datas && Object.keys(datas).length) {
  //     hist.push(PROFILE_PATH);
  //   } else {
  //     hist.push(LOGIN_PATH)
  //   }
  // }, []);
  const handleOnchange = (event) => {
    const { name, value } = event.target;
   setInputvalue({
      ...inputValue, [name]: value
    });
  }
  return (
    <div className="main_profile">
      
     

      <div className="login_container">

        <form >
          <label>Name</label>
          <input type="text" autoComplete="off" name="name" value={inputValue.name} onChange={handleOnchange} pattern={/[a-zA-Z]+\\.?/} />
          <label>Age</label>
          <input type="text" name="age" value={inputValue.age} onChange={handleOnchange} pattern={/^\S[0-9]{0,3}$/} />
          <label>Gender</label>
          <input type="text" name="gender" value={inputValue.gender} onChange={handleOnchange} />
          <div>
            <label>Skills</label>
            <DragAndDrop list={list} itemStyle={ItemStyle} listStyle={ListStyle} updatedList={(ul) => setList(ul)} />
          </div>
        </form>
       
      </div>
      <input type="button" className="button float-right " value="Logout" onClick={handleLogout} />
    </div>

  )
}

export default Profile
