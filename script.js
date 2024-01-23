// Executar função anonima quando o código carregar
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    function calcTempo(mili) {
        const min = Math.floor(mili / 60000);
        const sec = Math.floor((mili % 60000) / 1000);
        return `${min}m e ${sec}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">Remover</button>
                </td>
            `;
            (_a = row.querySelector('.delete')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
                remover(this.dataset.placa);
            });
            (_b = $('#patio')) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar([...ler(), veiculo]);
            // Limpa os campos
            $('#nome').value = '';
            $('#placa').value = '';
        }
        function remover(placa) {
            const { entrada, nome } = ler().find(veiculo => veiculo.placa === placa);
            const tempo = calcTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veiculo ${nome} permaneceu por ${tempo} no estacionamento. Deseja encerrar?`))
                return;
            salvar(ler().filter(veiculo => veiculo.placa !== placa));
            render();
        }
        function salvar(veiculos) {
            localStorage.setItem('patio', JSON.stringify(veiculos));
        }
        function render() {
            $('#patio').innerHTML = '';
            const veiculos = ler();
            veiculos.forEach(veiculo => adicionar(veiculo));
        }
        return {
            ler,
            adicionar,
            remover,
            salvar,
            render
        };
    }
    patio().render();
    (_a = $('#cadastrar')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        var _a, _b;
        const nome = (_a = $('#nome')) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $('#placa')) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) {
            alert('Preencha todos os campos');
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date() }, true);
    });
})();
