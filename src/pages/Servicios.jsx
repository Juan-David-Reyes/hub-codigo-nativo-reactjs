import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import '../styles/Servicios.css';

const Servicios = () => {
  const servicios = [
    {
      title: 'Diseño web',
      description: 'Sitios web rápidos, seguros y escalables',
      link: 'https://codigonativo.com/agencia-de-diseno-web-colombia/',
      badge: 'DESTACADO'
    },
    {
      title: 'Re-diseño web',
      description: 'Webs profesionales que impulsan tu negocio',
      link: 'https://codigonativo.com/rediseno-web/'
    },
    {
      title: 'Mantenimiento web',
      description: 'Soporte continuo para tu página web',
      link: 'https://codigonativo.com/mantenimiento-web/'
    },
    {
      title: 'Optimización web',
      description: 'Mejora el rendimiento de tu sitio',
      link: 'https://codigonativo.com/optimizacion-web/'
    },
    {
      title: 'Diseño UX/UI',
      description: 'Experiencias intuitivas que convierten',
      link: 'https://codigonativo.com/servicios/diseno-ux-ui',
      badge: 'NUEVO'
    }
  ];

  const faqs = [
    {
      question: '¿Para qué tipo de proyectos aplica el diseño UX/UI?',
      answer: 'Diseñamos experiencias digitales para sitios web, aplicaciones móviles, plataformas SaaS y más.'
    },
    {
      question: '¿Cómo es el proceso de diseño UX/UI?',
      answer: 'Comenzamos con una fase de investigación y análisis, luego pasamos a prototipos y wireframes, y finalmente trabajamos en el diseño visual y pruebas de usabilidad.'
    },
    {
      question: '¿Qué herramientas utilizan para diseñar?',
      answer: 'Usamos herramientas líderes en la industria como Figma, Adobe Suite, Google Suite, y plataformas de testing como Maze.'
    },
    {
      question: '¿Involucran a los usuarios en el proceso?',
      answer: 'Sí, realizamos pruebas de usuario y entrevistas para garantizar que el diseño cumpla con las necesidades reales de tus clientes.'
    },
    {
      question: '¿Qué recibiré al final del proyecto?',
      answer: 'Entregamos prototipos funcionales, guías de estilo y archivos listos para ser implementados por desarrolladores.'
    }
  ];

  return (
    <>
      <Header />
      <main>
        <section className="servicios-hero">
          <h1>Nuestros Servicios</h1>
          <p>Soluciones digitales integrales para tu negocio</p>
        </section>

        <section className="servicios-grid">
          <div className="container">
            {servicios.map((servicio, index) => (
              <div key={index} className="servicio-card">
                <a href={servicio.link}>
                  <img width="40" height="40" src="/servicios1.png" alt="" />
                  <h2>
                    {servicio.title}
                    {servicio.badge && (
                      <span className={`badge ${servicio.badge.toLowerCase()}`}>
                        {servicio.badge}
                      </span>
                    )}
                  </h2>
                  <p>{servicio.description}</p>
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="faqs-section">
          <div className="container">
            <h2>Preguntas Frecuentes</h2>
            {faqs.map((faq, index) => (
              <div key={index} className="faq">
                <h3 className="question">
                  {faq.question} <span className="fas fa-chevron-down"></span>
                </h3>
                <p className="answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Servicios;
