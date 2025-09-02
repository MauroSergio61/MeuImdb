// Validação básica do formulário
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const input = this.querySelector('input[name="title"]');
            
            if (input.value.trim() === '') {
                e.preventDefault();
                alert('Por favor, digite o nome de um filme!');
                input.focus();
            }
        });
    }
    
    // Efeitos simples de hover
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});