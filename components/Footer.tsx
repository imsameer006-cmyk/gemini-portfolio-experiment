export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#141310] border-t border-[#2E2C27]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-[#6A6860] text-sm">
          © {year} Sameer Gautam. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/uxd-sameer/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6A6860] text-sm hover:text-[#EDEBE3] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="mailto:imsameer006@gmail.com"
            className="text-[#6A6860] text-sm hover:text-[#EDEBE3] transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
