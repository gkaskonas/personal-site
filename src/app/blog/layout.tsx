import React from "react";
import NavbarBlog from "./[slug]/components/navbarblog";

export default function BlogsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarBlog />
      {children}
    </section>
  );
}
