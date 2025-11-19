import type { ProductDetails } from "autumn-js/react";

export const productDetails: ProductDetails[] = [
    {
    id: "free",
    description: "Genial para probar Rift AI",
    items: [
      {
        featureId: "standard_messages",
        primaryText: "15 Mensajes Estándar",
      },
    ],
  },
  {
    id: "plus",
    description: "Ideal para usuarios frecuentes",
    recommendText: "Más Popular",
    price: {
      primaryText: "$10 USD",
      secondaryText: "mensuales",
    },
    items: [
      {
        featureId: "standard_messages",
        primaryText: "1,000 Mensajes Estándar",
      },
      {
        featureId: "premium_messages",
        primaryText: "100 Mensajes Premium",
      },
    ],
  },
  {
    id: "pro",
    description: "Para usuarios que necesitan mayores limites de uso",
    price: {
      primaryText: "$27 USD",
      secondaryText: "mensuales",
    },
    items: [
      {
        featureId: "standard_messages",
        primaryText: "2,700 Mensajes Estándar",
      },
      {
        featureId: "premium_messages",
        primaryText: "270 Mensajes Premium",
      },
    ],
  },
];

