const {Router} = require('express');
const router = Router();

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
router.get('/articles' ,   ArticleController.index);
router.get('/articles/:id' ,   ArticleController.findOne);

//pages
router.get('/pages' ,  PageController.index);
router.get('/pages/:slug' ,   PageController.findOne);

//glossaries
router.get('/glossaries' ,  GlossaryController.index);
router.get('/glossaries/:slug' ,   GlossaryController.findOne);

//footer
router.get('/footer' ,  FooterController.index);
router.get('/footer/:slug' ,   FooterController.findOne);

//taxonomies

router.get('/category' ,  CategoryController.index);
router.get('/tag' ,  TagController.index);
router.get('/level' ,  LevelController.index);
router.get('/language' ,  LanguageController.index);
 
module.exports = router; 
  