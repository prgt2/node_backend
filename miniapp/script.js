function script(){
    $('#wybierz_kooperanta').on('click', function() {
        if ($(this).attr('class') !== 'clicked') {
            console.log($(this).attr('class'))
            $.get('/api/kooperanci', (data) => {
                //console.log(data)
                $(data).each(function() {
                    $('#wybierz_kooperanta').append(`<option value="${this.id}" class="lista_kooperantow" id="${this.id}">${this.name}</option>`)
                    //console.log(this)
                })
            })
            $(this).toggleClass('clicked')
        } else {
            console.log('halo bylo klikniete', $(this).attr())
        }    
    })
    let wiersz_tabeli = `<tr class="products_row">
    <td class="lp">${this.id}</td>
    <td class="product_name">${this.nazwa}</td>
    <td class="price">${this.cena}</td>
    <td class="unit">${this.jednostka}</td>
    <td class="waluta">${this.waluta}</td>
    <td class="ilosc"><input type="text"></td>
    <td class="kwota"></td>
    </tr>`
    /* $.get('/api/produkta', function(data) {
        $(data).each(function() {
            $('#table_header').append('wiersz_tabeli')
        })
    }) */
    let lista_kooperantów = $('.lista_kooperantow')
    let go_to_clients_site = function() {
        if ($(this).attr('class') !== 'clicked') {
            $.get('/api/produkta', function(data) {
                $(data).each(function() {
                    $('#table_header').append('wiersz_tabeli')
                })
            })
            //$.get(`/api/kooperanci/:${$(this).attr('id')}`, function(data) {
            //})
            console.log($(this).attr('id'))
        }
        $(this).toggleClass('clicked')
    } 
    $(lista_kooperantów).each(function() {
        $(this).on('click', go_to_clients_site())
    })

}