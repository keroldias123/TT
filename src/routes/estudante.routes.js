// estudante.routes.js
const express = require('express');
const router = express.Router();
const estudanteModel = require('../models/estudante.model');
const turmaModel = require('../models/turma.model');

// Listar todos os estudantes
router.get('/estudantes', async (req, res) => {
  const estudantes = await estudanteModel.obterTodosEstudantes();
  res.json(estudantes);
}); 



router.get('/listarTurmas', async (req, res) => {
  try {
    const turmas = await turmaModel.listarTurmas();
    res.json({ turmas });
  } catch (error) {
    console.error('Erro ao obter turmas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Criar um novo estudante
router.post('/estudantes/add', async (req, res) => {
  const { nome, turmaId } = req.body;
  const estudante = await estudanteModel.criarEstudante(nome, turmaId);
  res.json(estudante);
});


// Rota para atualizar um estudante existente
// Rota para obter os dados do estudante
router.get('/getid/:id', async (req, res) => {
  const estudanteId = parseInt(req.params.id);

  try {
    const estudante = await estudanteModel.getEstudante(estudanteId);
    res.json(estudante);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Rota para atualizar um estudante
router.put('/editarEstudante/:id', async (req, res) => {
  const estudanteId = parseInt(req.params.id);
  const { nome, turmaId } = req.body;

  try {
    const estudanteAtualizado = await atualizarEstudante(estudanteId, nome, turmaId);
    res.json(estudanteAtualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// Eliminar um estudante
router.delete('/eliminar/:id', async (req, res) => {
  try {
        const estudanteId = parseInt(req.params.id); // Converta o ID para inteiro
        await estudanteModel.eliminarEstudante(estudanteId); // Chame a função do modelo
        res.json({ message: 'Estudante eliminado com sucesso' });
    } catch (error) {
        console.error('Erro ao eliminar estudante:', error);
        res.status(500).json({ error: 'Erro ao eliminar estudante' });
    }
});

module.exports = router;
