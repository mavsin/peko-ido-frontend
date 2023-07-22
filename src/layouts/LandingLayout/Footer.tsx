import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { SOCIAL_LINKS } from "../../utils/constants";

export default function Footer() {
  return (
    <footer className="bg-black py-4">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src="/assets/images/logo.png" alt="logo" className="w-8" />
          </Link>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(socialLink => (
              <a key={socialLink.id} href={socialLink.href} target="_blank" rel="noreferrer">
                <Icon icon={socialLink.icon} className="text-gray-100 text-3xl transition hover:text-yellow-800" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}