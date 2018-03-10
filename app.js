let express = require('express');
let mongoose = require('mongoose');

let app = express();
let db = mongoose.connection;

//mongoose.connect('mongodb://localhost:27017/');
mongoose.connect("mongodb://@ds231658.mlab.com:31658/nodeapplication")
let port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.static('bower_components'));
app.use(express.urlencoded(true));
app.set('view engine', 'ejs');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    nome: String,
    email: String,
    idade: Number
})
let User = mongoose.model('user', userSchema);

app.get('/', (req, res) => {

    User.find(function(err, data){
        if(data == undefined){
            res.render('index',{titulo: 'Estudo nodejs', usuario_nome : {}});    
        }
        usuario = data;
        res.render('index',{titulo: 'Estudo nodejs', usuario_nome : usuario});
    })
});

app.post('/', (req, res) =>{
    usuario = new User({
        nome : req.body.nome,
        email: req.body.email,
        idade: req.body.idade  
    })
    User.create(usuario, function(err, res){
        if(err) console.log(err);
        console.log("Dados Salvos!");
    });
    res.redirect('/');    
})

app.put('/:id', (req, res) => {
    let id_usuario = req.params.id;
    User.findByIdAndUpdate(id_usuario, req.body, function (err, resp) {
        if(err)console.log(err);
        console.log(resp);        
        res.send(req.body);
    })    
});

app.delete('/:id', (req, res, next) => {
    let id_usuario = req.params.id;
     User.findByIdAndRemove(id_usuario, function(err, resp){
        if(err) console.error(err);
        res.end(res.nome);
    })
})


db.on('error', console.error.bind(console,'Erro na conexão:'));

db.once('open', function () {
    console.log("Conexão com o banco de dados estabelecida!");
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
});