import { ReactNode } from "react";

interface HomeContainerProps {
  children: ReactNode;
}

export default function HomeContainer({ children }: HomeContainerProps) {
  return (
    <main className="home-container flex gap-12 ml-auto mt-20 w-full">
      {children}
    </main>
  );
}
