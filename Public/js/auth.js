document.addEventListener("DOMContentLoaded", () => {
  const btnEntrar = document.getElementById("btnEntrar");
  const token = localStorage.getItem("token");

  if (btnEntrar) {
    if (token) {
      // ✅ Utilizador já logado
      btnEntrar.textContent = "Sair";
      btnEntrar.classList.remove("btn-primary");
      btnEntrar.classList.add("btn-danger");

      btnEntrar.addEventListener("click", () => {
        localStorage.removeItem("token"); // Apaga JWT
        alert("Terminaste sessão!");
        window.location.reload(); // Recarrega página
      });
    } else {
      // ❌ Não logado
      btnEntrar.textContent = "Entrar";
      btnEntrar.addEventListener("click", () => {
        window.location.href = "login.html"; // Vai para página de login
      });
    }
  }
});
