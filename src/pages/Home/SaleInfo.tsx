import { TSaleMode } from "../../utils/types";

interface IProps {
  saleMode: TSaleMode;
}

export default function SaleInfo({ saleMode }: IProps) {
  return (
    <div className="col-span-1 md:col-span-2 xl:col-span-1 border-2 border-yellow-800 rounded-md">
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
  )
}