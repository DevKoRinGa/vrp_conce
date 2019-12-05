function CloseShop() {
    $("#carshop").hide();
    $(".container-item").html('');
    $.post('http://vrp_conce/fechar', JSON.stringify({}));
}

$(document).ready(function() {
    document.addEventListener("click", function(event) {
        if (event.target.closest(".info") || event.target.closest(".btn")) {
            document.querySelector(".off-aside").classList.toggle("modifier");
        } else if (!event.target.closest(".off-aside")) {
            document.querySelector(".off-aside").classList.remove("modifier");
        }
    }, false);

    $("#fechar").click(function() {
        $("#carshop").hide();
        $(".container-item").html('');
        $.post('http://vrp_conce/fechar', JSON.stringify({}));
    });

    $(".container-item").on('click', '#comprar', function() {
        $("#carshop").hide();
        $(".container-item").html('');
        $.post('http://vrp_conce/comprar', JSON.stringify({ id: $(this).data('id') }));
    });

    $("#close").click(function() {
        CloseShop()
    });

    window.addEventListener('message', function(event) {
        let data = event.data;

        function addComma(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }

        function verificarQtd(num) {
            if (num == 0) {
                return "Sem estoque!"
            } else {
                return num
            }
        }

        if (data.show) {
            let veiculos_data = data.veiculos
            let table = []
            $('#identidade').html(event.data.identidade);
            $("#carshop").show();
            for (let i = 0; i < 50; i++) {
                table.push(veiculos_data[i])
            }
            for (let item in veiculos_data) {
                $(".container-item").append(`
                  <div class="car-card alt">
                  <div class="meta">
                    <div class="photo" style="background-image: url('` + veiculos_data[item].img + `')"></div>
                    <ul class="details">
                      <li>Quantidade: ` + veiculos_data[item].quantidade + `</li>
                      <li class="tags">
                        <ul>
                          <li><a>` + addComma(veiculos_data[item].valor) + `</a></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div class="description">
                    <h1>` + veiculos_data[item].nome + `</h1>
                    <h2>Carro sendo vendido pela equipe NoLife</h2>
                    <p>` + veiculos_data[item].descricao + `</p>
                    <p class="read-more">
                      <a id="comprar" data-id="` + item + `" onclick="animation()">Comprar</a>
                    </p>
                  </div>
                </div>  
            `);
            }
        }
    })
});