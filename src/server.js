import express from 'express';
import exphbs from 'express-handlebars';

import { initRoute } from './routes/web-app';

const app = express();

initRoute(app);

// Static folder
app.use(express.static('src/public'));

// View engine
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', 'src/views')

app.listen(2703, () => {
    console.log('listening on port 2703');
})