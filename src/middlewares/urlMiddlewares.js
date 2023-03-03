import {urlSchema} from "../schemas/urlSchemas.js"
export async function urlSchemaValidation(req, res) {
    try {
      const { err } = urlSchema.validate(req.body, { abortEarly: false })

    if (err) {
      const errs = err.details.map((detail) => detail.message);
      return res.status(422).send({ errs });
    }
   } catch (err) {
      return res.status(422).send(err.message);
    }
  }