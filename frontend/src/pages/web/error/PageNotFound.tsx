import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import img from "@/assets/404 Page Not Found (1).png";

const PageNotFound = () => {
  return (
    <section className="min-h-screen flex items-center justify-center  p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-12 flex flex-col lg:flex-row items-stretch w-[90%] max-w-6xl lg:gap-16">
        {/* Sección Izquierda: Imagen */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start items-center">
          <div className="w-80 h-80 lg:w-96 lg:h-96 flex items-center">
            <img
              src={img}
              alt="404 Ilustración"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Sección Derecha: Contenido */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left space-y-6">
          <h1 className="text-8xl font-extrabold text-blue-600">404</h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 font-semibold">
            Parece que estás perdido.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            La página que buscas no está disponible o ha sido movida.
          </p>

          {/* Botón para ir al inicio */}
          <div className="pt-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-xl hover:underline hover:scale-105 transition-all"
            >
              Ir al Inicio <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageNotFound;
