"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const anime_1 = __importDefault(require("../Models/anime"));
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);
router.get('/animes', async (req, res) => {
    try {
        const { query, year, category, sort } = req.query;
        const filter = createFilter(query, year, category);
        const anime = await fetchAnimes(filter, sort);
        res.status(200).json(anime);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const createFilter = (query, year, category) => {
    const filter = {};
    if (query) {
        filter.title = { $regex: query, $options: 'i' };
    }
    if (year) {
        filter.year = Number(year);
    }
    if (category) {
        filter.category = { $regex: category, $options: 'i' };
    }
    return filter;
};
const fetchAnimes = async (filter, sort) => {
    let query = anime_1.default.find(filter);
    if (sort === 'asc') {
        query = query.sort({ name: 1 });
    }
    else if (sort === 'desc') {
        query = query.sort({ name: -1 });
    }
    const anime = await query.exec();
    return anime;
};
router.post('/animes', async (req, res) => {
    const anime = new anime_1.default({
        name: req.body.name,
        sipnosis: req.body.sipnosis,
        yearOfEmision: req.body.year,
        episodes: req.body.episodes,
        category: req.body.category
    });
    try {
        const newAnime = await anime.save();
        res.status(201).json(newAnime);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
});
router.get('/:id', getAnime, (req, res) => {
    res.json(res.anime);
});
router.delete('/:id', getAnime, async (req, res) => {
    let id = req.params.id;
    try {
        await res.anime.deleteOne({ id });
        res.json({ message: 'deleted anime' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
});
router.patch('/:id', getAnime, async (req, res) => {
    if (req.body.name != null) {
        res.anime.name = req.body.name,
            res.anime.sipnosis = req.body.sipnosis,
            res.anime.year = req.body.year,
            res.anime.episodes = req.body.episodes,
            res.anime.category = req.body.category;
        try {
            const updateAnime = await res.anime.save();
            res.json(updateAnime);
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
});
async function getAnime(req, res, next) {
    let anime;
    try {
        anime = await anime_1.default.findById(req.params.id);
        if (anime == null) {
            return res.status(404).json({ message: 'Can not find anime' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
    res.anime = anime;
    next();
}
module.exports = router;
exports.default = router;
//# sourceMappingURL=index.js.map