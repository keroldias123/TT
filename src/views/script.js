function carregarEstudantes() {
    $.ajax({
        url: '/api/estudantes',
        method: 'GET',
        success: function(estudantes) {
            $('#tabelaEstudantes tbody').empty();
            estudantes.forEach(function(estudante) {
                $('#tabelaEstudantes tbody').append(`
                    <tr>
                        <td>${estudante.id}</td>
                        <td>${estudante.nome}</td>
                        <td>${estudante.turma.nome}</td>
                        <td>
                            <button type='button' class='btn btn-info btn-editar' onclick='editarEstudante(${estudante.id})'>Editar</button>                                  
                            <button class="btn btn-primary btn-excluir-estudante" data-id="${estudante.id}">Excluir</button>
                        </td>
                    </tr>
                `);
            });
            
            // Adiciona o evento de clique para o botão de excluir estudante
            $('.btn-excluir-estudante').click(function() {
                const estudanteId = $(this).data('id');
                const confirmation = confirm(`Tem certeza que deseja excluir o estudante com o ID ${estudanteId}?`);
                if (confirmation) {
                    excluirEstudante(estudanteId);
                }
            });
        },
        error: function(err) {
            console.error('Erro ao carregar estudantes:', err);
        }
    });
}

// Função para excluir um estudante
function excluirEstudante(estudanteId) {
    $.ajax({
        url: `/api/eliminar/${estudanteId}`, // Ajuste conforme a sua rota de eliminação de estudante
        method: 'DELETE',
        success: function(response) {
            console.log('Estudante excluído com sucesso:', response);
            carregarEstudantes(); // Recarrega a lista de estudantes após a exclusão
        },
        error: function(err) {
            console.error('Erro ao excluir estudante:', err);
        }
    });
}

// Carregar todos os estudantes ao carregar a página
$(document).ready(function() {
    carregarEstudantes();
});

  