import { NavbarV1 } from "./components/NavbarV1";
import { HeroV1 } from "./components/HeroV1";
import { ExamPick } from "./components/ExamPick";
import { About } from "./components/About";
import { ExperiencePrepzy } from "./components/ExperiencePrepzy";

export default function Home() {
  return (
    <>
      <NavbarV1 />
      <main>
        <HeroV1 />
        <div className="relative" style={{ zIndex: 2 }}>
          <ExamPick />
          <ExperiencePrepzy />
          <About />
        </div>
      </main>
    </>
  );
}
