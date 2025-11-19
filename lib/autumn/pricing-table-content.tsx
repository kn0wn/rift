import { type Product } from "autumn-js";

export const getPricingTableContent = (product: Product) => {
  const { scenario, free_trial, properties } = product;
  const { is_one_off, updateable, has_trial } = properties;

  if (has_trial) {
    return {
      buttonText: <p>Comenzar Prueba Gratuita</p>,
    };
  }

  switch (scenario) {
    case "scheduled":
      return {
        buttonText: <p>Plan Programado</p>,
      };

    case "active":
      if (updateable) {
        return {
          buttonText: <p>Actualizar Plan</p>,
        };
      }

      return {
        buttonText: <p>Plan Actual</p>,
      };

    case "new":
      if (is_one_off) {
        return {
          buttonText: <p>Comprar</p>,
        };
      }

      return {
        buttonText: <p>Suscribirse</p>,
      };

    case "renew":
      return {
        buttonText: <p>Renovar</p>,
      };

    case "upgrade":
      return {
        buttonText: <p>Mejorar</p>,
      };

    case "downgrade":
      return {
        buttonText: <p>Degradar</p>,
      };

    case "cancel":
      return {
        buttonText: <p>Cancelar Plan</p>,
      };

    default:
      return {
        buttonText: <p>Suscribirse</p>,
      };
  }
};
