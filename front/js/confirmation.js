
function confirmation(){
const id = new URL(window.location.href).searchParams.get("id");
const orderId = document.getElementById("orderId");
orderId.innerHTML = id;
// Clear the localStorage after the confirmation //
localStorage.clear();
}
confirmation();