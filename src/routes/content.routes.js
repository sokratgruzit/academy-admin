const { Router } = require("express");
const router = Router();

const AuthMiddleware = require("../middlewares/auth.middleware");
const { articleValidator } = require("../middlewares/validators/auth.validator");
const ArticleController = require("../controllers/article.controller");
const PageController = require("../controllers/page.controller");
const BecomeInstructorController = require("../controllers/become-instructor.controller");
const GlossaryController = require("../controllers/glossary.controller");
const FooterController = require("../controllers/footer.controller");
const HeaderController = require("../controllers/header.controller");
const TaxonomiesController = require("../controllers/taxonomies.controller");
const QuestionBankController = require("../controllers/question-bank.controller");
const QuizController = require("../controllers/quiz.controller");
const CommonController = require("../controllers/common.controller");
const MenuController = require("../controllers/menu.controller");

const CategoryController = new TaxonomiesController("Category");
const LevelController = new TaxonomiesController("Level");
const TagController = new TaxonomiesController("Tag");
const LanguageController = new TaxonomiesController("Language");

//articles
router.get("/articles", ArticleController.index);
router.get("/articles/:slug", ArticleController.findOne);
router.post("/articles", ArticleController.create);
router.put("/articles/:slug", ArticleController.update);
router.delete("/articles/:slug", ArticleController.destroy);

//menu
router.get("/menu", MenuController.index);
router.post("/menu", MenuController.create);
router.put("/menu/:to", MenuController.update);
router.delete("/menu/:to", MenuController.destroy);
router.get("/structure", MenuController.parseStructure);

//pages
router.get("/pages", PageController.index);
router.get("/pages/:slug", PageController.findOne);
router.post("/pages", PageController.create);
router.put("/pages/:slug", PageController.update);
router.delete("/pages/:slug", PageController.destroy);

//become an instructor
router.get("/become-instructor", BecomeInstructorController.index);
router.put("/become-instructor/", BecomeInstructorController.update);

//glossaries
router.get("/glossaries", GlossaryController.index);
router.get("/glossaries/:slug", GlossaryController.findOne);
router.post("/glossaries", GlossaryController.create);
router.put("/glossaries/:slug", GlossaryController.update);
router.delete("/glossaries/:slug", GlossaryController.destroy);

//footer
router.get("/footer", FooterController.index);
router.get("/footer/:slug", FooterController.findOne);
router.post("/footer", FooterController.create);
router.put("/footer/:slug", FooterController.update);
router.delete("/footer/:slug", FooterController.destroy);

//header
router.get("/header", HeaderController.index);
router.get("/header/:slug", HeaderController.findOne);
router.post("/header", HeaderController.create);
router.put("/header/:slug", HeaderController.update);
router.delete("/header/:slug", HeaderController.destroy);

//taxonomies

router.get("/category", CategoryController.index);
router.get("/tag", TagController.index);
router.get("/level", LevelController.index);
router.get("/language", LanguageController.index);

router.post("/category", CategoryController.create);
router.post("/tag", TagController.create);
router.post("/level", LevelController.create);
router.post("/language", LanguageController.create);

router.get("/category/:id", CategoryController.findOne);
router.get("/tag/:id", TagController.findOne);
router.get("/level/:id", LevelController.findOne);
router.get("/language/:id", LanguageController.findOne);

router.put("/category/:id", CategoryController.update);
router.put("/tag/:id", TagController.update);
router.put("/level/:id", LevelController.update);
router.put("/language/:id", LanguageController.update);

router.delete("/category/:id", CategoryController.destroy);
router.delete("/tag/:id", TagController.destroy);
router.delete("/level/:id", LevelController.destroy);
router.delete("/language/:id", LanguageController.destroy);

//question bank
router.get("/question-bank", QuestionBankController.index);
router.post("/question-bank", QuestionBankController.create);
router.put("/question-bank/:id", QuestionBankController.update);
router.delete("/question-bank/:id", QuestionBankController.destroy);

//question bank
router.get("/quiz", QuizController.index);
router.get("/quiz/:slug", QuizController.findOne);
router.post("/quiz", QuizController.create);
router.put("/quiz/:slug", QuizController.update);
router.delete("/quiz/:title", QuizController.destroy);

router.get("/common-data", CommonController.commonData);

module.exports = router;
