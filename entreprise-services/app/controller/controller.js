const db = require("../config/db.config.js");
const Entreprise = db.entreprise;
const Result = db.result;
const Op = db.Sequelize.Op;



exports.ajoutEntreprise = async function (req, res) {
    const { name, sector, siren } = req.body

    await Entreprise.create({
        name,
        sector,
        siren
    }).then(async entreprises => {
        res.status(200).send("success")
    })

}

exports.supprimerEntreprise = async function (req, res) {
    const { siren } = req.params

    await Entreprise.destroy({
        where: {
            siren: siren
        }
    }).then(async entreprises => {
        res.status(200).send("entreprise supprimer")
    })

}

exports.filtrerEntreprise = async function (req, res) {
    const {
        name,
        sector,
        siren,
        page,
        pageSize,
    } = req.body;

    var where = {}

    if (name != null && name != "") {
        where.name = { [Op.like]: `%${name}%` };
    }
    if (sector != null && sector != "") {
        where.sector = { [Op.like]: `%${sector}%` };
    }
    if (siren != null && siren != "") {
        where.siren = siren
    }

    await Entreprise.findAll({
        where,
    }).then(async entreprises => {
        res.status(200).send({
            count: entreprises.length,
            result: entreprises.slice(pageSize * (page - 1), pageSize * page),
        });
    })

}

exports.trierEntreprise = async function (req, res) {
    const { triePar, page, pageSize } = req.body

    //trie se fait par le "name","sector" et "siren"
    // page et pageSize pagination

    var varTrie
    if (triePar == "") {
        triePar = "id"
    } else {
        varTrie = triePar
    }

    await Entreprise.findAll({
        order: [
            [varTrie, 'ASC'],
        ]
    }).then(async response => {
        res.status(200).send({
            count: response.length,
            result: response.slice(pageSize * (page - 1), pageSize * page),
        });
    })
}

exports.ajoutResultatEntreprise = async function (req, res) {
    const { siren, ca, margin, ebitda, loss, year } = req.body

    await Entreprise.findOne({
        where: {
            siren: siren
        }
    }).then(async entreprises => {
        await Result.create({
            ca,
            margin,
            ebitda,
            loss,
            year
        }).then(async results => {
            await entreprises.addEntreprises(results).then(response => {
                console.log("success!!")
            })
        })
    })
    res.status(200).send("resultat ajoutée avec success")
}


exports.performance = async function (req, res) {
    const { siren } = req.params

    await Entreprise.findOne({
        where: {
            siren: siren
        }
    }).then(async entreprises => {
        await Result.findAll({
            where: {
                entrepriseId: entreprises.id
            }
        }).then(async results => {
            res.status(200).send({
                performanceCA: ((results[0].ca - results[1].ca) / results[1].ca)*100,
                performanceMargin: ((results[0].margin - results[1].margin) / results[1].margin)*100,
                performanceEbitda: ((results[0].ebitda - results[1].ebitda) / results[1].ebitda)*100,
                performanceLoss: ((results[0].loss - results[1].loss) / results[1].loss)*100,
            })
        })
    })
}
