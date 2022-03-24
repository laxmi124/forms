import React from "react";
import style from '../src/Form.module.css'
/*
Name
Age
Address
Department ( select tag )
Salary
marital state ( check box )
*/
const Form = () => {
  const [formdata, setFormData] = React.useState({
    username:"",
    age:"",
    address:"",
    department:"",
    salary:"",
    marital:false
  });
   
  React.useEffect(()=>{
    takeShow()
  },[])
  const [data,setData]= React.useState([]);

  const handleChange = (e) => {
    //   console.log(e.target.value)
    //   console.log(e.target.id)
    let {id,value,checked,type} = e.target;
    // console.log(id,value)
    setFormData({
        ...formdata,
        [id]: type === 'checkbox' ? checked : value
    })
  };
  const {username,age,address,department,salary,marital}= formdata;

  const takeShow =()=>{
      fetch(`http://localhost:3001/details`)
      .then((res)=>res.json())
      .then((res)=>setData(res))
      .catch((err)=>console.log(err))
  }
  
  const handleSubmit=(e)=>{
       e.preventDefault();
    //    console.log(formdata);

    fetch(`http://localhost:3001/details`,{
        method: 'POST',
        body: JSON.stringify(formdata),
        headers:{
            "Content-Type": "application/json",
          }
    })
    .then((res)=>takeShow())
    .catch((err)=>console.log(err))
  }



  return (
    <>
      <h1>EMPLOYEES DETAILS</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="" >
          Name :
          <input type="text"
           placeholder="Enter your name"
            id="username"
           onChange={handleChange}
           value={username}
         />
        </label>
        <br />
        <br />

        <label htmlFor="">
          Age : <input 
          type="number" 
          placeholder="Enter your age" 
          id="age" 
          onChange={handleChange}
          value={age}
          />
        </label>

        <br />
        <br />

        <label htmlFor="">
          Address :{" "}
          <input 
          type="text" 
          placeholder="Enter your address" 
          id="address" 
          onChange={handleChange}
          value={address}
          />
        </label>

        <br />
        <br />

        <label htmlFor="">
          Department :
          <select name="" id="department" onChange={handleChange} value={department}>
            <option value="">select</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="UI">UI</option>
            <option value="Digital Marketing">Digital Marketing</option>
          </select>
        </label>

        <br />
        <br />

        <label htmlFor="">
          Salary : 
          <input 
          type="number" 
          placeholder="Salary" 
          id="salary" 
          onChange={handleChange}
          value={salary}
          />
        </label>

        <br />
        <br />

        <label htmlFor="">
          marital state : 
          <input 
          type="checkbox" 
          id="marital" 
          onChange={handleChange}
          value={marital}
          />
        </label>
        
        <br />
        <br />

        <input type="submit" value="SUBMIT"/>
      </form>
      <br />
      <br />

      {/* username,age,address,department,salary,marital */}
      {/* <tr className={style.tableRow}> */}
      <tr className={style.tableHeading}>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Marital</th>
      </tr>
     
      {
          
          data.map((item)=>{
              return <tr className={style.tableRow}>
              <td>{item.username}</td>
              <td>{item.age}</td>
              <td>{item.address}</td>
              <td>{item.department}</td>
              <td>{item.salary}</td>
              <td>{item.marital}</td>
              </tr>
          })
      }
    </>
  );
};

export { Form };
