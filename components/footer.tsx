import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const resourceLinks = [
    { label: "Support", href: "#support" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
  ];

  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-xl border border-muted bg-card p-8 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Logo and Copyright Section */}
            <div className="space-y-6">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/logo.svg"
                  alt="DemoDrive Logo"
                  width={32}
                  height={32}
                />
                <span className="font-bold text-xl">DemoDrive</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} DemoDrive. All rights reserved.
              </p>
            </div>

            {/* Resources Links Section */}
            <div className="mt-8 md:mt-0">
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
