const Article = require("../models/Article");
const Category = require("../models/Category");
const Footer = require('../models/Footer');
const Header = require('../models/Header');
const Tags = require('../models/Tag');
const Levels = require('../models/Level');
//const Settings = require('../models/Settings');
const Glossaries = require('../models/Glossary');
const { index } = require('./article.controller');

async function commonData(req, res) {
    try {
        const footer = await Footer.find({});
        const header = await Header.find({});
        const tags = await Tags.find({});
        const categories = await Category.find({});
        const levels = await Levels.find({});
        //const settings = await Settings.find({});
        const featuredId = await Article.findOne({ slug: 'featured' })._id;
        const blockchaindId = await Article.findOne({ slug: 'blockchain' })._id;
        const essentialsdId = await Article.findOne({ slug: 'essentials' })._id;
        const securitydId = await Article.findOne({ slug: 'security' })._id;
        
        const glossaries = await Glossaries.find({}).sort({ created_at: -1 }).limit(3);
        const latest = await Article.find({}).sort({ created_at: -1 }).limit(3);
        const featured = await index({ query: { category: featuredId, type: 'common', limit: 3 }});
        const blockchain = await index({ query: { category: blockchaindId, type: 'common', limit: 3 }});
        const essentials = await index({ query: { category: essentialsdId, type: 'common', limit: 3 }});
        const security = await index({ query: { category: securitydId, type: 'common', limit: 3 }});
        
        const result = {
            footer,
            header,
            tags,
            categories,
            levels,
            //settings,
            glossaries,
            featured,
            latest,
            blockchain,
            essentials,
            security
        };
  
        res.status(200).json(result);
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: e.message });
    }
}

module.exports = {
    commonData
};