import { useState } from 'react';
import type { V2_MetaFunction } from "@remix-run/node";
import { ButtonGroup, Button } from "@material-tailwind/react";
import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import Container from "~/components/Container";
import Input from "~/components/Input";

//  -----------------------------------------------------------------------------------------------------

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

//  -----------------------------------------------------------------------------------------------------

type TSaleMode = 'private' | 'public'

//  -----------------------------------------------------------------------------------------------------

export default function Index() {
  const [saleMode, setSaleMode] = useState<TSaleMode>('private')

  return (
    <div className="bg-[#222222] flex flex-col gap-8 min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Container>
          <div className="flex flex-col gap-8">
            <div className="flex justify-center">
              <ButtonGroup color="amber" variant="outlined">
                <Button
                  className={`text-lg font-normal normal-case py-2 ${saleMode === 'private' ? 'text-gray-100' : ''}`}
                  onClick={() => setSaleMode('private')}
                >Private</Button>
                <Button
                  className={`text-lg font-normal normal-case py-2 ${saleMode === 'public' ? 'text-gray-100' : ''}`}
                  onClick={() => setSaleMode('public')}
                >Public</Button>
              </ButtonGroup>
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 flex flex-col gap-8">
                {/* Logo and Sale */}
                <div className="grid grid-cols-7 gap-8">
                  {/* Logo */}
                  <div className="col-span-3 border-2 border-yellow-800 rounded-md flex flex-col justify-center items-center">
                    <img src="/assets/images/logo.png" alt="Logo" className="w-40" />
                  </div>

                  {/* Sale */}
                  <div className="col-span-4 border-2 border-yellow-800 rounded-md">
                    {/* title */}
                    <div className="py-2 px-4 border-b-2 border-yellow-800">
                      <h2 className="text-yellow-800 uppercase text-lg">Sale</h2>
                    </div>
                    {/* content */}
                    <div className="p-4 flex flex-col gap-6">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500 text-sm">Amount:</span>
                          <Input
                            className="!border !border-yellow-800 rounded-lg"
                            endAdornment={<Button color="amber" className="text-base font-normal py-1 px-3 rounded-lg">Max</Button>}
                          />
                          <Button color="amber" className="text-base">Buy</Button>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-gray-500 text-sm">Balance:</span>
                          <span className="text-gray-100 text-base uppercase font-bold">- - ETH</span>
                        </div>
                      </div>

                      {/* Sale ends in */}
                      <div className="flex flex-col gap-2">
                        <h2 className="text-yellow-800 uppercase text-lg">Sale ends in</h2>
                        <p className="text-gray-100">
                          2 Days : 7 Hours : 14 Minutes : 10 Seconds
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total raised */}
                <div className="border-2 border-yellow-800 rounded-md">
                  {/* title */}
                  <div className="py-2 px-4 border-b-2 border-yellow-800">
                    <h2 className="text-yellow-800 text-lg">Total raised: <span className="uppercase">- - ETH (- - %)</span></h2>
                  </div>
                  {/* Content 1 */}
                  <div className="p-4 border-b-2 border-yellow-800 grid grid-cols-7">
                    <div className="col-span-3 flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        {/* Total purchased */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Total Purchased:</span>
                          <span className="text-base text-gray-100 uppercase font-bold">- - ETH</span>
                        </div>

                        {/* Receivable PEKO */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Receivable PEKO:</span>
                          <span className="text-base text-gray-100 uppercase font-bold">- - PEKO</span>
                        </div>
                      </div>

                      {/* Receivable ETH */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-yellow-800">Receivable ETH:</span>
                        <span className="text-base text-gray-100 uppercase font-bold">- - ETH</span>
                      </div>
                    </div>

                    <div className="col-span-4 flex flex-col justify-center items-center">
                      <Button color="amber" className="text-sm normal-case">Claim ETH and PEKO</Button>
                    </div>
                  </div>

                  {/* Content 2 */}
                  <div className="p-4 grid grid-cols-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-800 text-sm">Total bonus pool:</span>
                        <span className="text-gray-100 uppercase font-bold">- - PEKO</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-800 text-sm">Total devidends:</span>
                        <span className="text-gray-100 uppercase font-bold">- - PEKO</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-800 text-sm">Quality available:</span>
                        <span className="text-gray-100 uppercase font-bold">- - PEKO</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-800 text-sm">Quality received:</span>
                        <span className="text-gray-100 uppercase font-bold">- - PEKO</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                      <Button color="amber" className="text-sm normal-case">CLAIM</Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sale Info */}
              <div className="col-span-1 border-2 border-yellow-800 rounded-md">
                {/* title */}
                <div className="py-2 px-4 border-b-2 border-yellow-800">
                  <h2 className="text-yellow-800 text-lg">SALE INFO</h2>
                </div>

                <div className="p-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">Start Sale</span>
                    <span className="text-gray-100 text-base font-bold">UTC 2023-05-18 02:00:00</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">End of Sale</span>
                    <span className="text-gray-100 text-base font-bold">UTC 2023-05-19 02:00:00</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">Sale Type</span>
                    <span className="text-gray-100 text-base font-bold uppercase">{saleMode}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">Method</span>
                    <span className="text-yellow-800 text-base font-bold">Overflow</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">Hard cap</span>
                    <span className="text-yellow-800 text-base font-bold uppercase">45.000000 ETH</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">Soft cap</span>
                    <span className="text-yellow-800 text-base font-bold uppercase">0.000000 ETH</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">Price</span>
                    <span className="text-gray-100 text-base font-bold">0.0000000035 ETH per token</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-500 text-sm">Personal cap</span>
                    <span className="text-gray-100 text-base font-bold">0.1000 ETH - 0.0000 ETH</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
