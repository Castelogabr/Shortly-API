import { urlSchema } from "../schemas/urlSchemas.js";

export async function urlSchemaValidation(req, res, next) {

    try {
      const { error } = urlSchema.validate(req.body, { abortEarly: false });
      
      if (error) {
        const errorMessages = error.details.map(err => err.message);
        return res.status(422).send(errorMessages);
      }
   } catch (err) {
      return res.status(422).send(err.message);
    }
    next();

  }

