
import Hero from "../components/Hero";
import Menu from "../components/Menu";

function Home() {
  return (
    <>
      <Hero />

      <section className="featured-menu">
        <Menu />
      </section>
    </>
  );
}

export default Home;
