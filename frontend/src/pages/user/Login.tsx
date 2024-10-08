import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContextType";
export default function LoginPage() {
  const {signInWithGoogle} = useAuth();
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex flex-grow">
        {/* Left column - Image container */}
        <div className="hidden w-1/2  lg:flex lg:items-center lg:justify-center">
          <div className="relative h-3/4 w-3/4">
            <img
              src="/placeholder.svg?height=600&width=600"
              alt="Uniformes ilustración"
            />
          </div>
        </div>

        {/* Right column - Form container */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-5">
          <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">

              <h2 className=" text-3xl font-bold text-gray-900">
                Iniciar sesión en Cayro
              </h2>
            </div>
            <Button onClick={signInWithGoogle} variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_13183_10121)"><path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8" /><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853" /><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04" /><path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335" /></g><defs><clipPath id="clip0_13183_10121"><rect width="20" height="20" fill="white" transform="translate(0.5)" /></clipPath></defs>
              </svg>
              Iniciar sesión con Google
            </Button>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2F93D1] focus:border-[#2F93D1] focus:z-10 sm:text-sm mt-1"
                  placeholder="correo"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#2F93D1]  focus:border-[#2F93D1] focus:z-10 sm:text-sm mt-1"
                  placeholder="contraseña"
                />
              </div>
              <div className="flex items-end justify-end">
               
                <div className="text-sm">
                  <a href="/password-recovery" className="font-medium text-[#2F93D1] hover:text-[#007ACC]">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#2F93D1] hover:bg-[#007ACC] focus:ring-[#2F93D1] text-white">
                Iniciar sesión
              </Button>
            </form>
            <p className="mt-2 text-center text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <a href="/sign-up" className="font-medium text-[#2F93D1] hover:text-[#007ACC]">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>

     
    </div>
  )
}