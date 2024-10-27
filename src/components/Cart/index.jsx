import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useBookStore } from "@/store/book"
import { useNavigate } from 'react-router-dom'
import BookItem from '../BookItem'

const Cart = ({ items, open, onCancel }) => {
  const { removeCart } = useBookStore()
  console.log(removeCart)
  const navigate = useNavigate()
  
  const changePage = (url) => {
    navigate(url)
    onCancel(false)
    }

  const handleRemoveClick = (idx) => {
    removeCart(idx)
  }

  return (
    <Dialog open={open} onClose={() => onCancel(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">加入購物車的商品</DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => onCancel(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  {items.length ? (<BookItem books={items} onRemoveClick={handleRemoveClick} />) : 
                  (<div className='flex justify-center'>
                    <span className='mt-[50%] text-xl text-gray-400'>您的購物車是空的</span>
                  </div>)}
                  
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>總金額</p>
                    <p>$262</p>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      className="w-full rounded-md border border-transparent bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-400"
                      onClick={() => changePage('/checkout')}
                    >
                      結帳
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <button
                      type="button"
                      onClick={() => onCancel(false)}
                      className="font-medium text-blue-600 hover:text-blue-500"
                      >
                      繼續逛逛
                    </button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default Cart