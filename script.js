// Aguarda o conteúdo da página carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. LÓGICA PARA O SCROLL SUAVE DO MENU ---
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão do link (salto brusco)
            e.preventDefault(); 
            
            // Pega o ID da seção alvo (ex: '#produtos')
            const targetId = this.getAttribute('href'); 
            const targetSection = document.querySelector(targetId);

            // Rola a página suavemente até a seção
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // --- 2. LÓGICA PARA O SLIDER DE PRODUTOS ---
    const slider = document.querySelector('.slider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const items = document.querySelectorAll('.slider-item');

    let currentIndex = 0;
    // Pega a largura de um item do slider (incluindo margem)
    const itemWidth = items[0].offsetWidth + 20; // 20px é o margin-right do CSS

    // Função para atualizar a posição do slider
    function updateSliderPosition() {
        // Move o container do slider para a esquerda baseado no índice atual
        slider.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
    
    // Evento para o botão "Próximo"
    nextBtn.addEventListener('click', () => {
        // Avança o índice, mas não deixa passar do penúltimo item visível
        if (currentIndex < items.length - 3) { // Mostra 3 itens por vez
            currentIndex++;
            updateSliderPosition();
        }
    });

    // Evento para o botão "Anterior"
    prevBtn.addEventListener('click', () => {
        // Volta o índice, mas não deixa ser menor que zero
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });

    // --- 3. LÓGICA PARA O FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('form-contato');
    
    contactForm.addEventListener('submit', function(e) {
        // Previne o recarregamento da página ao enviar o formulário
        e.preventDefault();

        // Em um projeto real, aqui você pegaria os dados e enviaria para um servidor
        const formData = new FormData(this);
        const name = formData.get('nome');
        
        console.log('Dados do formulário:', {
            nome: name,
            email: formData.get('email'),
            mensagem: formData.get('mensagem')
        });

        // Mostra uma mensagem de sucesso para o usuário
        alert(`Obrigado pelo contato, ${name}! Sua mensagem foi enviada.`);

        // Limpa os campos do formulário
        this.reset();
    });

});