// A mock function to mimic making an async request for data
export function fetchAllProduct() {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    const response=await fetch("/products")
    // console.log("hlw")
    const data=await response.json()
    resolve({data})
  }
  );
}


export function fetchProductByFilter( filter,sort,pagination,admin) {
  console.log(filter)
  // filter={"categories":["smartphone","laptop"]}

  
  let queryString=''
  for(let key in filter){
    //  console.log(filter[key])
    const categoriesValue=filter[key];
    if(categoriesValue.length>0){
    const lastCategoryVlaue=categoriesValue[categoriesValue.length-1] 
    // console.log(lastCategoryVlaue)
    queryString +=`${key}=${lastCategoryVlaue}&`
  }
}

  for(let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }

if(admin){
  queryString+='admin=true&'
}

  // console.log(queryString)
  // console.log(queryString)
  return new Promise(async(resolve) =>{
    // console.log(queryString)
    // setTimeout(() => resolve({ data: amount }), 500)     
    // console.log(queryString)
    const response=await fetch("/products?"+queryString)
    const data=await response.json()
    // console.log(data)
    const totalItem=await response.headers.get("X-Total-Count")
    // resolve()
    // console.log(totalItem)
    resolve({data:{products:data,totalItem:+totalItem}})
  }
  );
}


export function fetchAllCategorys() {
  return new Promise(async(resolve) =>{
    const response=await fetch("/categorys")
    const data=await response.json()
    resolve({data})
  }
  );
}

export function fetchAllBrands() {
  return new Promise(async(resolve) =>{
    const response=await fetch("/brands")
    const data=await response.json()
    resolve({data})
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async(resolve) =>{
    const response=await fetch("/products/"+id)
    const data=await response.json()
    console.log(data)
    resolve({data})
  }
  );
}

export function CreateProduct(product) {
  return new Promise(async(resolve) =>{
    // setTimeout(() => resolve({ data: amount }), 500)
    // console.log(userData)

    // alert("hello")
    const response=await fetch("/products",{
      method:'POST',
      body:JSON.stringify(product),
      headers:{"Content-type":"application/json"}
    })
    const data=await response.json()
    resolve({data})
  }
  );
}
export function UpdateProduct(update) {
  return new Promise(async(resolve) =>{
    
    const response=await fetch(`/products/${update.id}`,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{"Content-type":"application/json"}
    })
    const data=await response.json()
    resolve({data})
  }
  );
}