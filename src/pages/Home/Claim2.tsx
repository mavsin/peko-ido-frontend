import { Button } from '@material-tailwind/react'

export default function Claim2() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
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
        <Button color="amber" className="text-base normal-case">CLAIM</Button>
      </div>
    </div>
  )
}