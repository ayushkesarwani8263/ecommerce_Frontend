// A mock function to mimic making an async request for data
export function createOrder(order) {
  return new Promise(async(resolve) =>{
        const response=await fetch("/orders",{
      method:'POST',
      body:JSON.stringify(order),
      headers:{"Content-type":"application/json"}
    })
    const data=await response.json()
    resolve({data})
  }
  );
}


export function fetchAllOrders(sort,pagination) {
   let queryString=''
   for(let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }
    for(let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }
  // console.log(pagination)
  console.log(queryString)
  return new Promise(async(resolve) =>{
    const response=await fetch(`/orders?${queryString}`)
    const data=await response.json()
    console.log(data)
    // const totalOrders= await response.headers.get("X-Total-Count")
    const totalOrders= response.headers.get("X-Total-Count")
    console.log(totalOrders)
    resolve({data:{orders:data,Totalorders:+totalOrders}})
  }
  );
}

export function UpdateOrder(update) {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    const response=await fetch(`/orders/${update.id}`,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{"Content-type":"application/json"}
    })
    // console.log(response)
    const data=await response.json()
    // console.log(data)
    resolve({data})
  }
  );
}


