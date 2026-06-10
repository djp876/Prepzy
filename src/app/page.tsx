import { NavbarV1 } from "./components/NavbarV1";
import { HeroV4 } from "./components/HeroV4";
import { CourseSelector } from "./components/CourseSelector";
import { About } from "./components/About";
import { ExperiencePrepzy } from "./components/ExperiencePrepzy";

export default function Home() {
  return (
    <>
      <NavbarV1 />
      <main>
        <HeroV4 />
        <div className="relative" style={{ zIndex: 2 }}>
          <CourseSelector />
          <ExperiencePrepzy />
          <About />
        </div>
      </main>
    </>
  );
}
