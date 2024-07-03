/* Cheio de variáveis globais e efeitos colaterais */
const checkoutButton = document.querySelector(".bottomBar_checkout");
const dialog = document.querySelector("dialog");
const itemRows = dialog.querySelectorAll(".checkout_item");
const totalRow = dialog.querySelector(".checkout_total");
let selectedCards;

/*
Por algum motivo que não entendo, reiniciar a página após selecionar 3 itens
retira a seleção deles, mas ainda mantém o botão ativo. Atualizar o botão ao
carregar o script resolve isso.
*/
updateCheckoutButton();

function selectCard(card) {
    const parent = card.parentElement;
    const previousSelection = parent.querySelector(".-selected");

    previousSelection?.classList.remove("-selected");
    card.classList.toggle("-selected");
    updateCheckoutButton();
}

function updateCheckoutButton() {
    selectedCards = document.querySelectorAll(".-selected");

    if (selectedCards.length === 3) {
        checkoutButton.disabled = false;
        checkoutButton.textContent = "Fechar pedido";
    } else {
        checkoutButton.disabled = true;
        checkoutButton.textContent = "Selecione os 3 itens para fechar o pedido";
    }
}

function launchWhatsApp() {
    const itemNameElements = dialog.querySelectorAll(".checkout_item > .checkout_name");
    const totalPriceElement = dialog.querySelectorAll(".checkout_total > .checkout_price");
    const message = [
        `Olá, gostaria de fazer o pedido:`,
        `- Prato: ${itemNameElements.item(0).textContent}`,
        `- Bebida: ${itemNameElements.item(1).textContent}`,
        `- Sobremesa: ${itemNameElements.item(2).textContent}`,
        `Total: ${totalPriceElement.textContent}`
    ].join("\n");

    window.open(`https://wa.me/82921720608?text=${encodeURIComponent(message)}`);
}

function openCheckout() {
    let totalPrice = 0;

    for (let i = 0; i < 3; i++) {
        const row = itemRows.item(i);
        const card = selectedCards.item(i);
        const name = card.querySelector(".card_name").textContent;
        const price = card.querySelector(".card_price").textContent;
        
        row.querySelector(".checkout_name").textContent = name;
        row.querySelector(".checkout_price").textContent = price;
        totalPrice += Number(price.match(/\d+,\d+/)[0].replace(",", "."));
    }

    totalRow.querySelector(".checkout_price").textContent = "R$ " + totalPrice
        .toFixed(2)
        .replace(".", ",");

    dialog.showModal();
    dialog.style.display = "flex";
}

function closeCheckout() {
    dialog.close();
    dialog.style.display = "none";
}