import { HeroV11 } from "../components/HeroV11";
import { CourseSelector } from "../components/CourseSelector";
import { ExperiencePrepzy } from "../components/ExperiencePrepzy";
import { About } from "../components/About";

export default function V11Page() {
  return (
    <>
      <HeroV11 />
      <div className="relative" style={{ zIndex: 2 }}>
        <CourseSelector />
        <div id="experience" style={{ scrollMarginTop: 90 }}>
          <ExperiencePrepzy />
        </div>
        <About />
      </div>
    </>
  );
}
