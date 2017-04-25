const Koa = require('koa');
const app = new Koa();
const port = 3000;

require('./chokidar.js');

app.use(ctx => {

    if (ctx.url != '/')
        ctx.response.redirect('/')
    ctx.body = 'Hello World';
});

app.listen(port);
console.log(`Server running on port:` + port);