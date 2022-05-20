require('dotenv').config()
const jwt = require('jsonwebtoken');

/*
    Este middleware irá fazer a validação se o meu usuário pode ou não acessar a rota,
    para isso ele utiliza do token passado e realiza uma validação do mesmo
*/

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;  // Pego o token

    // Se o token não for passado
    if (!authHeader) return res.status(401).send({ error: 'Nenhum token providenciado' })

    // Separo o token em duas partes (Uma deve conter Bearer)
    const parts = authHeader.split(' ')

    // Se não tiver sido separado em duas partes
    if (!parts.length === 2) return res.status(401).send({ error: 'Erro na síntaxe do token' })

    // Pego a primeira parte e o token em si
    const [ scheme, token ] = parts;

    // Se a primeira parte não começar com JOJO eu retorno um erro
    if (!/^JOJO$/i.test(scheme)) return res.status(401).send({ error: 'Token errado' })
    console.log(token)

    // Faço uma verificação pelo JWT para saber se o token é valido
    jwt.verify(token, process.env.APP_HASH, (err, decoded) => {
        if (err) res.status(401).send({ error: 'Invalid token' })
        req.access = decoded.accessKey
        req.id = decoded.id
        req.email = decoded.email
        return next();
    })
    /*
        Esse decoded é um objeto que retorna os valores que eu passei quando criei o token, no caso,
        retornou o ID, que eu passei sempre q criei o token
    */
}