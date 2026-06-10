import { NavbarV1 } from "./components/NavbarV1";
import { HeroV2 } from "./components/HeroV2";
import { ExamPick } from "./components/ExamPick";
import { About } from "./components/About";
import { ExperiencePrepzy } from "./components/ExperiencePrepzy";

export default function Home() {
  return (
    <>
      <NavbarV1 />
      <main>
        <HeroV2 />
        <div className="relative" style={{ zIndex: 2 }}>
          <ExamPick />
          <ExperiencePrepzy />
          <About />
        </div>
      </main>
    </>
  );
}
