const DB = {
    categorias: [
        { id: 'rest', nombre: 'Restaurantes', icono: '🍽️' },
        { id: 'poll', nombre: 'Pollerías', icono: '🍗' },
        { id: 'cafe', nombre: 'Cafeterías', icono: '☕' }
    ],
    tiendas: [
        // RESTAURANTES
        { id: 1, cat: 'rest', nombre: "El Mesón Espinar", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400", menu: [{n: "Trucha Frita", p: 18, i: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=100"}, {n: "Lomo Saltado", p: 22, i: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100"}] },
        { id: 2, cat: 'rest', nombre: "Gourmet Altura", img: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400", menu: [{n: "Arroz con Pato", p: 25, i: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=100"}] },
        { id: 3, cat: 'rest', nombre: "Sabor Andino", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400", menu: [{n: "Bisteck Pobre", p: 24, i: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=100"}] },
        // POLLERÍAS
        { id: 4, cat: 'poll', nombre: "El Tablón Black", img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400", menu: [{n: "1/4 Pollo", p: 18, i: "https://images.unsplash.com/photo-1594221708779-9482114420e9?w=100"}, {n: "Mostrito", p: 22, i: "https://images.unsplash.com/photo-1626082866714-28b14e7b6f4c?w=100"}] },
        { id: 5, cat: 'poll', nombre: "Pollo Portales", img: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=400", menu: [{n: "Pollo Entero", p: 60, i: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=100"}] },
        { id: 6, cat: 'poll', nombre: "Kikiriki Vip", img: "https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?w=400", menu: [{n: "Aguadito", p: 10, i: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=100"}] },
        // CAFETERÍAS
        { id: 7, cat: 'cafe', nombre: "Plaza Real Café", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400", menu: [{n: "Capuccino", p: 9, i: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=100"}] },
        { id: 8, cat: 'cafe', nombre: "Espinar Beans", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400", menu: [{n: "Espresso", p: 7, i: "https://images.unsplash.com/photo-1510707577719-5d6878021d47?w=100"}] },
        { id: 9, cat: 'cafe', nombre: "Aroma Altura", img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400", menu: [{n: "Tarta Queso", p: 12, i: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=100"}] }
    ]
};

let carrito = [];
let user = JSON.parse(localStorage.getItem('qhapac_user')) || null;

window.onload = () => {
    renderCategorias();
    filtrar('rest', 'Restaurantes');
    actualizarBotonUser();
    setupValidacion();
};

function setupValidacion() {
    const n = document.getElementById('reg-nombre');
    const z = document.getElementById('reg-zona');
    // Bloqueo de caracteres especiales
    n.oninput = function() { this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); };
    z.oninput = function() { this.value = this.value.replace(/[^a-zA-Z0-9\s]/g, ''); };
}

function abrirAcceso() { 
    toggleModal('modal-auth', true); 
    switchAuth('log'); 
}

function registrarUsuario() {
    const n = document.getElementById('reg-nombre');
    const e = document.getElementById('reg-email');
    const z = document.getElementById('reg-zona');
    if(n.value && e.value && z.value) {
        user = { nombre: n.value, email: e.value, zona: z.value };
        localStorage.setItem('qhapac_user', JSON.stringify(user));
        // Limpieza de campos post-registro
        n.value = ""; e.value = ""; z.value = "";
        alert("¡Registro Exitoso!");
        toggleModal('modal-auth', false);
        actualizarBotonUser();
    } else { alert("Completa todos los campos"); }
}

function iniciarSesion() {
    const email = document.getElementById('log-email').value;
    const saved = JSON.parse(localStorage.getItem('qhapac_user'));
    if(saved && saved.email === email) {
        user = saved;
        document.getElementById('log-email').value = ""; // Limpiar campo
        toggleModal('modal-auth', false);
        actualizarBotonUser();
    } else { alert("Usuario no encontrado."); }
}

function actualizarBotonUser() {
    if(user) document.getElementById('btn-user').innerText = user.nombre.split(' ')[0];
}

function filtrar(id, nombre) {
    document.getElementById('current-category').innerText = nombre;
    document.getElementById('shop-grid').innerHTML = DB.tiendas.filter(t => t.cat === id).map(t => `
        <div class="card" onclick="verMenu(${t.id})">
            <img src="${t.img}" class="card-img">
            <div class="card-info"><h3>${t.nombre}</h3><p>Premium • Espinar</p></div>
        </div>
    `).join('');
}

function verMenu(id) {
    const t = DB.tiendas.find(x => x.id === id);
    document.getElementById('modal-body').innerHTML = `<h2 class="gold-text">${t.nombre}</h2>` + 
        t.menu.map(m => `
            <div class="menu-row">
                <div style="display:flex; align-items:center">
                    <img src="${m.i}" class="plate-thumb">
                    <span>${m.n} - S/ ${m.p}</span>
                </div>
                <button class="btn-login" onclick="agregar('${m.n}', ${m.p})">+</button>
            </div>
        `).join('');
    toggleModal('modal-menu', true);
}

function agregar(n, p) {
    carrito.push({ nombre: n, precio: p });
    document.getElementById('cart-count').innerText = carrito.length;
    actualizarUI();
}

function actualizarUI() {
    let t = 0;
    document.getElementById('cart-items').innerHTML = carrito.map(i => {
        t += i.precio;
        return `<div class="menu-row"><span>${i.nombre}</span><span>S/ ${i.precio}</span></div>`;
    }).join('');
    document.getElementById('cart-total').innerText = `S/ ${t.toFixed(2)}`;
}

function enviarWhatsApp() {
    if(!user) return abrirAcceso();
    if(carrito.length === 0) return alert("Carrito vacío");
    const num = "51900000000"; // Tu número aquí
    const pedido = carrito.map(i => `- ${i.nombre}`).join('%0A');
    const msj = `*NUEVO PEDIDO QHAPAC*%0A*Cliente:* ${user.nombre}%0A*Referencia:* ${user.zona}%0A*Pedido:*%0A${pedido}%0A*Total:* ${document.getElementById('cart-total').innerText}`;
    window.open(`https://wa.me/${num}?text=${msj}`, '_blank');
}

function renderCategorias() {
    document.getElementById('category-list').innerHTML = DB.categorias.map(c => `
        <div class="category-item" onclick="filtrar('${c.id}', '${c.nombre}')">
            <div class="category-circle">${c.icono}</div>
            <span style="font-size:12px">${c.nombre}</span>
        </div>
    `).join('');
}

function toggleModal(id, s) { document.getElementById(id).style.display = s ? 'block' : 'none'; }
function switchAuth(v) { 
    document.getElementById('view-login').style.display = v==='log'?'block':'none'; 
    document.getElementById('view-register').style.display = v==='reg'?'block':'none'; 
}