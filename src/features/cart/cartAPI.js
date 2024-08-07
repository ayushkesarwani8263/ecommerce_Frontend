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

export function addToCart(item) {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    // console.log(userData)

    // alert("hello")
    const response=await fetch("/cart",{
      method:'POST',
      body:JSON.stringify(item),
      headers:{"Content-type":"application/json"}
    })
    const data=await response.json()
    resolve({data})
  }
  );
}

export function fetchitemsByUserId() {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    // alert(userId)
    const response=await fetch('/cart')
    const data=await response.json()
    resolve({data})
  }
  );
}


export function updateCart(update) {
  return new Promise(async(resolve) =>{
    // alert("hello")
    const response=await fetch(`/cart/${update.id}`,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{"Content-type":"application/json"}
    })
    const data=await response.json()
    resolve({data})
  }
  );
}


export function deleteCart(itemId) {
  return new Promise(async(resolve) =>{
    // alert("hello")
    console.log(itemId)
    const response=await fetch(`/cart/${itemId}`,{
      method:'DELETE',
      headers:{"Content-type":"application/json"}
    })
    const data=await response.json()
    resolve({data:{id:itemId}})
  }
  );
}


export function resetCart() {
  return new Promise(async(resolve) =>{
    // alert("hello")
     const response=await fetchitemsByUserId()
     const items=response.data;
    //  console.log(await response.json())
    for(let item of items){
      console.log(item)
        await deleteCart(item.id)
      }
    resolve({status:"success"})
  }
  );
}