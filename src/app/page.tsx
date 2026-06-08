import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ExamPick } from "./components/ExamPick";
import { About } from "./components/About";
import { ExperiencePrepzy } from "./components/ExperiencePrepzy";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="relative" style={{ zIndex: 2 }}>
          <ExamPick />
          <ExperiencePrepzy />
          <About />
        </div>
      </main>
    </>
  );
}
