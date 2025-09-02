const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();


//validação
if (!process.env.OMDB_API_KEY || process.env.OMDB_API_KEY === 'sua_chave_aqui') {
    console.warn('⚠️  AVISO: Chave API não configurada!');
    console.warn('   Crie um arquivo .env com OMDB_API_KEY=sua_chave_real');
    console.warn('   Obtenha uma chave em: http://www.omdbapi.com/apikey.aspx');
}


const app = express();
const PORT = process.env.PORT || 3000;

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Chave da API OMDB
const OMDB_API_KEY = process.env.OMDB_API_KEY || 'SuaApiKey';

// Rotas
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/search', async (req, res) => {
    try {
        const { title } = req.body;
        
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: OMDB_API_KEY,
                t: title,
                plot: 'full'
            }
        });

        if (response.data.Response === 'False') {
            return res.render('index', { 
                error: 'Filme não encontrado. Tente outro nome.' 
            });
        }

        res.render('movie', { movie: response.data });
    } catch (error) {
        console.error('Erro:', error);
        res.render('index', { 
            error: 'Erro ao buscar filme. Tente novamente.' 
        });
    }
});

//IMPORTANTE: Esta linha deve ser a ÚLTIMA do arquivo!
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});