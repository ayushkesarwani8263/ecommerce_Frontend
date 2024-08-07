// import { json } from "react-router-dom";

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    const response=await fetch("http://")
    const data=await response.json()
    resolve({data})
  }
  );
}


export function CreateUser(userData) {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    // console.log(userData)
    const response=await fetch("/auth/signUP",{
      method:'POST',
      body:JSON.stringify(userData),
      headers:{"Content-type":"application/json"}
    })
    const data=await response.json()
    resolve({data})
  }
  );
}

export function LoginUser(LoginInfo) {
  return new Promise(async(resolve,reject) =>{
     
    try{
    const response=await fetch(`/auth/login`,{
      method:'POST',
      body:JSON.stringify(LoginInfo),
      headers:{"Content-type":"application/json"}
    })
    if(response.ok){
      const data=await response.json()
      resolve({data})
    }
    else{
      const error=await response.text ();
      console.log(error)
      reject(error)
    }
      
  }catch(error){
reject(error)
  }
      // resolve({data:LoginInfo})
  }
  );
}

export function CheckAuthUser() {
  return new Promise(async(resolve,reject) =>{
     
    try{
    const response=await fetch('/auth/check')
    if(response.ok){
      const data=await response.json()
      resolve({data})
    }
    else{
      const error=await response.text ();
      console.log(error)
      reject(error)
    }
      
  }catch(error){
reject(error)
  }
      // resolve({data:LoginInfo})
  }
  );
}



export function SighOut() {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    resolve({data:'Success'})
  }
  );
}


