import { useState } from 'react';
import { ArrowLeft, Loader2, Mail, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import img from "../../assets/password-update.png";
import { Link } from "react-router-dom"
export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simular una llamada a la API
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <Card className="shadow-2xl">
            <CardContent className="p-0">
              <div className="md:flex">
                {/* Left column - Image */}
                <div className="md:w-1/2 bg-gray-100 p-8 flex flex-col justify-center items-center rounded-l-lg">
                  <div className="bg-white rounded-full p-2">
                    <img
                      src={img}
                      alt="Recuperación de contraseña"

                      className=" w-36 h-36 p-2 object-contain"
                    />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 text-center">Recupera el acceso a tu cuenta</h2>
                  <p className="text-center mb-4">No te preocupes, te ayudaremos a recuperar tu contraseña en unos sencillos pasos.</p>
                </div>

                {/* Right column - Form */}
                <div className="md:w-1/2 p-8">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">
                      Recupera tu contraseña
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                      Ingresa tu correo electrónico y te enviaremos las instrucciones para restablecer tu contraseña.
                    </CardDescription>
                  </CardHeader>
                  {!isSubmitted ? (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Correo electrónico
                        </Label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="pl-10 block w-full rounded-md border-gray-300 focus:ring-[#2F93D1] focus:border-[#2F93D1]"
                            placeholder="tu@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <Button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2F93D1] hover:bg-[#007ACC] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F93D1]"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="animate-spin mr-2 h-4 w-4" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              Enviar instrucciones
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <Alert className="mt-6">
                      <Mail className="h-4 w-4" />
                      <AlertTitle>Instrucciones enviadas</AlertTitle>
                      <AlertDescription>
                        Hemos enviado las instrucciones para restablecer tu contraseña a {email}. Por favor, revisa tu bandeja de entrada y sigue los pasos indicados.
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="mt-6 text-sm text-center">
                    <Link to={"/login"} className="font-medium text-[#2F93D1] hover:text-[#007ACC] flex items-center justify-center">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Volver a iniciar sesión
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>


    </div>
  )
}