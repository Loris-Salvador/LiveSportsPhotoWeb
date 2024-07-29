// script.js
document.addEventListener("DOMContentLoaded", () => {
  const sectionsColumn = document.getElementById("sections-column");
  const albumsColumn = document.getElementById("albums-column");
  const loadingIndicator = document.getElementById("loading"); // Indicateur de chargement

  // Fonction pour charger les sections depuis l'API
  async function loadSections() {
    try {
      const response = await fetch("https://localhost:7077/api/Section"); // Remplacez par l'URL de votre API
      const sections = await response.json();

      sections.forEach((section) => {
        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section";
        sectionDiv.textContent = section.name;
        sectionDiv.dataset.id = section.id;

        sectionDiv.addEventListener("mouseover", () => {
          loadAlbums(section.id);
        });

        sectionsColumn.appendChild(sectionDiv);

        loadingIndicator.style.display = "none";
      });
    } catch (error) {
      console.error("Erreur lors du chargement des sections:", error);
    }
  }

  async function loadAlbums(sectionId) {
    try {
      const response = await fetch(
        `https://localhost:7077/api/section/album/${sectionId}`
      );
      const albums = await response.json();

      // Nettoyer la colonne des albums avant d'ajouter les nouveaux albums
      albumsColumn.innerHTML = "";

      albums.forEach((album) => {
        const albumDiv = document.createElement("div");
        albumDiv.className = "album";

        // Créer un élément <a> avec l'URL du lien
        const albumLink = document.createElement("a");
        albumLink.href = album.link;
        albumLink.target = "_blank";
        albumLink.textContent = album.name;

        // Ajouter l'élément <a> au <div>
        albumDiv.appendChild(albumLink);

        // Ajouter un gestionnaire d'événements pour rediriger vers le lien lors du clic sur le <div>
        albumDiv.addEventListener("click", () => {
          window.open(albumLink.href, "_blank"); // Ouvre le lien dans un nouvel onglet
        });

        // Ajouter le <div> à la colonne des albums
        albumsColumn.appendChild(albumDiv);
      });
    } catch (error) {
      console.error("Erreur lors du chargement des albums:", error);
    }
  }

  // Charger les sections lors du chargement de la page
  loadSections();
});
