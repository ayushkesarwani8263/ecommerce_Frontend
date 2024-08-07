import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCartByAsync,
  selectCart,
  selectCartLoader,
  selectCartStatus,
  updateCartByAsync,
} from "./cartSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { discountPrice } from "../../Constant";
import { Grid } from "react-loader-spinner";
import Modal from "../Common/Modal";

// const items = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-item-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
//   // More items...
// ]

export default function Cart() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const items = useSelector(selectCart);
  const status = useSelector(selectCartStatus);
  const cartLoader=useSelector(selectCartLoader)
  const [openModal,setOpenModal]=useState(null)
  const totalAmount = items.reduce(
    (ammount, item) => discountPrice(item.product) * item.quantity + ammount,
    0
  );
  const totalItems = items.reduce(
    (total, item) => parseInt(item.quantity) + total,
    0
  );

  const handleQuantity = (e, item) => {
    dispatch(updateCartByAsync({id:item.id, quantity: +e.target.value }));
  };

  const handleDelete = (e, id) => {
    dispatch(deleteCartByAsync(id));
  };
  // console.log("hello cart update")
  return (
    <>
      {!items.length && cartLoader && <Navigate to="/" replace={true}></Navigate>}

      <div
        className=" mt-10 mx-auto max-w-7xl px-4  sm:px-6  lg:px-8"
        style={{ backgroundColor: "#eceaea" }}
      >
        <div className="mt-8">
          <div className="flow-root">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className=" text-4xl mt-3 mb-3 font-bold leading-9 tracking-tight text-gray-900">
                Cart
              </h2>
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.product.href}>{item.product.title}</a>
                          </h3>
                          <p className="ml-4">${discountPrice(item.product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline text-sm font-medium leading-6 text-gray-900 mr-2"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <Modal
                            title={`Delete ${item.product.title}`}
                            massage="Are u sure you want to delete this item"
                            dangerOption="Delete"
                            cancleOption="Cancle "
                            dangerAction={(e) => handleDelete(e, item.id)}
                            showModal={openModal===item.id}
                            cancleAction={()=>setOpenModal(null)}
                          ></Modal>

                          <button
                            onClick={e=>setOpenModal(item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                  // </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* // </div> */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t  border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex  my-3 justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>

            <div className="flex my-3 justify-between text-base font-medium text-gray-900">
              <p>Total Items In Cart</p>
              <p>{totalItems} Items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/CheckOut"
                href="#"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or{" "}
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={() => setOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
