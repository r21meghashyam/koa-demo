const path = require('path');
const Koa = require('koa');
const decache = require('decache');
const app = new Koa();
const port = 3000;
let devMode = true;

if (devMode) {
    var chokidar = require('chokidar')
    var watcher = chokidar.watch('./server')

    watcher.on('all', function(event, _path) {
        console.log(event, _path);
        let file = path.join(__dirname, '../', _path)

        if (event == 'change') {
            Object.keys(require.cache).forEach(function(id) {
                if (file == id) {
                    console.log(1, typeof(require.cache[id]));
                    decache(id);
                    console.log(2, typeof(require.cache[id]));
                    delete require.cache[id];
                    console.log(3, typeof(require.cache[id]));
                }
            })
        }
    })

}
app.use(ctx => {
    if (ctx.url != '/')
        ctx.response.redirect('/')

    ctx.body = 'Hello world';
});

app.listen(port);
console.log(`Server running on port:` + port);