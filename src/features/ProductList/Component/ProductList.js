import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment,fetchAllProductAsync,selectAllProduct,fetchProductByFiltertAsync, selectTotalItems, selectCategories, selectBrands, fetchAllCategorysAsync, fetchAllBrandsAsync} from "../ProductListSlice";

import { Fragment } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon,StarIcon } from "@heroicons/react/20/solid";
import { ITEM_PER_PAGE, discountPrice } from "../../../Constant";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { handler } from "@tailwindcss/aspect-ratio";
import Pagination from "../../Common/Pagination";
import { selectProductListStatus } from "../ProductListSlice";
import { Grid } from "react-loader-spinner";

const oldproducts = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    title: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    title: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee",
    href: "#",
    thumbnail:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    title: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];


const sortOptions = [
  { name: "Best Rating", sort: "rating",order:'desc', current: false },
  { name: "Price: Low to High", sort: "price",order:'asc',current: false },
  { name: "Price: High to Low", sort: "price",order:'desc',current: false },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const dispatch=useDispatch()
  const products=useSelector(selectAllProduct)
  const totalItems=useSelector(selectTotalItems)
  const categorys=useSelector(selectCategories)
  const brands=useSelector(selectBrands)
  const [filter,setFilter]=useState({})
  const [sort,setSort]=useState({})
  const [page,setPage]=useState(1)
  const status=useSelector(selectProductListStatus)





  const filters = [
    {
      id: "category",
      name: "Category",
          options:categorys,
    },
    {
      id: "brand",
      name: "Brands",
      options:brands,
    },
   
  ];
  
  

  function filterHandler(e,section,option){
    const newFilter={...filter}
    if(e.target.checked){
      if((newFilter[section.id])){
          newFilter[section.id].push(option.value)
        }
        else{
          newFilter[section.id]=[option.value]
        }
    }
    else{
      const index=newFilter[section.id].findIndex(el=>el===option.value)
      newFilter[section.id].splice(index,1)
      console.log(newFilter)
    }
    setFilter(newFilter)
  
    // console.log(section.id,option.value)
  }

  function sortHandler(e,option){
    const test={_sort:option.sort,_order:option.order}
     setSort(test)
  }
  function PageHandler(page){
    // console.log({page})
    setPage(page)
    console.log(page)
  }


  useEffect(()=>{
    //  dispatch(fetchAllProductAsync())
    const pagination={_page:page,_limit:ITEM_PER_PAGE}
    dispatch(fetchProductByFiltertAsync({filter,sort,pagination}))

  },[dispatch,filter,sort,page])

  useEffect(()=>{
    setPage(1)
  },[totalItems,sort])

  useEffect(()=>{
   dispatch(fetchAllCategorysAsync())
   dispatch(fetchAllBrandsAsync())
  },[])
  return (
    <div>
      <div>
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
          <MobileFilter mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} filterHandler={filterHandler} filters={filters}></MobileFilter>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div
                className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24"
                style={{ paddingTop: "28px" }}
              >
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  All Products
                </h1>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item key={option.name}>
                              {({ active }) => (
                                <p
                                  // href={option.href}
                                  onClick={(e)=>sortHandler(e,option)}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                  style={{cursor:"pointer"}}
                                >
                                  {option.name}
                                </p>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* section start */}
              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                 <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* DestopFilters start*/}
                  <DesktopFilter filterHandler={filterHandler} filters={filters}></DesktopFilter>
                  
                  {/* Product grid */}
                  <ProductGrid products={products} status={status}></ProductGrid>
                  
                 </div>
              </section>
              {/* section end        */}

              {/* Pagination start */}
              <Pagination page={page} setPage={setPage} PageHandler={PageHandler} totalItems={totalItems}></Pagination>
              {/* Pagination end */}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}




function ProductGrid({products,status}){
return (
  <div className="lg:col-span-3">
                    
                      {status==='loading'?<div style={{height:"100px",display:"flex",justifyContent:"center",alignItems:"center"}}><Grid
                      visible={true}
                      height="80"
                      width="80"
                      color="rgb(79,70,229)"
                      ariaLabel="grid-loading"
                      radius="12.5"
                      wrapperStyle={{}}
                      wrapperClass="grid-wrapper"
                      /></div>:null}
                      {/* this is our product list */}
                      <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                           
                            {products.map((product) => (
                              <Link to={`/product-detail/${product.id}`}>
                                <div
                                  key={product.id}
                                  className="group relative border-solid border-2 border-gray p-2 "
                                >
                                  <div
                                    className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60"
                                   
                                  >
                                    <img
                                      src={product.thumbnail}
                                      alt={product.title}
                                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                  </div>
                                  <div className="mt-4 flex justify-between">
                                    <div>
                                      <h3 className="text-sm text-gray-700">
                                        <a href={product.thumbnail}>
                                          <span
                                            aria-hidden="true"
                                            className="absolute inset-0"
                                          />
                                          {product.title}
                                        </a>
                                      </h3>
                                      <StarIcon className="w-5 h-5 inline  text-gray-500">
                                      
                                      </StarIcon>
                                      <p className="mt-1 text-sm text-gray-500 inline align-bottom">
                                        {product.rating}
                                      </p>
                                    </div>
                                    <div>
                                    <p className="text-sm font-medium block text-gray-900">
                                      {discountPrice(product)}
                                    </p>
                                    <p className="text-sm font-medium block text-gray-400 line-through">
                                      {product.price}
                                    </p>
                                    
                                  </div>    
                                  </div>
                      {/* {product.deleted && (<div><p className="text-sm text-red-400">Product is deleted</p></div>)} */}
                           {product.stock<=0 && (<div className="text-sm text-red-400">Product is out of stock</div>)}
                                  
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                   
                  </div>
)
}

function DesktopFilter({filterHandler,filters}){
  return (
<form className="hidden lg:block">
                    {/* <h3 className="sr-only">Categories</h3> */}

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-b border-gray-200 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onChange={(e)=>filterHandler(e,section,option)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-${section.id}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>

  )
}

function MobileFilter({mobileFiltersOpen,setMobileFiltersOpen,filterHandler,filters}){
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
    <Dialog
      as="div"
      className="relative z-40 lg:hidden"
      onClose={setMobileFiltersOpen}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 z-40 flex">
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">
                Filters
              </h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>

              {filters.map((section) => (
                <Disclosure
                  as="div"
                  key={section.id}
                  className="border-t border-gray-200 px-4 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-6">
                          {section.options.map(
                            (option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={(e)=>filterHandler(e,section,option)}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            )
                          )}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
  )
}


