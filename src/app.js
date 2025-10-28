var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');
var specs = require('../swagger/swagger.js');
var connectDB = require('./core/database/mongoProvider.js');
require('dotenv').config();

// console.log('Contenido de SPECS:', JSON.stringify(specs, null, 2));

var indexRouter = require('../routes/index');
var UsersRouter = require('./user/routes/UserRoutes.js');
var EnviromentRoutes = require('./enviroment/routes/EnviromentRoutes.js');
var VariableRoutes = require('./variable/routes/VariableRoutes.js');
var VariableJsonRoute = require('./variable/routes/VariablesJsonRoute.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const swaggerUiOptions = {
    swaggerOptions: {
      // url: "/api-docs.json",
      persistAuthorization: true,
      authAction: {
        bearerAuth: {
          name: "Authorization",
          schema: { type: "apiKey", in: "header", name: "Authorization", description: "Ingrese 'Bearer ' seguido de su token" },
          value: "Bearer ",
        },
      },
    },
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.17.14/swagger-ui-standalone-preset.js'
    ],
};

app.use('/api', swaggerUi.serve, swaggerUi.setup(specs, swaggerUiOptions));

app.use('/', indexRouter);
app.use('/users', UsersRouter);
app.use('/enviroments', EnviromentRoutes);
app.use('/enviroments/:env_name/variables', VariableRoutes);
app.use('/enviroments/:env_name', VariableJsonRoute);

connectDB();

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;
