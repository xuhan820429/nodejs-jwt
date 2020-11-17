Development steps:

Backend

1. setup the database
   - sqlite database
   - js-orm: sequelize setup
   - dao service CRUD on database
2. setup the express server
   - setup init server
   - setup 3rd party middleware (body-parser, cookie-parser, view engine, express.static folder)
   - setup main entry point
   - setup route
   - setup services
     - password service: hash, verify
     - jwt service: sign jwt, verify jwt, set jwt in cookie, get jwt in cookie, clear jwt in cookie
     - error handling service
3. setup middleware for authorization for server side route
   - canActive function to enable access to route
     - read jwt from req.cookies
     - verify the jwt to gen either decode or error
     - if decode then proceed, else redirect to another route
   - readUser function: store the jwt deocde or null
     - read jwt from req.cookie, and decode the jwt
     - res.locals.user = decode or res.locals.user = null
     - view enginee template can access the res.locals.user as <%=user%>

Frontend
    - use ejs view engine template
    - design html/css login/signup form
    - use javascript dom to control the submit event handling 
