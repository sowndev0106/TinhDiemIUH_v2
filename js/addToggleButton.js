const addToggleButton = () => {
    const captionElement = document.querySelector('.caption');
    const portletTitle = document.querySelector('.portlet-title');

    portletTitle.style.display = 'flex';
    portletTitle.style.gap = '20px';
    portletTitle.style.alignItems = 'center';


    const button = document.createElement('lable');
    button.classList.add('switch');

    button.innerHTML = `
            <input type="checkbox" checked>
            <span class="slider round"></span>
        `;

    portletTitle.appendChild(button);
}
// extension://ifebjjbnfedckjigcdahpedajmdiikig/logos/logo.png