import { TablerBrandOpenai } from "@/components/ui/icons/openai-icon";
import { GoogleIcon } from "@/components/ui/icons/google-icon";
import { AnthropicIcon } from "@/components/ui/icons/anthropic-icon";
import { XAiIcon } from "@/components/ui/icons/xai-icon";

export default function Pricing() {
  return (
    <div className="space-y-6">
      {/* Pricing Cards */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Plus Plan */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
            {/* Title and Subtitle Section */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Plus
              </h3>
              <p className="text-xs text-gray-600">
                Perfecto para la mayor parte de los usuarios
              </p>
            </div>
            
            {/* Pricing Section */}
            <div className="mb-4">
              <span className="text-xl font-bold text-gray-900">$190 MXN/month</span>
            </div>
            
            {/* Features Section */}
            <div className="flex-1 mb-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  Acesso a todos los modelos de IA
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  500 Mensajes standar al mes
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  100 Mensajes Premium al mes
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Guias de uso de IA
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Centro de conocimiento IA
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Soporte tecnico
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Mensajes super veloces
                </li>
              </ul>
            </div>
            
            {/* Button Section */}
            <div>
              <button className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700 flex items-center justify-center gap-2">
                Iniciar mi subcripcion
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
            {/* Title and Subtitle Section */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Pro
              </h3>
              <p className="text-xs text-gray-600">
                Para aquellos que necesitan mas mensajess
              </p>
            </div>
            
            {/* Pricing Section */}
            <div className="mb-4">
              <span className="text-xl font-bold text-gray-900">$540 MXN/month</span>
            </div>
            
            {/* Features Section */}
            <div className="flex-1 mb-4">
              <ul className="space-y-2">
                <li className="text-xs text-gray-600 mb-2">
                  Todo lo que incluye el plan Plus, mas:
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  700 Mensajes Standar totales al mes
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  300 Mensajes Premium totales al mes
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Acesso anticipado a nuevas funciones
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Soporte prioritario
                </li>
              </ul>
            </div>
            
            {/* Button Section */}
            <div>
              <button className="w-full px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                Iniciar mi subcripcion
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="border border-gray-200 rounded-lg p-4 bg-white h-full flex flex-col">
            {/* Title and Subtitle Section */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Organizacion
              </h3>
              <p className="text-xs text-gray-600">
                Planes dedicados para organizaciones con funcionalidades avanzadas
              </p>
            </div>
            
            {/* Pricing Section - Empty to maintain alignment */}
            <div className="mb-4">
              {/* Empty pricing section to maintain alignment with other cards */}
            </div>
            
            {/* Features Section */}
            <div className="flex-1 mb-4">
              <ul className="space-y-2">
                <li className="text-xs text-gray-600 mb-2 mt-4">
                  Limites de mensajes personalizados para cada organizacion
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Onboarding personalizado
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Creacion de equipos y gestion de usuarios
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  SCIM y Directory Sync
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  SSO/SAML/OIDC
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Audit logs
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                  </svg>
                  Soporte Exclusivo
                </li>
              </ul>
            </div>
            
            {/* Button Section */}
            <div>
              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 flex items-center justify-center gap-2">
                  Contactar
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Comparación de Precios</h3>
        <p className="text-gray-600">Precios individuales de cada proveedor de IA</p>
      </div>

      {/* AI Models Pricing Comparison Table */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-lg mx-auto">
        <div className="max-w-sm mx-auto">
          <div className="space-y-3">
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TablerBrandOpenai className="w-6 h-6 text-green-600" />
                <span className="font-medium text-gray-900">ChatGPT Plus</span>
              </div>
              <span className="text-lg font-bold text-gray-900">$400 MXN</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <XAiIcon className="w-6 h-6 text-black" />
                <span className="font-medium text-gray-900">Grok Pro</span>
              </div>
              <span className="text-lg font-bold text-gray-900">$600 MXN</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <GoogleIcon className="w-6 h-6 text-purple-600" />
                <span className="font-medium text-gray-900">Gemini Advanced</span>
              </div>
              <span className="text-lg font-bold text-gray-900">$400 MXN</span>
            </div>
            <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AnthropicIcon className="w-6 h-6 text-black" />
                <span className="font-medium text-gray-900">Claude Pro</span>
              </div>
              <span className="text-lg font-bold text-gray-900">$400 MXN</span>
            </div>
            <div className="border-t-2 border-gray-300 pt-3 mt-4">
              <div className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">$1,800 MXN</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Savings Highlight */}
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-semibold text-green-800">Ahorro con nuestro servicio</span>
          </div>
          <p className="text-sm text-green-700">
            Con nuestro plan Plus a $190 MXN/mes, obtienes acceso a todos estos modelos por una fracción del costo total ($1,800). 
            <span className="font-semibold">Ahorras $1,610 MXN/mes</span> y tienes la comodidad de un solo servicio.
          </p>
        </div>
      </div>
    </div>
  );
}
