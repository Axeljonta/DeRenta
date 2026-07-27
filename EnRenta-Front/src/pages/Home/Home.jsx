import { HomeRecommendations } from "../../components/HomeRecommendations/HomeRecommendations.jsx"
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="homeBuscador">
          <h1>Encuentra el auto que buscas</h1>
      </section>
      <section className="homeCategorias">
          <h2>Explora nuestras categorias</h2>
      </section>
      <section className="homeRecomendaciones">
          <h3>RECOMENDACIONES PARA VOS</h3>
          <HomeRecommendations />
      </section>
    </div>
  );
}

export default Home;