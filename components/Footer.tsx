import PixelBand from "@/components/ui/PixelBand";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#141310] border-t border-[#2E2C27]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-10">
        <div className="text-[#EDEBE3] mb-8 flex justify-center">
          <PixelBand variant="hero" />
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[#847F76] text-sm">
            &copy; {year} Sameer Gautam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/uxd-sameer/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#847F76] text-sm hover:text-[#EDEBE3] transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hi@withsameer.design"
              className="text-[#847F76] text-sm hover:text-[#EDEBE3] transition-colors duration-200"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
