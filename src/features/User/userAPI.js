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


export function fetchLoggedInUserOrder() {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    const response=await fetch('/orders/own')
    const data=await response.json()
    resolve({data})
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    // alert(userId)
    // console.log(userId)
    const response=await fetch('/user/own')
    const data=await response.json()
    resolve({data})
  }
  );
}

// export function UpdateUser(update) {
//   return new Promise(async(resolve) =>{
//     // setTimeout(() => resolve({ data: amount }), 500)
//     // alert(update.id)
//     console.log(update)
//     const response=await fetch("/user/"+update.id,{
//       method:'PATCH',
//       body:JSON.stringify(update),
//       headers:{"Content-type":"application/json"}
//     })
//     console.log(response)
//     const data=await response.json()
//     console.log(data)
//     resolve({data})
//   }
//   );
// }


export function UpdateUser(update) {
  return new Promise(async (resolve) => {
    console.log(update.id)
    const response = await fetch('/user/'+update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
    });
    console.log(response)
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
} 



