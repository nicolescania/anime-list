

import express from 'express';
const router = express.Router();
import animes from '../Models/anime'


function DisplayHomePage(req: express.Request, res:express.Response, next:express.NextFunction)
{
    res.render('index', { title: 'Home', page: 'home'});
}



/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);







//Get Anime List

router.get('/animes', async (req, res,) => {
    try {
        const { query, year, category, sort } = req.query;
        const filter = createFilter(query, year, category);
        const anime = await fetchAnimes(filter, sort);
        res.status(200).json(anime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})




// Anime List being filter
const createFilter = (query: any, year: any, category: any) => {

    const filter: any = {};

    if (query) {
        filter.name = { $regex: query, $options: 'i' };
    }

    if (year) {
        filter.year = Number(year);
    }

    if (category) {
        filter.category = { $regex: category, $options: 'i' };
    }

    return filter;
};



//Anime list filter asc and desc

const fetchAnimes = async (filter: any, sort: any) => {
    let query = animes.find(filter);

    if (sort === 'asc') {
        query = query.sort({ name: 1 });
    } else if (sort === 'desc') {
        query = query.sort({ name: -1 });
    }

    const anime = await query.exec();
    return anime;
};







// Create a new anime

router.post('/animes', async (req, res) => {

    const anime = new animes({
        name: req.body.name,
        sipnosis: req.body.sipnosis,
        yearOfEmision: req.body.year,
        episodes: req.body.episodes,
        category: req.body.category

    })
    try {
        const newAnime = await anime.save()
        res.status(201).json(newAnime)
    } catch (err) {
        res.status(400).json({ message: err })
    }


})





//MILDWARE

router.get('/:id', getAnime, (req: any, res: any) => {
    res.json(res.anime)

})

//Delete Anime

router.delete('/:id', getAnime, async (req: any, res: any) => {
    let id = req.params.id;

    try {

        await res.anime.deleteOne({ id })
        res.json({ message: 'deleted anime' })
    } catch (err) {

        res.status(500).json({ message: err })

    }
})



//UPDATE Anime

router.patch('/:id', getAnime, async (req: any, res: any) => {
    if (req.body.name != null) {

        res.anime.name = req.body.name,
            res.anime.sipnosis = req.body.sipnosis,
            res.anime.year = req.body.year,
            res.anime.episodes = req.body.episodes,
            res.anime.category = req.body.category

        try {

            const updateAnime = await res.anime.save()
            res.json(updateAnime)

        } catch (error) {
            res.status(400).json({ message: error })

        }

    }


})

async function getAnime(req: any, res: any, next: any) {
    let anime
    try {
        anime = await animes.findById(req.params.id)

        if (anime == null) {
            return res.status(404).json({ message: 'Can not find anime' }
            )
        }

    } catch (err) {

        return res.status(500).json({ message: err })

    }


    res.anime = anime;
    next()

}





module.exports = router;

export default router;

