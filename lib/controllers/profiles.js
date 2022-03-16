const { Router } = require('express');
const ProfileService = require('../services/ProfileService');

const pool = require('../utils/pool');

module.exports = Router().post('/', async (req, res) => {
  const profile = { name: 'Test User', quote: 'it me' };
  const { name, quote } = profile;
  const { rows } = await pool.query(
    `
        INSERT INTO
            profiles (name, quote)
        VALUES
            ($1, $2)
        RETURNING
            *
      `,
    [name, quote]
  );

  console.log('row from postgres', rows[0]);

  res.json(rows[0]);
});
