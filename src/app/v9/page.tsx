import { HeroV9 } from "../components/HeroV9";
import { CourseSelector } from "../components/CourseSelector";
import { ExperiencePrepzy } from "../components/ExperiencePrepzy";
import { About } from "../components/About";

export default function V9Page() {
  return (
    <>
      <HeroV9 />
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
