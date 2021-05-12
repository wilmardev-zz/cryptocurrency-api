# Cryptocurrency Api

Esta es una API construida en Node Js 14.x con Express Fwk e implementa una base de datos con MongoDB. En donde toda la información respecto a las criptomonedas es proporcionada por el API REST de Coingenko (https://www.coingecko.com/api).

Así mismo, toda la configuración para el arranque de la aplicación está implementada con docker (docker-compose).

<br>

# Descripción de la Arquitectura implementada

Esta API está construida bajo una arquitectura limpia (Clean Architecture), donde a su vez permite su desacoplamiento, aumenta su cobertura en prueba y la hace mantenible mentiante el tiempo.
La organización de carpetas o "capas" se encuentra de la siguiente manera:

#### **- Configurations**: Contiene las clases las siguientes subcarpetas:

- **database**: Contiene la configuración necesaria para conectarse a la base de datos (Mongo DB).
- **environments**: Contiene los archivos de configuración para su respecto ambiente (siempre se recomienda que no estén versionados)
- **middleware**: Contiene los middleware necesarios implementado a nivel de controladores, su mayoría de casos para la validación de datos. Adicional se encuentra un middleware como manejador de excepciones a nivel de aplicación para la centralización de logs, registros en base de datos, o cualquier herramienta para control de erroes.
- **routes**: Contiene el enrutamiendo API REST para los diferentes puntos de acceso que tiene la aplicación, aquí mismo se configuran los middleware que serán utilizados bien sea de manera global como específica para ciertas rutas.
- **server.js**: Contiene la configuración a nivel del servidor de Express para el correcto funcionamiento del api, aquí se configuran diferentes características como: cors, se enlaza todo el enrutamiento de la aplicación, se inicia el proceso de conexión a base de datos, implementación de middlewares globales y levantamiento o puesta en escucha del servidor en determinado puerto, etc.

#### **- Entities**: Contiene las clases necesarias para el funcionamiento del negocio y la definición de los modelos que se almacenarán en base de datos, esto mediante el paquete `mongoose`

#### **- Adapters**: Son los agentes externos a la solución, en este caso, el consumo del REST API Coingenko: (https://www.coingecko.com/api).

- Permite su desacoplamiento del tal modo que si a futuro se require cambiar la fuente de datos, solo se modificarán las implementaciones en los adaptadores y la lógica de negocio deberá seguir compacta.

#### **- Repositories**: Son los encargados del acceso hacia la capa de datos, en este caso, hacia MongoDb: así mismo, como la capa de los adaptadores, permite su desacoplamiento permitiendo que el almacenamiento de datos pueda modificarse sin implicar cambios en el negocio.

#### **- Services**: Aquí se implementa toda la lógica de negocio requerida, adicional es donde las pruebas se centrarán sin depender de las fuentes de datos haciendo el uso de respectivos mocks.

#### **- Controllers**: Se encuentran los puntos de acceso encargados de recibir, delegar funciones y retornar una respectiva respuesta al cliente.

#### **- Test**: Se encuentran las pruebas realizadas para la aplicación

- **UnitTest**: Pruebas unitarias enfocados en la lógica de negocio (servicios).
- **IntegrationTest**: Pruebas de integración enfocadas en el correcto flujo de información y respuestas entre las diferentes capacas de la aplicación (controladores).

<br>

# Instrucciones de ejecución

#### **Requisito:** Tener instalado docker y node js en la máquina.

#### **1.** Clonar el repositorio.

#### **2.** Situarse en la carpeta raíz y ejecutar `npm install` para la instalación de dependencias.

#### **3.** Situarse en la carpeta raíz y ejecutar el comando `docker-compose build`

#### **4.** Iniciar la aplicación con el comando `docker-compose up`

#### **5.** Abrir en el navegador `http://localhost:{DefaultPort}/api/v1/doc`. **DefaultPort: 5005**

#### **6.** Aplicación lista para su uso! En la pantalla de documentación se puede interactuar directamente con el API.

#### **7.** Para terminar su ejecución, ejecutar el comando `docker-compose down`

<br>

#### **NOTAS:**

#### **1.** Se recomienda primero usar el recurso `/user/create` con la información por defecto que se encuentra en el swagger, posteriormente también por default en la documentación del recurso `/user/login` están las credenciales para una solicitud correcta y seguir usando los demás recursos con el token generado.

#### **2.** También se puede depurar la aplicación sin necesidad de docker. comando a ejecutar: `node app.js`

<br>

# Instrucciones para ejecución de pruebas

#### **Requisito:** Tener instalado docker y node js en la máquina.

#### **1.** Ejecutar la aplicación con las instrucciones dadas anteriormente.

#### **2.** Situarse en la carpeta raíz y ejecutar `npm run test` para la ejecución de todas las pruebas.

#### **3.** Situarse en la carpeta raíz y ejecutar `npm run test:ut` para la ejecución solamente de las pruebas unitarias.

#### **4.** Situarse en la carpeta raíz y ejecutar `npm run test:it` para la ejecución solamente de las pruebas de integración

#### **5.** Situarse en la carpeta raíz y ejecutar `npm run test:cov` para la ejecución de todas las pruebas y visualizar la información de cobertura.

<br>

#### **NOTA:** Para las pruebas se utilizó `mocha` como marco de pruebas, `chai` como librería de aserciones, `sinon` como librería para la creación de mocks y `nyc` para la generación del reporte de cobertura.

<br>

# Autor

- #### **Wilmar Duque** - wilmarduque71@gmail.com
