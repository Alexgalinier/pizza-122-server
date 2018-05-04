import fs from 'fs-extra';
import { pizzas } from './data';

export default async ({ get, config }) => {
  get('pizzas', async (req, res) => {
    const result = await config.db.getAll('pizzas');

    if (!result) {
      await Promise.all(
        pizzas.map(async _ => await config.db.insert('pizzas', _))
      );
      return res.send(pizzas);
    }

    res.send(result);
  });
  get('images', async (req, res) => {
    let img;
    try {
      img = fs.readFileSync(`${__dirname}/images/${req.id}`);
    } catch (e) {
      console.error(e.message);
      return res.error(404);
    }

    res.image(img);
  });
};
