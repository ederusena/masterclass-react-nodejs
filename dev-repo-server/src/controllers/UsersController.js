import User from '../models/User';
import { createPasswordHash } from '../services/auth';
 
class UsersController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async create(req, res) {
    try {
      const { email, password } = req.body;
      const userExists = await User.findOne({ email });

      if(userExists)
        return res.status(422).json({ error: `User ${email} already exists` });

      const passwordHash = await createPasswordHash(password);
      const user = await User.create({ email, password: passwordHash });
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async destroy(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      return res.send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new UsersController();