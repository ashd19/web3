import React, { useState } from "react";

const Form = () => {
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-10 ">
        <div className="w-200 h-auto">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h1 className="block text-gray-700 text-sm font-bold mb-2">
                Tsender
              </h1>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Token Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="0x"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Recipients"
              >
                Recipients
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="Receipients"
                type="text"
                placeholder="012x,013x,..."
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Recipients"
              >
                Amounts (wei; comma or new line separated)
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="Amoujnts"
                type="text"
                placeholder="100,200,300,.."
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            <div className="border-2 rounded-xl p-2  border-gray-700 mb- text-xl font-semibold ">
            <h1 className="text-black">Details:</h1>
              <h1 className="text-black">Amount (wei): {amount}</h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
