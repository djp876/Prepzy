import { HeroV8 } from "../components/HeroV8";
import { CourseSelector } from "../components/CourseSelector";
import { ExperiencePrepzy } from "../components/ExperiencePrepzy";
import { About } from "../components/About";

export default function V8Page() {
  return (
    <>
      <HeroV8 />
      <div className="relative" style={{ zIndex: 2 }}>
        <CourseSelector />
        <ExperiencePrepzy />
        <About />
      </div>
    </>
  );
}
