module.exports = function (app) {
  const controller = require("../controller/controller.js");
 
  app.post("/api/entrepriseServices/ajoutEntreprise", controller.ajoutEntreprise);
  app.delete("/api/entrepriseServices/supprimerEntreprise/:siren", controller.supprimerEntreprise);
  app.post("/api/entrepriseServices/filtrerEntreprise", controller.filtrerEntreprise);
  app.post("/api/entrepriseServices/trierEntreprise", controller.trierEntreprise);
  app.post("/api/entrepriseServices/ajoutResultatEntreprise", controller.ajoutResultatEntreprise);
  app.get("/api/entrepriseServices/performance/:siren", controller.performance);
};
