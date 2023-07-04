document.addEventListener('DOMContentLoaded', function()
{
    document.getElementsById("form-perguntas").addEventListener('submit', function(evento)
    {
        let primeiroNumero = document.getElementById('primeiro-numero').value
        let segundoNumero = document.getElementById('segundo-numero').value

        document.getElementsByClassName('resultado-valor').innerText = primeiroNumero + segundoNumero
        document.querySelector('.resultado').style.display = 'block'
    })
})