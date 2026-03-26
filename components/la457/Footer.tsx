import * as React from "react";

function Footer() {
  return (
    <footer className="px-6 pt-10 pb-5 border-t border-solid bg-neutral-950 bg-opacity-90 border-t-neutral-300 border-t-opacity-20">
      <div className="mx-auto my-0 text-center max-w-[1200px]">
        <p className="mb-4 text-sm text-zinc-300">
          © 2025 Los Angeles County Employees Retirement Association. All
          rights reserved.
        </p>
        <p className="text-xs text-zinc-300">
          This information is provided for educational purposes only and does
          not constitute legal or financial advice. Please consult with
          qualified professionals for specific guidance regarding your
          situation.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
