async function index(req, res) {
  try {
    const result = await contact.index();
    res.status(200).json(result);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
}

module.exports = {
  index,
};
