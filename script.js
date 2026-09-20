/* R1 coleta informações */
const nameclient = document.getElementById('clientName')
const datebirth = document.getElementById('birthDate')
const cpf = document.getElementById('clientCPF')
const loan = document.getElementById('loanAmount')
const fees = document.getElementById('interestRate')
const installments = document.getElementById('installments')
let tentativa = 0

// verifica se o usuário atingiu o limite de tentativas
function tentativas() {
    if (tentativa >= 3) {
        alert('Você atingiu o limite de tentativas, tente novamente mais tarde')
        nameclient.disabled = true
        datebirth.disabled = true
        cpf.disabled = true
        loan.disabled = true
        fees.disabled = true
        installments.disabled = true
    }
}
// R2 validação do nome
function validatename() {
    if (nameclient.value.length < 5) {
        alert('Nome inválido, digite novamente')
        tentativa++
        tentativas()
    }
}
// R3 validação do CPF
function validatecpf() {
    if (cpf.value.length != 11) {
        alert('CPF inválido, digite novamente')
        tentativa++
        tentativas()
    }
}
// R4 validação da data de nascimento
function validatebirth() {
    const birth = new Date(datebirth.value)
    const today = new Date()
    const diference = today - birth
    const age = diference / 1000 / 60 / 60 / 24 / 365
    const formattedAge = age.toFixed(1)
    document.getElementById('age').innerHTML = `Idade: ${formattedAge} anos`
}
// R5 validação do valor do empréstimo
function validateloan() {
    if (loan.value <= 0) {
        alert('Valor do empréstimo inválido, digite novamente')
        tentativa++
        tentativas()
    }
}
// R6 validação da taxa de juros
function validatefees() {
    if (fees.value <= 0) {
        alert('Taxa de juros inválida, digite novamente')
        tentativa++
        tentativas()
    }
}
// validação do número de parcelas
function validateinstallments() {
    if (installments.value <= 0) {
        alert('Número de parcelas inválido, digite novamente')
        tentativa++
        tentativas()
    }
}
// R7 cálculo do empréstimo
function calculateLoan() {
    const valorEmprestimo = parseFloat(loan.value)
    const taxaJuros = parseFloat(fees.value) / 100
    const qtdParcelas = parseInt(installments.value)

    const valorJuros = valorEmprestimo * taxaJuros
    const montanteTotal = valorEmprestimo + valorJuros

    const valorParcela = montanteTotal / qtdParcelas

    let resultadoHTML = `<h3>Montante Total: R$ ${montanteTotal.toFixed(2)}</h3><ul>`

    for (let i = 1; i <= qtdParcelas; i++) {

        let dataVencimento = new Date()

        dataVencimento.setDate(dataVencimento.getDate() + (30 * i))

        const dataFormatada = dataVencimento.toLocaleDateString('pt-BR')

        resultadoHTML += `<li>Parcela ${i}: R$ ${valorParcela.toFixed(2)} - Vencimento: ${dataFormatada}</li>`
    }
    resultadoHTML += '</ul>'


    document.getElementById('resultado').innerHTML = resultadoHTML
}
function resetForm() {
    document.getElementById('loanForm').reset()
    document.getElementById('resultado').innerHTML = ''
}