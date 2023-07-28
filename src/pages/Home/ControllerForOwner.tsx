import { Button } from "@material-tailwind/react";

export default function ControllerForOwner() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Button
          color="amber"
          className="text-base normal-case w-full"
        >Start public sale</Button>
      </div>
      <div>
        <Button
          color="amber"
          className="text-base normal-case w-full"
        >Start private sale</Button>
      </div>
      <div>
        <Button
          color="amber"
          className="text-base normal-case w-full"
        >Stop sale</Button>
      </div>
    </div>
  )
}