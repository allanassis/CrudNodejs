function editarClick(id_usuario){
    $("#formulario_edit_" + id_usuario).toggle();
}

function saveEdit(id_usuario){
    usuario = {
        nome : $("#edit_nome_" + id_usuario).val(),
        email : $("#edit_email_" + id_usuario).val(),
        idade : $("#edit_idade_" + id_usuario).val()
    }
    $.ajax({
        url : '../' + id_usuario, //+ '&nome=' + usuario.nome + '&email=' + usuario.email + '&idade=' + usuario.idade,
        type: 'PUT',
        data: usuario,
        success: function(data){
            console.log("Retorno de sucesso da edição!!");
            console.log("Usuario: " + data.nome + "atualizado!");
            $("body").load('/');
        }
    })
}

function deleteUsuario(id_usuario){
    $.ajax({
        url : '../' + id_usuario,
        type: 'DELETE',
        success: function(){                
            $("body").load('/');
        }
    })
}

$(document).ready(function(){
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
})
