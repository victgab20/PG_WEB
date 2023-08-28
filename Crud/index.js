const express = require('express')
const app = express()

const db = require('./db')

db.connect()

const q = `Select * from users`



app.use(express.json());

app.get('/', (req, resp)=>{
    //resp.send('Teste completo')

    db.query(q, (err, res) =>{
        if(!err){
            resp.send(res.rows)
        }
    })
})


app.post('/users/:last_name/:first_name', (req, res) => {
    const lastName = req.params.last_name;
    const firstName = req.params.first_name;

    const query = 'INSERT INTO users (last_name, first_name) VALUES ($1, $2)';
    const values = [lastName, firstName];

    console.log('Query:', query);
    console.log('Values:', values);

    db.query(query, values)
        .then(result => {
            res.status(200).send('Deu tudo certo meu caro');
        })
        .catch(error => {
            console.error('Error ao inserir dados:', error);
            res.status(500).send('O erro ocorreu enquanto inseria os dados');
        });
});


app.delete('/delete/:id', async (req, res) => {
    const idToDelete = req.params.id;
  
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await db.query(query, [idToDelete]);
  
      if (result.rowCount === 1) {
        res.status(200).send('Registro deletado com sucesso.');
      } else {
        res.status(404).send('Registro não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
      res.status(500).send('Erro interno ao tentar deletar registro.');
    }
  });

  app.put('/update/:id', (req, res) => {
    const idToUpdate = req.params.id;
    const { newLastName, newFirstName } = req.body;
  
    const query = 'UPDATE users SET last_name = $1, first_name = $2 WHERE id = $3';
    
    db.query(query, [newLastName, newFirstName, idToUpdate], (error, result) => {
      if (error) {
        console.error('Erro ao atualizar registro:', error);
        res.status(500).send('Erro interno ao tentar atualizar registro.');
      } else {
        if (result.rowCount === 1) {
          res.status(200).send('Registro atualizado com sucesso.');
        } else {
          res.status(404).send('Registro não encontrado.');
        }
      }
    });
  });


app.listen(3000, ()=>{
    console.log('Rodando...')
})