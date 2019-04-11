function skrypt() {
let kooperant1 = $('#kooperant1')
    $(kooperant1).on('click', () => {
        $.get('/api/koop', (data) => {
            console.log(`aked for ${data}`)
            $('.product_name').text(data)
        })
        console.log('clicked');
        
    })
}  