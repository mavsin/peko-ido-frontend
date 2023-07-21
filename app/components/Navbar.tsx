import { Link } from "@remix-run/react";
import Container from "./Container";
import { Button } from "@material-tailwind/react";

export default function Navbar() {
  return (
    <nav className="flex justify-center py-4 bg-black border-b border-gray-500">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/assets/images/logo.png" alt="logo" className="w-8" />
          </Link>

          <Button color="amber" className="normal-case text-sm">Connect Wallet</Button>
        </div>
      </Container>
    </nav>
  )
}