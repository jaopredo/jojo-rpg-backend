module.exports = (req, res, next) => {
    const { access } = req  // Pego o acesso que ele possui
    if (access !== 'master') return res.json({
        error: true,
        msg: 'Acesso negado! Deve ser um mestre'
    })
    
    next()
}