import express from 'express';
import exphbs from 'express-handlebars';

import { initRoute } from './routes/web-app/index.js';
import { initAPIs } from './routes/api/index.js';

const PORT = 2703;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

initRoute(app);
initAPIs(app);

app.use(express.static('src/public'));

// View engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', 'src/views');

app.listen(PORT, () => {
    console.log('listening on port 2703');
})

