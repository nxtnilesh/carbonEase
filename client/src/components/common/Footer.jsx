import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" bg-gray-900 text-white py-6">
      <div className="mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-5 h-5 hover:text-gray-400" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="w-5 h-5 hover:text-gray-400" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-5 h-5 hover:text-gray-400" />
          </a>
        </div>
      </div>
    </footer>
  );
}
