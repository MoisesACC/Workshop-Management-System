# ⚙️ Factoría La Caravana - Backend API

### API REST Empresarial para la Gestión de Servicios Automotrices

Núcleo del sistema de gestión de taller, diseñado bajo una arquitectura robusta y segura utilizando el ecosistema de Spring. Se encarga de la orquestación de datos, reglas de negocio y seguridad perimetral.

## 🛠️ Stack Tecnológico

*   **Lenguaje:** Java 17
*   **Framework:** [Spring Boot 3.4.1](https://spring.io/projects/spring-boot)
*   **Persistencia:** Spring Data JPA + Hibernate
*   **Base de Datos:** MySQL
*   **Seguridad:** Spring Security (Gestión de Roles y Permisos)
*   **Documentación:** Swagger UI / OpenAPI 3
*   **Productividad:** Project Lombok

## 📊 Módulos del Sistema

*   **Gestión de Inventario:** Control de stock de repuestos y suministros críticos.
*   **Órdenes de Trabajo:** Ciclo de vida completo desde recepción hasta entrega final.
*   **Admin de Clientes:** CRM especializado para dueños de vehículos de alta gama.
*   **Finanzas:** Registro de ingresos, gastos y facturación detallada.
*   **Control de Usuarios:** Gestión de perfiles y accesos administrativos.

## 🔌 API Documentation

Una vez que la aplicación esté corriendo, puedes acceder a la documentación interactiva en:
`http://localhost:8080/swagger-ui.html`

## 🚦 Configuración Inicial

1. Asegúrate de tener instalado Java 17 y Maven.
2. Configurar las credenciales de base de datos en `src/main/resources/application.properties`.
3. Compilar el proyecto: `mvn clean install`
4. Ejecutar la aplicación: `mvn spring-boot:run`

---

Construido para soportar la excelencia operativa y la integridad de datos.
