import { HeroV10 } from "../components/HeroV10";
import { CourseSelector } from "../components/CourseSelector";
import { ExperiencePrepzy } from "../components/ExperiencePrepzy";
import { About } from "../components/About";

export default function V10Page() {
  return (
    <>
      <HeroV10 />
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
