import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import '../styles/Home.css';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <section className="home-hero gradient-bg">
          <div className="gradients-container">
            <div className="g1"></div>
            <div className="g2"></div>
            <div className="g3"></div>
            <div className="g4"></div>
            <div className="g5"></div>
          </div>

          <div className="content_cont">
            <h1>A place to develop your @project</h1>
            <div className="proyects">
              <div className="card">
                <img src="/imagen.jpg" width="500" height="500" alt="" />
              </div>
              <div className="card">
                <img src="/imagen.jpg" width="500" height="500" alt="" />
              </div>
              <div className="card">
                <img src="/imagen.jpg" width="500" height="500" alt="" />
              </div>
              <div className="card">
                <img src="/imagen.jpg" width="500" height="500" alt="" />
              </div>
            </div>

            <div className="desc-hero">
              <p>
                Diseñamos pensando en la experiencia que va a llevar a tus visitantes a 
                elegirte por encima de la competencia.
              </p>

              <div className="ctas">
                <a href="" className="cta-green">Nuestros servicios</a>
                <a href="" className="cta">Contacto</a>
              </div>
            </div>
          </div>
        </section>

        <section className="slider-brands">
          <h2>Quienes nos han confiado sus proyectos</h2>
          <div className="slider">
            <ul className="move">
              <li className="box"><img width="120" height="60" src="/brands/logo1.png" alt="" /></li>
              <li className="box"><img width="120" height="60" src="/brands/logo2.png" alt="" /></li>
              <li className="box"><img width="120" height="60" src="/brands/logo3.png" alt="" /></li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
