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
          <h4>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fugiat obcaecati expedita commodi accusamus voluptate nemo enim, magnam quo inventore cupiditate magni rem accusantium nostrum ea velit. Rem, aut sint.</h4>
          <h4>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fugiat obcaecati expedita commodi accusamus voluptate nemo enim, magnam quo inventore cupiditate magni rem accusantium nostrum ea velit. Rem, aut sint.</h4>
          <h4>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fugiat obcaecati expedita commodi accusamus voluptate nemo enim, magnam quo inventore cupiditate magni rem accusantium nostrum ea velit. Rem, aut sint.</h4>
          <h4>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fugiat obcaecati expedita commodi accusamus voluptate nemo enim, magnam quo inventore cupiditate magni rem accusantium nostrum ea velit. Rem, aut sint.</h4>
          <h4>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fugiat obcaecati expedita commodi accusamus voluptate nemo enim, magnam quo inventore cupiditate magni rem accusantium nostrum ea velit. Rem, aut sint.</h4>
          <h4>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fugiat obcaecati expedita commodi accusamus voluptate nemo enim, magnam quo inventore cupiditate magni rem accusantium nostrum ea velit. Rem, aut sint.</h4>
          <h4>lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aspernatur fugiat obcaecati expedita commodi accusamus voluptate nemo enim, magnam quo inventore cupiditate magni rem accusantium nostrum ea velit. Rem, aut sint.</h4>
          
      </section>
      <section className="homeRecomendaciones">
          <h3>RECOMENDACIONES PARA VOS</h3>
          <HomeRecommendations />
      </section>
      
    </div>
  );
}

export default Home;