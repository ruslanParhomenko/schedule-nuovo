import NavMenu from "@/components/nav/nav-menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavMenu>{children}</NavMenu>;
}
