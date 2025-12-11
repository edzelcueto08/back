const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'Documentation for the API (User, Roles, Product, Order, Auth) con arquitectura limpia',
  },
  servers: [
    {
      // Base URL de la API (ya incluye /api/v1)
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      // ========================
      // USER
      // ========================
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4caa'
          },
          name: {
            type: 'string',
            example: 'Edzel Escobar'
          },
          email: {
            type: 'string',
            example: 'edzel@example.com'
          },
          roles: {
            type: 'array',
            description: 'Lista de nombres de roles asignados al usuario',
            items: {
              type: 'string',
              example: 'admin'
            }
          }
        }
      },
      UserInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'Edzel Escobar'
          },
          email: {
            type: 'string',
            example: 'edzel@example.com'
          },
          password: {
            type: 'string',
            example: 'MiClaveSegura123'
          },
          roles: {
            type: 'array',
            description: 'Nombres de roles a asignar (opcional, si no se envía se usará rol por defecto)',
            items: {
              type: 'string',
              example: 'user'
            }
          }
        }
      },

      // ========================
      // ROLE
      // ========================
      Role: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4cab'
          },
          name: {
            type: 'string',
            example: 'admin'
          }
        }
      },
      RoleInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: {
            type: 'string',
            example: 'user'
          }
        }
      },

      // ========================
      // PRODUCT
      // ========================
      Product: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4cac'
          },
          name: {
            type: 'string',
            example: 'Laptop Gamer'
          },
          description: {
            type: 'string',
            example: 'Laptop 16GB RAM, SSD 512GB'
          },
          price: {
            type: 'number',
            example: 4999.99
          },
          stock: {
            type: 'integer',
            example: 10
          },
          category: {
            type: 'string',
            example: 'electronics'
          },
          imageUrl: {
            type: 'string',
            example: 'https://example.com/laptop.jpg'
          }
        }
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'description', 'price', 'stock', 'category'],
        properties: {
          name: {
            type: 'string',
            example: 'Laptop Gamer'
          },
          description: {
            type: 'string',
            example: 'Laptop 16GB RAM, SSD 512GB'
          },
          price: {
            type: 'number',
            example: 4999.99
          },
          stock: {
            type: 'integer',
            example: 10
          },
          category: {
            type: 'string',
            example: 'electronics'
          },
          imageUrl: {
            type: 'string',
            example: 'https://example.com/laptop.jpg'
          }
        }
      },

      // ========================
      // ORDER
      // ========================
      Order: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '60c72b2f9b1e8a001f8e4cad'
          },
          product: {
            type: 'string',
            example: 'Laptop Gamer'
          },
          description: {
            type: 'string',
            example: 'Compra de laptop con 16GB RAM y SSD 512GB'
          },
          quantity: {
            type: 'integer',
            example: 2
          },
          price: {
            type: 'number',
            example: 5000
          },
          discount: {
            type: 'number',
            example: 300
          },
          total: {
            type: 'number',
            example: 9700,
            description: 'Total calculado (quantity * price - discount)'
          },
          status: {
            type: 'string',
            enum: ['PENDIENTE', 'PAGADO', 'CANCELADO'],
            example: 'PENDIENTE',
            description: 'Estado de la orden'
          }
        }
      },
      OrderInput: {
        type: 'object',
        required: ['product', 'description', 'quantity', 'price'],
        properties: {
          product: {
            type: 'string',
            example: 'Laptop Gamer'
          },
          description: {
            type: 'string',
            example: 'Compra de laptop con 16GB RAM y SSD 512GB'
          },
          quantity: {
            type: 'integer',
            example: 2
          },
          price: {
            type: 'number',
            example: 5000
          },
          discount: {
            type: 'number',
            example: 300,
            description: 'Descuento aplicado (opcional, puede ser 0)'
          },
          status: {
            type: 'string',
            enum: ['PENDIENTE', 'PAGADO', 'CANCELADO'],
            example: 'PENDIENTE',
            description: 'Estado inicial de la orden'
          }
        }
      },

      // ========================
      // AUTH
      // ========================
      AuthLoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            example: 'edzel@example.com'
          },
          password: {
            type: 'string',
            example: 'MiClaveSegura123'
          }
        }
      },
      AuthLoginResponse: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'JWT de autenticación'
          },
          user: {
            $ref: '#/components/schemas/User'
          }
        }
      },
    },
  },
  // seguridad global: por defecto requiere JWT (puedes ignorarlo en endpoints públicos si quieres)
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  // Paths a los archivos de rutas que contienen comentarios @swagger
  apis: ['./src/presentation/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
