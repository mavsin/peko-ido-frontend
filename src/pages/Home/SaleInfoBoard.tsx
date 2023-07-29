import { ISaleInfo } from '../../utils/interfaces';

//  ----------------------------------------------------------------------------------------------------------

interface IProps {
  saleInfo: ISaleInfo;
}

//  ----------------------------------------------------------------------------------------------------------

export default function SaleInfoBoard({ saleInfo }: IProps) {
  return (
    <div className="col-span-1 md:col-span-2 xl:col-span-1 border-2 border-yellow-800 rounded-md">
      {/* title */}
      <div className="py-2 px-4 border-b-2 border-yellow-800">
        <h2 className="text-yellow-800 text-lg">SALE INFO</h2>
      </div>

      <div className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Start Sale</span>
          <span className="text-gray-100 text-base font-bold">UTC {saleInfo.startAt}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">End of Sale</span>
          <span className="text-gray-100 text-base font-bold">UTC {saleInfo.endAt}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Sale Type</span>
          <span className="text-gray-100 text-base font-bold uppercase">{saleInfo.saleType}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Method</span>
          <span className="text-yellow-800 text-base font-bold">{saleInfo.method}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Hard cap</span>
          <span className="text-yellow-800 text-base font-bold uppercase">{saleInfo.hardCap} ETH</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 text-sm">Price</span>
          <span className="text-gray-100 text-base font-bold">{saleInfo.priceInEth} ETH per token</span>
        </div>
        {saleInfo.personalCap ? (
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm">Personal cap</span>
            <span className="text-gray-100 text-base font-bold">{saleInfo.personalCap[0]} ETH - {saleInfo.personalCap[1]} ETH</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}