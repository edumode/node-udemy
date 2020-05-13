const Contact = require("./../models/contact")

const saveComment = (req, res) => {

    const comment = req.body

    let contact = new Contact(comment)

    contact.save((err, comment) => {
      if(err){ return res.send({err}) }

      console.log(comment)
      return res.status(200).send({ success: true, message: "Thank you for your comment"})
    })
}

module.exports = {
  saveComment
}
