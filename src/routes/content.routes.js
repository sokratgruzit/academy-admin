const {Router} = require('express');
const router = Router();

const AuthMiddleware = require('../middlewares/auth.middleware');
const ArticleController = require('../controllers/article.controller');
const PageController = require('../controllers/page.controller');
const GlossaryController = require('../controllers/glossary.controller');
const FooterController = require('../controllers/footer.controller');
const TaxonomiesController = require('../controllers/taxonomies.controller');

const CategoryController = new TaxonomiesController('Category');
const LevelController = new TaxonomiesController('Level');
const TagController = new TaxonomiesController('Tag');
const LanguageController = new TaxonomiesController('Language');


//articles
router.get('/articles' , AuthMiddleware,  ArticleController.index);
router.get('/articles/:id' , AuthMiddleware ,  ArticleController.findOne);
router.post('/articles' , AuthMiddleware  , ArticleController.create);
router.put('/articles/:id', AuthMiddleware , ArticleController.update);
router.delete('/articles/:id', AuthMiddleware , ArticleController.destroy);

//pages
router.get('/pages' , AuthMiddleware,  PageController.index);
router.get('/pages/:slug' , AuthMiddleware ,  PageController.findOne);
router.post('/pages' , AuthMiddleware  , PageController.create);
router.put('/pages/:slug', AuthMiddleware , PageController.update);
router.delete('/pages/:slug', AuthMiddleware , PageController.destroy);

//glossaries
router.get('/glossaries' , AuthMiddleware,  GlossaryController.index);
router.get('/glossaries/:slug' , AuthMiddleware ,  GlossaryController.findOne);
router.post('/glossaries' , AuthMiddleware  , GlossaryController.create);
router.put('/glossaries/:slug', AuthMiddleware , GlossaryController.update);
router.delete('/glossaries/:slug', AuthMiddleware , GlossaryController.destroy);

//footer
router.get('/footer' , AuthMiddleware,  FooterController.index);
router.get('/footer/:slug' , AuthMiddleware ,  FooterController.findOne);
router.post('/footer' , AuthMiddleware  , FooterController.create);
router.put('/footer/:slug', AuthMiddleware , FooterController.update);
router.delete('/footer/:slug', AuthMiddleware , FooterController.destroy);

//taxonomies

router.get('/category' , AuthMiddleware  , CategoryController.index);
router.get('/tag' , AuthMiddleware  , TagController.index);
router.get('/level' , AuthMiddleware  , LevelController.index);
router.get('/language' , AuthMiddleware  , LanguageController.index);

router.post('/category' , AuthMiddleware  , CategoryController.create);
router.post('/tag' , AuthMiddleware  , TagController.create);
router.post('/level' , AuthMiddleware  , LevelController.create);
router.post('/language' , AuthMiddleware  , LanguageController.create);

router.get('/category/:id' , AuthMiddleware  , CategoryController.findOne);
router.get('/tag/:id' , AuthMiddleware  , TagController.findOne);
router.get('/level/:id' , AuthMiddleware  , LevelController.findOne);
router.get('/language/:id' , AuthMiddleware  , LanguageController.findOne);

router.put('/category/:id' , AuthMiddleware  , CategoryController.update);
router.put('/tag/:id' , AuthMiddleware  , TagController.update);
router.put('/level/:id' , AuthMiddleware  , LevelController.update);
router.put('/language/:id' , AuthMiddleware  , LanguageController.update);

router.delete('/category/:id' , AuthMiddleware  , CategoryController.destroy);
router.delete('/tag/:id' , AuthMiddleware  , TagController.destroy);
router.delete('/level/:id' , AuthMiddleware  , LevelController.destroy);
router.delete('/language/:id' , AuthMiddleware  , LanguageController.destroy);



 
module.exports = router; 
  