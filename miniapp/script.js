function script(){
    $('#wybierz_kooperanta').on('click', function() {
        if ($(this).attr('class') !== 'clicked') {
            console.log($(this).attr('class'))
            $.get('/api/kooperanci', (data) => {
                $(data).each(function() {
                    $('#wybierz_kooperanta').append(`<option value="${this.id}" class="lista_kooperantow" id="${this.id}">${this.name}</option>`)
                })
            })
            $(this).toggleClass('clicked')
            setTimeout(b, 100)
        }   
    })
    
    function b() {
        let lista_kooperantow = $('#wybierz_kooperanta').children()
        $(lista_kooperantow).each(function() {
            $(this).on('click', function() {
                console.log('klikles w kooperanta')
                if ($(this).attr('class') !== 'clicked') {
                    $.get('/api/produkta', function(data) {
                        $(data).each(function() {
                            $('table').append(`<br><tr class="products_row">
                            <td class="lp">${this.id}</td>
                            <td class="product_name">${this.nazwa}</td>
                            <td class="price">${this.cena}</td>
                            <td class="unit">${this.jednostka}</td>
                            <td class="waluta">${this.waluta}</td>
                            <td class="ilosc"><input type="text"></td>
                            <td class="kwota"></td>
                            </tr>`)
                        })
                    })
                    //$.get(`/api/kooperanci/:${$(this).attr('id')}`, function(data) {
                    //})
                    console.log($(this).attr('id'))
                }
                $(this).toggleClass('clicked')
            } )
        })
    }
}